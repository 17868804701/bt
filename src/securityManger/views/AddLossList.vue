<!-- 追加事故经损说明管理-->
<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
          <FormItem label="按年份查询" style="margin: 0;">
            <DatePicker type="month" placeholder="选择年份" :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
            <Button type="primary" icon="ios-search" @click="searchData" v-has="'aqglykhbgl_zjsgjssmgl_search'">搜索</Button>
            <Button type="primary" icon="android-download" style="position: absolute;right: 0" @click="expertExcel" v-has="'aqglykhbgl_zjsgjssmgl_export'">导出excel</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <can-edit-table style="margin-top: 10px;" v-model="tableData" :columnsList="columns11" :editIncell="true" :hoverShow="true" @on-cell-change="handleCellChange" @on-change="handleChange">
    </can-edit-table>
    <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
  </div>
</template>

<script>
  import canEditTable from '../../components/common/canEditTable.vue'
  import * as DateTool from '../../../utils/DateTool';
  export default {
    components:{
      canEditTable
    },
    data () {
      return {
        formItem: {
          date: '',
          current: 1,
          size: 10,
          time: '',
        },
        totalSize: 0,
        columns11: [
          {
            title: '追加事故经损说明管理',
            align: 'center',
            children: [
              {
                title: '序号',
                align: 'center',
                type: 'index',
              },
              {
                title: '追加公司',
                key: 'zjgs',
                align: 'center',
              },
              {
                title: '路别',
                key: 'lb',
                align: 'center',
              },
              {
                title: '牌照',
                key: 'pz',
                align: 'center',
              },
              {
                title: '驾驶员',
                key: 'jsyxm',
                align: 'center',
              },
              {
                title: '立案时间',
                key: 'lasj',
                align: 'center',
              },
              {
                title: '预估经损',
                key: 'ygjs',
                align: 'center',
              },
              {
                title: '结案经损',
                key: 'jajs',
                align: 'center',
              },
              {
                title: '追加车内',
                key: 'zjcn',
                align: 'center',
              },
              {
                title: '追加车损',
                key: 'zjcs',
                align: 'center',
              },
              {
                title: '追加三者',
                key: 'zjsz',
                align: 'center',
              },
              {
                title: '合计追加',
                key: 'hjzj',
                align: 'center',
              },
              {
                title: '追加扣分',
                key: 'zjkf',
                align: 'center',
              },
              {
                title: '备注',
                key: 'bz',
                align: 'center',
              }
            ]
          },
        ],
        tableData: [],
      }
    },
    methods:{
      handleCellChange (val, index, key) {
        this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
      },
      handleChange (val, index) {
        this.$Message.success('修改了第' + (index + 1) + '行数据');
      },
      searchData() {
        this.formItem.current = 1;
        this.requestListData();
      },
      setPage(page) {
        this.formItem.current = page;
        this.requestListData();
      },
      requestListData() {
        let year = '';
        let month = '';
        if (this.formItem.date instanceof Date) {
          year = this.formItem.date.getFullYear();
          month = this.formItem.date.getMonth() + 1;
        }
        let params = {
          year: year,
          month: month,
          current: this.formItem.current,
          size: this.formItem.size,
        };
        //        console.log('追加事故经损说明管理请求数据');
        //        console.log(params);
        let that = this;
        let allDict = this.$store.state.dictData.parseDict;
        this.$fetch(this.$url.security_ZJSGJSSM_list, params)
        .then(res => {
//          console.log(res);
          if (res.success === true) {
            res.data.records.forEach(item => {
              item.lasj = DateTool.timesToDate(item.lasj);
              item.zjgs = allDict.EJGS[item.zjgs];
            })
            that.current = 1;
            that.tableData = res.data.records;
            that.totalSize = res.data.total;
          }else{
            that.$Message.error('数据获取失败, 请重试!');
          }
        })
      },
      expertExcel() {
        let url = this.$url.security_ZJSGJSSM_exportExcel;
        if (this.formItem.date instanceof Date) {
          let year = this.formItem.date.getFullYear();
          let month = this.formItem.date.getMonth() + 1;
          url = url + '?year=' + year + '&month=' + month;
        }
        this.$getExcel(url);
      }
    },
    mounted () {
      let now = new Date();
      this.formItem.date = now;
    }
  }
</script>


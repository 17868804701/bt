<!--交通事故月报表-->
<!-- 集团公司事故情况月汇总表-->
<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
          <FormItem label="按月查询" style="margin: 0;">
            <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
            <Button type="primary" icon="ios-search" @click="searchData" v-has="'sgqkhz_fgsjtsgybb_search'">搜索</Button>
              <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'sgqkhz_fgsjtsgybb_export'">导出Excel</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Table border style="margin-top: 10px;" :data="tableData" :columns="columns11" >
      <div slot="header" style="height: 50px;font-size: 18px;text-align: center">
        {{tableTitle}}
      </div>
    </Table>
  </div>
</template>

<script>
  import canEditTable from '../../components/common/canEditTable.vue';
  import * as DateTool from '../../../utils/DateTool';
  export default {
    components:{
      canEditTable
    },
    data () {
      return {
        formItem: {
          date: this.initDate(),
        },
        columns11: [
          {
            title: '单位/项目',
            key: 'dw',
            align: 'center',
            width: 120,
          },
          {
            title: '运营里程(百万公里)',
            key: 'yylc',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '行车责任事故次数',
            key: 'xczrsgcs',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '责任事故次数, 其中:',
            align: 'center',
            children: [
              {
                title: '特大事故',
                key: 'tdsg',
                align: 'center',
                width: 120,
                sortable: true
              },
              {
                title: '重大事故',
                key: 'zdsg',
                align: 'center',
                width: 120,
                sortable: true
              },
              {
                title: '较大事故',
                key: 'jdsg',
                align: 'center',
                width: 120,
                sortable: true
              },
              {
                title: '一般事故',
                key: 'ybsg',
                align: 'center',
                width: 120,
                sortable: true
              },
              {
                title: '一级轻微',
                key: 'yjqw',
                align: 'center',
                width: 120,
                sortable: true
              },
              {
                title: '二级轻微',
                key: 'ejqw',
                align: 'center',
                width: 120,
                sortable: true
              },
              {
                title: '三级轻微',
                key: 'sjqw',
                align: 'center',
                width: 120,
                sortable: true
              },
            ]
          },
          {
            title: '事故死亡人数',
            key: 'sgswrs',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '事故受伤人数',
            key: 'sgssrs',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '事故频率(次/百万公里)',
            key: 'sgpl',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '经损(含追加)(元)',
            key: 'js',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '经损率(元/万公里)',
            key: 'jsl',
            align: 'center',
            width: 120,
            sortable: true
          },
          {
            title: '本月累计考核事故',
            key: 'bykhsgSum',
            align: 'center',
            width: 120,
            sortable: true,
          },
        ],
        tableData: [],
        tableTitle: '',
      }
    },
    computed: {

    },
    methods:{
      initDate() {
        let now = new Date();
        return now;
      },
      getTableTitle() {
        let year = this.formItem.date.getFullYear();
        let month = this.formItem.date.getMonth() + 1;
        let title = year+'年'+month+'月交通事故报表';
        this.tableTitle = title;
      },
      requestListData() {

        let year = this.formItem.date.getFullYear();
        let month = this.formItem.date.getMonth() + 1;
        if(month<10){
          month = '0'+month
        }
        let params = {
          nf: year,
          yf: month,
        }
        let allDict = this.$store.state.dictData.parseDict;
        let that = this;
        this.$fetch(this.$url.security_GFGSJTSG_list, params)
        .then(res => {
          this.getTableTitle();
          if (res.success === true) {
            res.data.forEach(item => {
              item.dw = allDict.EJGS[item.dw];
            })
            that.tableData = res.data;
          }else{
            that.$Message.error(res.message);
          }
        })
      },
      searchData() {
        if (this.formItem.date instanceof Date) {
          this.formItem.current = 1;
          this.requestListData();
        }else{
          this.$Message.error('请选择月份后搜索!');
        }
      },
      exportExcel() {
        // 按当前月份查询下载
        let url = this.$url.security_GFGSJTSG_exportExcel;
        if (this.formItem.date instanceof Date) {
          let year = this.formItem.date.getFullYear();
          let month = this.formItem.date.getMonth() + 1;
          if(month<10){
            month = '0'+month
          }
          url = url + '?nf=' + year + '&yf=' + month;
          this.$getExcel(url);
        }else{
          this.$Message.error('请先选择月份!');
        }
      },
    },
    mounted () {
    }
  }
</script>


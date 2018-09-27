<!--维修领料管理-->

<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem">
          <Row>
            <Col span="24">
            <FormItem label="按领料日期查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择月份"  :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
              <Button type="primary" icon="ios-search" @click="search" v-has="'bygl_wxllgl_search'">搜索</Button>
              <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'bygl_wxllgl_daochu'">导出Excel</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table style="margin-top: 10px;" :data="tableData" :columns="columns" border></Table>
      <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
    </div>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  export default {
    components: {
    },
    data () {
      return {
        formItem: {
          date: '',
          currPage: 1,
          pageSize: 10,
        },
        totalSize: 0,
        tableData: [],
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60,
          },
          {
            title: '车号',
            key: 'cph',
            align: 'center',
          },
          {
            title: '车型',
            key: 'cx',
            align: 'center',
          },
          {
            title: '领料日期',
            key: 'rq',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'wpmc',
            align: 'center',
          },
          {
            title: '领料数量',
            key: 'sl',
            align: 'center',
          },
          {
            title: '规格',
            key: 'gg',
            align: 'center',
          },
          {
            title: '供货单位',
            key: 'ghdw',
            align: 'center',
          },
          {
            title: '品牌型号',
            key: 'ppxh',
            align: 'center',
          },
          {
            title: '计量单位',
            key: 'jldw',
            align: 'center',
          },
          {
            title: '单价',
            key: 'dj',
            align: 'center',
          },
          {
            title: '金额',
            key: 'je',
            align: 'center',
          },
          {
            title: '附记',
            key: 'fj',
            align: 'center',
          },
        ],
      }
    },
    computed: {

    },
    methods: {
      setPage(page) {
        this.formItem.currPage = page;
        this.requestListData();
      },
      search() {
        this.formItem.currPage = 1;
        this.requestListData();
      },
      requestListData() {
        let params = {};
        params.date = DateTool.yyyymm01FormatDate(this.formItem.date);
        params.currPage = this.formItem.currPage;
        params.pageSize = this.formItem.pageSize;
        let that = this;
        this.$fetch(this.$url.maintain_BYGL_WXLLGL_recordList, params)
        .then(res=>{
//          debugger;
          if (res.code === 0) {
            res.page.list.forEach(item => {
              item.rq = DateTool.timesToDate(item.rq);
            })
            that.currPage = 1;
            that.tableData = res.page.list;
            that.totalSize = res.page.totalCount;
          }else{
            this.$Message.error(res.msg);
          }
        })
      },
      exportExcel() {
        let url = this.$url.maintain_BYGL_WXLLGL_exportExcel;
//        url = url + '?currPage='+this.formItem.currPage+'&pageSize='+this.formItem.pageSize;
        if (this.formItem.date instanceof Date) {
          let date = DateTool.yyyymm01FormatDate(this.formItem.date);
          url = url + '?date=' + date;
        }
        this.$getExcel(url);
      },
    },
    mounted () {

    }
  }
</script>

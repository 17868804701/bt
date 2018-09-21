<!--报表管理-->

<template>
  <div>
    <Card>
      <Form :model="form2Item">
        <Row>
          <Col span="24">
          <FormItem label="按月查询" style="margin: 0;">
            <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end" v-model="form2Item.month"></DatePicker>
            <Button type="primary" icon="ios-search" @click="this.requestListData" v-has="'wxyh_bbgl_sjwhclsy_search'">搜索</Button>
            <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'wxyh_bbgl_sjwhclsy_daochu'">导出Excel</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Table style="margin-top: 10px;" :data="tableData" border :columns="clColumns" border></Table>
    <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool';
  export default {
    components: {
    },
    data () {
      return {
        totalSize: 0,
        form2Item: {
          month: '',
          currPage: 1,
          pageSize: 10,
        },
        // 车号、车型、材料费、发动机大修材料费、费用合计、维修台数合计
        clColumns: [
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: '车牌号',
            align: 'center',
            key: 'cph'
          },
          {
            title: '车型',
            align: 'center',
            key: 'cx'
          },
          {
            title: '材料费',
            align: 'center',
            key: 'clf'
          },
          {
            title: '发动机大修材料费',
            align: 'center',
            key: 'fdjclf'
          },
        ],
        tableData: [],
      }
    },
    computed: {

    },
    methods: {
      initDate() {
        this.form2Item.month = new Date();
      },
      setPage(page) {
        this.form2Item.currPage = page;
        this.requestListData();
      },
      requestListData() {
        let params = {};
        for (let attr in this.form2Item) {
          params[attr] = this.form2Item[attr];
        }
        params.month = DateTool.yyyymm01FormatDate(params.month);
        let url = this.$url.maintain_BBGL_SJWHCL_list;
        this.$fetch(url, params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.tableData = res.page.list;
            this.totalSize = res.page.totalCount;
          }else{
            this.$Message.error('请求失败!');
          }
        })
      },
      exportExcel() {
        let params = this.form2Item;
        let url = this.$url.maintain_BBGL_SJWHCL_exportExcel;

        if (params.month instanceof Date) {
          url = url + '?month=' + DateTool.yyyymm01FormatDate(params.month);
        }

        this.$getExcel(url);
      }
    },
    mounted () {
      this.initDate();
    }
  }
</script>

<!--报表管理-->

<template>
  <div>
    <Card>
      <Form :model="form1Item">
        <Row>
          <Col span="24">
          <FormItem label="按月查询" style="margin: 0;">
            <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end" v-model="form1Item.month"></DatePicker>
            <Button type="primary" icon="ios-search" @click="search" v-has="'wxyh_bbgl_sjbytz_search'">搜索</Button>
            <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'wxyh_bbgl_sjbytz_daochu'">导出Excel</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Table style="margin-top: 10px;" :data="tableData" border :columns="tzColumns" border></Table>
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
        currentTab: 'name1',
        totalSize: 0,
        form1Item: {
          month: '',
          currPage: 1,
          pageSize: 10,
        },

        tzColumns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
          },
          {
            title: '车牌号',
            align: 'center',
            key: 'cph',
          },
          {
            title: '车型',
            align: 'center',
            key: 'cx',
          },
          {
            title: '保养类别',
            align: 'center',
            key: 'bylb',
          },
        ],
        tableData: [],
      }
    },
    computed: {

    },
    methods: {
      initDate() {
        this.form1Item.month = new Date();
      },
      setPage(page) {
        this.form1Item.currPage = page;
        this.requestListData();
      },
      search() {
        this.form1Item.currPage = 1;
        this.requestListData();
      },
      requestListData() {
        let params = {};
        for (let attr in this.form1Item) {
          params[attr] = this.form1Item[attr];
        }
        params.month = DateTool.yyyymm01FormatDate(params.month);
        let url = this.$url.maintain_BBGL_SJBYTZ_list;
        let that = this;
        let allDict = this.$store.state.dictData.parseDict;
        this.$fetch(url, params)
        .then(res => {
          if (res.code === 0) {
            res.page.list.forEach(item => {
              let array = (item.bylb !== null && item.bylb.length > 0) ? item.bylb.split("、") : [];
              let stringArray = [];
              array.forEach(bylbItem => {
                stringArray.push(allDict.BYLB[bylbItem]);
              })
              item.bylb = stringArray.join("、");
            })
            that.form1Item.currPage = 1;
            that.tableData = res.page.list;
            that.totalSize = res.page.totalCount;
          }else{
            this.$Message.error('请求失败!');
          }
        })
      },
      exportExcel() {
        let params = this.form1Item;
        let url = this.$url.maintain_BBGL_SJBYTZ_exportExcel;

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

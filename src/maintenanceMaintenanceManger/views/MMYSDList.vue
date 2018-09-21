<!--检验单管理-->

<template>
  <div>
    <Modal
      v-model="showDetailModal"
      title="查看验收项目"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="showDetailModal=false">关闭</Button>
      </div>
      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <div v-for="(item, itemIndex) in ysdDetailData" :key="itemIndex">
          <Tooltip v-for="(subItem, subItemIndex) in item" :key="subItem+subItemIndex">
            <div slot="content">{{ysdDictData[itemIndex].title}}</div>
            <Tag style="margin-bottom: 10px;margin-right: 20px;" type="dot" color="green">{{ysdTmpData[subItem]}}</Tag>
          </Tooltip>
        </div>
      </div>
    </Modal>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem">
          <Row>
            <Col span="24">
            <FormItem label="按验收时间进行查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
              <Button type="primary" icon="ios-search" @click="this.requestListData" v-has="'bygl_ysdgl_search'">搜索</Button>
              <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'bygl_ysdgl_daochu'">导出Excel</Button>
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
        showDetailModal: false,
        formItem: {
          date: '',
          currPage: 1,
          pageSize: 10
        },
        tableData: [],
        totalSize: 0,
        showDetailItem: [],

        ysdDetailData: [],
        ysdDictData: [],
        ysdTmpData: {},

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
            title: '报修人',
            key: 'sxr',
            align: 'center',
          },
          {
            title: '检验员',
            key: 'jyy',
            align: 'center',
          },
          {
            title: '验收时间',
            key: 'scsj',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row);
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'bygl_ysdgl_show',
                    }
                  ]
                }, '查看验收项目')
              ]);
            }
          },
        ],
      }
    },
    computed: {

    },
    methods: {
      showDetail(row) {
        let params = {id: row.byid}
        let that = this;
        this.$fetch(this.$url.maintain_BYGL_CLBY_recordDetail, params)
        .then(res => {
          // 验收单数据
          let ysdData = res.pageYsd.ysxmmc;
          let ysdArray = JSON.parse(ysdData);
          if (typeof ysdArray === 'object' && ysdArray != null && ysdArray.length > 0)  {
            that.ysdDetailData = JSON.parse(JSON.stringify(ysdArray));
            that.showDetailModal = true;
          }else{
            that.$Message.info('目前还未验收项目!');
          }
        })
      },
      setPage(page) {
        this.formItem.currPage = page;
        this.requestListData();
      },
      requestListData() {
        let params = {};
        params.date = DateTool.yyyymm01FormatDate(this.formItem.date);
        params.currPage = this.formItem.currPage;
        params.pageSize = this.formItem.pageSize;
        let that = this;
        this.$fetch(this.$url.maintain_BYGL_YSDGL_recordList, params)
        .then(res=>{
//          debugger;
          if (res.code === 0) {
            res.page.list.forEach(item => {
              item.scsj = DateTool.timesToDate(item.scsj);
//              console.log(item.scsj);
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
        let url = this.$url.maintain_BYGL_YSDGL_exportExcel;
//        url = url + '?currPage='+this.formItem.current+'&&pageSize='+this.formItem.size;
        if (this.formItem.date instanceof Date) {
          let date = DateTool.yyyymm01FormatDate(this.formItem.date);
          url = url + '?date=' + date;
        }
        this.$getExcel(url);
      },
      initData() { // 初始化验收单和检验单项目明细
        var that = this;
        let ysdSourceData = [];
        this.$fetch(this.$url.common_getAllDictListDataWithCode, {code : 'YSXM'})
        .then(res => {
          if (res.success === true) {
            let data = res.data[0].children;
            data.forEach(item => {
              let obj = {
                title: item.title,
                code: item.code,
                children: [],
              }
              item.children.forEach(subItem => {
                that.ysdTmpData[subItem.code] = subItem.title;
                let subObj = {
                  title: subItem.title,
                  code: subItem.code,
                }
                obj.children.push(subObj);
              })
              ysdSourceData.push(obj);
            })
            that.ysdDictData = ysdSourceData;
          }
        })
      },
    },
    mounted () {
      this.initData();
    }
  }
</script>



<!--检验单管理-->

<template>
  <div>
    <Modal
      v-model="showDetailModal"
      title="查看检验项目"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="showDetailModal=false">关闭</Button>
      </div>
      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <div v-for="(item, itemIndex) in jydDetailData" :key="itemIndex">
          <Tooltip v-for="(subItem, subItemIndex) in item" :key="subItem+subItemIndex">
            <div slot="content">{{jydDictData[itemIndex].title}}</div>
            <Tag style="margin-bottom: 10px;margin-right: 20px;" type="dot" color="green">{{jydTmpData[subItem]}}</Tag>
          </Tooltip>
        </div>
      </div>
    </Modal>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem">
          <Row>
            <Col span="24">
            <FormItem label="按检验时间进行查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
              <Button type="primary" icon="ios-search" @click="requestListData" v-has="'bygl_jydgl_search'">搜索</Button>
              <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'bygl_jydgl_daochu'">导出Excel</Button>
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
  import  * as DateTool from '../../../utils/DateTool'
  export default {
    components: {
    },
    data () {
      return {
        showDetailModal: false,
        formItem: {
          date: '',
          currPage: 1,
          pageSize: 10,
        },

        jydDetailData: [], // 选中的数据
        jydDictData: [], // 所有字典数据
        jydTmpData: {},  // 用于匹配code与title的数据

        showDetailItem: [],
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
            title: '车牌号',
            key: 'cph',
            align: 'center',
          },
          {
            title: '车型',
            key: 'cx',
            align: 'center',
          },
          {
            title: '送修人',
            key: 'sxr',
            align: 'center',
          },
          {
            title: '检验员',
            key: 'jyy',
            align: 'center',
          },
          {
            title: '检验时间',
            key: 'jjcsj',
            align: 'center',
          },
          {
            title: '保养类别',
            key: 'bylb',
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
                      value: 'bygl_jydgl_show',
                    }
                  ]
                }, '查看')
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
        let params = {id : row.byid};
        let that = this;
        this.$fetch(this.$url.maintain_BYGL_CLBY_recordDetail, params)
        .then(res => {
          // 检验单数据
          let jydData = res.pageJyd.ysxmmc;
          let jydArray = JSON.parse(jydData);
          let tmpData = [];
          if (jydArray != null) {
            for (let i = 0; i < jydArray.length; i++) {
              let selectValues = jydArray[i].selectValues;
              tmpData.push(selectValues);
            }
            if (typeof tmpData === 'object' && tmpData !== null && tmpData.length > 0) {
              that.jydDetailData = JSON.parse(JSON.stringify(tmpData));
            }
//            console.log(this.jydDetailData);
            that.showDetailModal = true;
          }else{
            that.$Message.info('目前还未检验项目!');
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
        this.$fetch(this.$url.maintain_BYGL_JYDGL_recordList, params)
        .then(res=>{
          if (res.code === 0) {
            res.page.list.forEach(item => {
              item.jjcsj = DateTool.timesToDate(item.jjcsj);
              item.scsj = DateTool.timesToDate(item.scsj);
            })
            that.currPage = 1;
            that.tableData = res.page.list;
            that.totalSize = res.page.totalCount;
          }else{
            that.$Message.error(res.msg);
          }
        })
      },
      exportExcel() {
        let url = this.$url.maintain_BYGL_JYDGL_exportExcel;
//        url = url + '?currPage='+this.formItem.currPage+'&pageSize='+this.formItem.pageSize;
        if (this.formItem.date instanceof Date) {
          let date = DateTool.yyyymm01FormatDate(this.formItem.date);
          url = url + '?date=' + date;
        }
        this.$getExcel(url);
      },
      // 初始化检验单字典数据
      initData() { // 初始化验收单和检验单项目明细
        var that = this;
        let jydSourceData = [];
        this.$fetch(this.$url.common_getAllDictListDataWithCode, {code : 'JYXM'})
        .then(res => {
          if (res.success === true) {
            let data = res.data[0].children;
//            console.log(data);
            // 简化数据
            data.forEach(item => {
              let obj = {
                title: item.title,
                code: item.code,
                children: [],
              }
              item.children.forEach(subItem => {
                that.jydTmpData[subItem.code] = subItem.title;
                let subObj = {
                  title: subItem.title,
                  code: subItem.code,
                }
                obj.children.push(subObj);
              })
              jydSourceData.push(obj);
            })
            that.jydDictData = jydSourceData;
          }
        })
      },
    },
    mounted () {
      this.initData();
    }
  }
</script>


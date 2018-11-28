<!--立案事故管理-->

<template>
  <div style="padding: 20px; height: 100%;">
    <Row type="flex" justify="space-between" style="border-bottom: 1px solid #e9eaec; padding-bottom: 5px;">
      <h2>
        立案事故管理
      </h2>
    </Row>
    <div v-if="$showMenu('立案事故管理')">
      <Modal
        v-model="accidentModal"
        title="新增立案事故登记"
        :mask-closable="false"
        :closable="false"
        width="50%">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="confirmAddAccident">保存</Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancleAddAccident">取消</Button>
        </div>
        <AddAccidentDiv ref="AddAccidentDiv" :formValidate="formValidate" @selectCL="updateCLInfo"/>
      </Modal>
      <Modal
        v-model="lossModal"
        title="追加事故经损"
        width="50%">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="confirmAddLoss">追加经损</Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancleAddLoss">取消</Button>
        </div>
        <AddLossDiv ref="AddLossDiv" :lossForm="lossForm"/>
      </Modal>
      <Card style="width:100%; margin-top: 20px;">
        <div slot="title">搜索查询</div>
        <Button slot="extra" size="small" type="primary" icon="plus" style="margin-right: 10px;" @click="accidentModal=true" v-has="'lasggl_lasggl_add'">新增</Button>
        <div>
          <div>
            <Form :model="searchOptions" :label-width="80">
              <div style="display: flex;flex-wrap: wrap;">
                <FormItem label="驾驶员姓名" style="margin: 0px;">
                  <Input v-model="searchOptions.jsyxm" placeholder="请输入驾驶员姓名查询..." clearable style="width: 180px"></Input>
                </FormItem>
                <FormItem label="车牌号" style="margin: 0px;">
                  <Input v-model="searchOptions.pz" placeholder="请输入牌照查询..." clearable style="width: 180px"></Input>
                </FormItem>
                <FormItem label="立案时间" style="margin: 0px;" >
                  <DatePicker v-model="searchOptions.date" style="width: 180px;" type="date"
                              placeholder="请选择立案时间"></DatePicker>
                </FormItem>
              </div>
            </Form>
            <div style="width: 100%; text-align: center; margin-top: 20px;">
              <ButtonGroup>
                <Button style="margin-right: 3px;" type="primary" icon="ios-search" @click="search" v-has="'lasggl_lasggl_search'">搜索</Button>
                <Button type="primary" icon="android-download" @click="exportExcel" v-has="'lasggl_lasggl_export'">导出</Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </Card>
      <div style="margin-top: 10px;width: 100%;height: 40px;">
        <Tag type="dot" color="#dcdee2" style="float: right; margin-right: 0px;">销案</Tag>
        <Tag type="dot" color="#5cadff" style="float: right; margin-right: 10px;">结案</Tag>
        <Tag type="dot" color="#19be6b" style="float: right; margin-right: 10px;">立案</Tag>
      </div>
      <Table style="margin-top: 10px;" :row-class-name="rowColor" :data="tableData" border :columns="initTableColumns" border></Table>
      <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
    </div>
  </div>
</template>
<script>
  import AddAccidentDiv from '../components/AddAccidentDiv.vue'
  import AddLossDiv from '../components/AddLossDiv.vue';
  import * as DateTool from '../../../utils/DateTool'
  import CanEditTable from "../../components/common/canEditTable";
  import axios from 'axios';
  export default {
    components: {
      CanEditTable,
      AddLossDiv,
      AddAccidentDiv
    },
    data () {
      return {
        //   jafy 结案费用   swrs 死亡人数  ssrs  受伤人数  kf  扣分  xczrsgfl ??
        columnsTitle: ['单位','自编号', '路别', '时间', '地点', '驾驶员姓名', '报案人', '事故属性', '事故性质', '立案日期', '勘查人', '立案状态','备注'],
        columnsCode: ['dw','zbh','lb','lasj','dd','jsyxm','bar','sgsx','sgxz','larq','kcr','lalx','bz'],
        gsColumnsTitle: ['公积金车损', '公积金车内', '公积金三者', '公积金定损金额合计', '交强险损失', '事故总损失'],
        gsColumnsCode: [ 'gjjcs', 'gjjcn', 'gjjsz', 'gjjhj', 'jqxss', 'sgzss'],
        tableData: [],
        sourceData: [], // 原始数据
        searchOptions: {
          current: 1,
          size: 10,
          pz: '',
          dw: '',
          jsyxm: '',
          date: '',
          lasjStart: '',
          lasjEnd: '',
        },
        totalSize: 0,
        accidentModal: false,
        lossModal: false,
        formValidate: {
          lasj: DateTool.getNow(),
          larq: DateTool.getNow(),
          dw: 'JTGS',
          dd: '',
          pz: '',
          zbh: '',
          jsyxm: '',
          lb: '',
          lalx: '立案',
          bar: '',
          kcr: '',
          sgsx: [],
          sgxz: '',
          kf: '',
          bz: '',
          swrs: 0,
          qsrs: 0,
          zsrs: 0,
          gjjcs: 0,
          gjjcn: 0,
          gjjsz: 0,
          gjjhj: 0,
          jqxss: 0,
          sgzss: 0,
          zr: '',
          jafy: 0,
          xczrsgfl: '',
        },
        lossForm: {
          jsyxm: "",
          laid: "",
          lb: "",
          pz: "",
          jajs: 0,
          ygjs: 0,
          hjzj: 0,
          zjcn: 0,
          zjcs: 0,
          zjgs: "",
          zjkf: 0,
          zjsz: 0,
          bz: 0,
          lasj: ''
        },
      }
    },
    computed: {
      initTableColumns() {
        let coulumns = [
          {
            title: '牌照',
            key: 'pz',
            width: 150,
            align: 'center'
          },
        ];
        for (let i = 0; i < this.columnsTitle.length; i++) {
          coulumns.push({
            title: this.columnsTitle[i],
            key: this.columnsCode[i],
            width: 120,
            align: 'center'
          });
        }
        let gsCoulumns = [];
        for (let i = 0; i < this.gsColumnsTitle.length; i++) {
          gsCoulumns.push({
            title: this.gsColumnsTitle[i],
            key: this.gsColumnsCode[i],
            width: 120,
            align: 'center',
            sortable: true
          });
        }
        coulumns.push({
          title: '估损',
          align: 'center',
          children: gsCoulumns
        });
        let newColumns = [
          {
            title: '集团公司立按事故表',
            align: 'center',
            children: coulumns,
          }
        ];
        newColumns.push({
          title: '操作',
          width: 240,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '您确定要删除这条数据吗?',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    console.log('确认删除');
                    this.deleteLASG(params.row);
                  }
                },
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    placement: 'top'
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'lasggl_lasggl_delete',
                    }
                  ],
                }, '删除')
              ]),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px',
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.showDetail(params)
                  }
                },
                directives: [
                  {
                    name: 'has',
                    value: 'lasggl_lasggl_detail',
                  }
                ],
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '20px'
                },
                on: {
                  click: () => {
                    this.lossForm.laid = params.row.id;
                    this.lossForm.lasj = params.row.lasj;
                    this.lossForm.jsyxm = params.row.jsyxm;
                    this.lossForm.lb = params.row.lb;
                    this.lossForm.pz = params.row.pz;
                    this.lossModal = true;
                  }
                },
                directives: [
                  {
                    name: 'has',
                    value: 'lasggl_lasggl_zjloss',
                  }
                ],
              }, '追加经损'),
            ]);
          }
        });

        return newColumns;
      },
    },
    methods: {
      rowColor(row, index) {
        if (row.lalx === '结案') {
          return 'status-ja';
        } else if (row.lalx === '销案') {
          return 'status-xa';
        } else {
          return 'status-la';
        }
        return 'status-la';
      },
      search() {
      	this.searchOptions.current = 1;
        this.requestListData();
      },
      confirmAddLoss() {
        let addLossDiv = this.$refs.AddLossDiv;
        addLossDiv.$refs['lossForm'].validate(valid=>{
          if (valid) {
            this.addLASGZJSG();
          }else{
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      cancleAddLoss() {
        this.lossModal = false;
      },
      confirmAddAccident() {
        let addAccidentDiv = this.$refs.AddAccidentDiv;
        addAccidentDiv.$refs['addAccident'].validate(valid=>{
          if(valid) {
            this.addLASG();
          }else{
            this.$Message.error('请按照规则来填写内容!');
          }
        });
      },
      cancleAddAccident() {
        this.accidentModal = false;
      },
      showDetail(params) {
        let rowData = this.sourceData.data.records[params.index];
        this.$router.push({
          path: '/AccidentDetail',
          query: {
            rowData: rowData
          }
        })
      },
      updateCLInfo(info) {
      	if (typeof info === 'object') {
          this.formValidate.pz = info.busNum;
          this.formValidate.lb = info.lineName;
        }else{
          this.formValidate.pz = '';
          this.formValidate.lb = '';
        }
      },

      // ***********  network ********** //
      requestListData() {
        let params = {};
        for (let attr in this.searchOptions) {
          params[attr] = this.searchOptions[attr];
        }
        params.lasjStart = DateTool.yyyymmddFormatDate(this.searchOptions.date);
        params.lasjEnd = params.lasjStart;
        let that = this;
        this.$fetch(this.$url.security_LASG_list, params)
        .then(res => {
          let allDict = this.$store.state.dictData.parseDict;
          if (res.success === true) {
            let newRes = JSON.parse(JSON.stringify(res));
            newRes.data.records.forEach(item=>{
              item.lasj = DateTool.timesToDate(item.lasj);
              item.larq = DateTool.timesToDate(item.larq);
              item.lalx = allDict.LALX[item.lalx];
              item.sgxz = allDict.SGXZ[item.sgxz];
              item.dw = allDict.EJGS[item.dw];
              item.xczrsgfl = allDict.XCSGZRFL[item.xczrsgfl];
              let sgsxArray = (item.sgsx !== null && item.sgsx.length > 0) ? item.sgsx.split("、") : [];
              let stringArray = [];
              sgsxArray.forEach(sgsxItem => {
                stringArray.push(allDict.SGSX[sgsxItem]);
              })
              item.sgsx = stringArray.join("、");
            })
            that.tableData = newRes.data.records;
            that.totalSize = newRes.data.total;
            that.searchOptions.current = newRes.data.current;
            that.sourceData = res;
          }
        })
      },
      setPage(page) {
        this.searchOptions.current = page;
        this.requestListData();
      },
      addLASG() {
        var params = {};
        for (let attr in this.formValidate) {
          params[attr] = this.formValidate[attr];
        }
        params.lalx = 'LA';
        params.sgsx = this.formValidate.sgsx.join('、');
        params.gjjhj = params.gjjsz+params.gjjcn+params.gjjcs;
        params.sgzss = params.gjjhj+params.jqxss;
        params.sgxz = this.SGXZ();
        params.lasj = DateTool.yyyymmddFormatDate(params.lasj);
        params.larq = DateTool.yyyymmddFormatDate(params.larq);
        //        console.log(params);
//        debugger;
        this.$post(this.$url.security_LASG_add, params)
        .then(res => {
          if (res.success === true) {
            this.accidentModal = false;
            this.requestListData();
            this.$Message.success('添加成功!');
          }else{
            this.$Message.error('添加失败, 请重试!');
          }
        })
      },
      deleteLASG(rowData) {
        this.$fetch(this.$url.security_LASG_delete, {id: rowData.id})
        .then(res => {
          if (res.success === true) {
            this.requestListData();
            this.$Message.success('删除成功!');
          }else{
            this.$Message.error('删除失败,请重试!');
          }
        })
      },
      addLASGZJSG() {
        let that = this;
        this.$post(this.$url.security_LASG_addLoss, this.lossForm)
        .then(res => {
          if (res.success === true) {
            that.$Message.success(' 追加成功!');
            that.lossModal = false;
            that.lossForm = {
              jsyxm: "",
              laid: "",
              lasj: '',
              lb: "",
              pz: "",
              jajs: 0,
              ygjs: 0,
              hjzj: 0,
              zjcn: 0,
              zjcs: 0,
              zjgs: "",
              zjkf: 0,
              zjsz: 0,
              bz: 0,
            }
            that.requestListData();
          }else{
            this.$Message.error('添加失败!');
          }
        })
      },
      exportExcel() {
        let url = this.$url.security_LASG_exportExcel;
        url = url + '?pz='+this.searchOptions.pz+'&jsyxm='+this.searchOptions.jsyxm;
        if (this.searchOptions.date instanceof Date) {
          let firstDay = DateTool.getFirstDay(this.searchOptions.date);
          let lastDay = DateTool.getLastDay(this.searchOptions.date);
          url = url + '&lasjStart=' + firstDay + '&lasjEnd=' + lastDay;
        }


        this.$getExcel(url);
      },
      // action
      SGXZ() {
        let qsrs = Number(this.formValidate.qsrs);
        let zsrs = Number(this.formValidate.zsrs);
        let swrs = Number(this.formValidate.swrs);
        let sgzss = Number(this.formValidate.gjjcs)+Number(this.formValidate.gjjcn)+Number(this.formValidate.gjjsz)+Number(this.formValidate.jqxss);
        let result = '';

        if (sgzss >= 10000 && sgzss < 50000 && qsrs > 0 && qsrs <= 3) {
          result = '三级轻微事故';
          result = 'SJQW';
        }

        if (sgzss >= 50000 && sgzss < 300000 && qsrs > 3 && qsrs <= 10) {
          result = '二级轻微事故';
          result = 'EJQW';
        }

        if (sgzss >= 300000 && sgzss < 500000 && qsrs > 10 && qsrs <= 50) {
          result = '三级轻微事故';
          result = 'YJQW';
        }

        if ((zsrs > 0 && zsrs <= 10) || (swrs > 0 && swrs <= 3) || (sgzss >= 500000 && sgzss <10000000)) {
          result = '一般事故';
          result = 'YBSG';
        }

        if ((zsrs > 10 && zsrs <= 50) || (swrs > 3 && swrs <= 10) || (sgzss >= 10000000 && sgzss <50000000)) {
          result = '较大事故';
          result = 'JDSG';
        }

        if ((zsrs > 50 && zsrs <= 100) || (swrs > 10 && swrs <= 30) || (sgzss >= 50000000 && sgzss <100000000)) {
          result = '重大事故';
          result = 'ZDSG';
        }

        if (zsrs > 100 || swrs > 30 || sgzss >= 100000000) {
          result = '特别重大事故';
          result = 'TDSG';
        }
        return result;
      }
    },
    mounted () {
      this.requestListData();
    },
  }
</script>

<style>
  .ivu-table .status-la td{
    background-color: #19be6b;
    color: #fff;
  }
  .ivu-table .status-xa td{
    background-color: #dcdee2;
  }
  .ivu-table .status-ja td{
    background-color: #5cadff;
    color: #fff
  }
</style>


<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <!--新增进场登记弹框-->
      <Modal
        ok-text="登记进场"
        v-model="newRecordModal"
        title="新增车辆基本信息"
        width="50%"
        :mask-closable="false"
        :closable="false">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="startMaintain('basicData')">登记进场</Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancle">取消</Button>
        </div>
        <div style="padding: 0px; height: 100%;">
          <Form :model="basicData" ref="basicData" :rules="ruleValidate" :label-width="90">
            <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
              <FormItem prop="djbh" label="登记编号:" style="margin-top: 0px;">
                <Input v-model="basicData.djbh" style="width: 140px;"></Input>
              </FormItem>
              <FormItem label="车辆自编号:" style="margin-top: 0px;">
                <Select ref="deviceSelect" v-model="basicData.clzbh" filterable @on-change="selectCLItem" style="width: 140px;" placeholder="请选择">
                  <Option v-for="(item, index) in $store.state.dictData.CLArray" :value="item" :key="index+item">{{ item }}</Option>
                </Select>
              </FormItem>
              <FormItem label="车牌号:" style="margin-top: 0px;">
                <div style="width: 140px;">{{basicData.cph}}</div>
              </FormItem>
              <FormItem label="车型:" style="margin-top: 0px;">
                <div style="width: 140px;">{{basicData.cx}}</div>
              </FormItem>
              <FormItem label="线路:" style="margin-top: 0px;">
                <div style="width: 140px;">{{basicData.xl}}</div>
              </FormItem>
              <FormItem label="分公司:" style="margin-top: 0px;">
                <div style="width: 140px;">{{basicData.fgs}}</div>
              </FormItem>
              <FormItem prop="jcsj" label="进厂时间:" style="margin-top: 0px;">
                <DatePicker
                  style="width: 140px;"
                  type="date"
                  placeholder="选择时间"
                  :transfer="true"
                  placement="bottom-end"
                  v-model="basicData.jcsj">
                </DatePicker>
              </FormItem>
              <FormItem prop="sxr" label="送修人:" style="margin-top: 0px;">
                <Input v-model="basicData.sxr" style="width: 140px;"></Input>
              </FormItem>
              <FormItem prop="jyy" label="检验员:" style="margin-top: 0px;">
                <Input v-model="basicData.jyy" style="width: 140px;"></Input>
              </FormItem>
              <FormItem prop="bylb" label="保养类别:" style="margin-top: 0px;">
                <!--<Input v-model="basicData.bylb" style="width: 140px;"></Input>-->
                <CommonSelect type="BYLB" iviewType="checkbox" :selectValue="basicData.bylb"></CommonSelect>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
      <Card>
        <Form :model="formItem">
          <Row>
            <Col span="24">
            <FormItem label="按进厂时间查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end"
                          v-model="formItem.date" style="width: 130px;"></DatePicker>
              <Button type="primary" icon="ios-search" @click="requestListData" v-has="'bygl_clby_search'">搜索</Button>
              <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'bygl_clby_daochu'">导出</Button>
              <Button type="primary" icon="plus" style="float: right;margin-right: 10px;" @click="newRecordModal = true" v-has="'bygl_clby_add'">新增</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table style="margin-top: 10px;" :data="tableData" border :columns="columns" border></Table>
      <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
    </div>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool';
  import CommonSelect from '../../components/common/CommonSelect.vue';
  export default {
    components: {
      CommonSelect
    },
    data () {
      return {
        selectCL: '',
        selectCLSelfNum: '',
        basicData: {
          djbh: '',
          clzbh: "",
          cph: '',
          cx: '',
          xl: '',
          fgs: '',
          jcsj: '',
          sxr: '',
          jyy: '',
          bylb: [],
        },
        ruleValidate: {
          djbh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          clzbh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          cph: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          cx: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          xl: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          fgs: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          jcsj: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          sxr: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          jyy: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          bylb: [
            { required: true, type: 'array', min: 1, message: '请至少选择一个', trigger: 'change' },
          ],
        },
        columns: [
          {
            title: '序号',
            align: 'center',
            type: 'index'
          },
          {
            title: '登记编号',
            align: 'center',
            key: 'djbh'
          },
          {
            title: '车辆自编号',
            align: 'center',
            key: 'clzbh'
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
            title: '线路',
            align: 'center',
            key: 'xl'
          },
          {
            title: '分公司',
            align: 'center',
            key: 'fgs'
          },
          {
            title: '进厂时间',
            align: 'center',
            key: 'jcsj'
          },
          {
            title: '送修人',
            align: 'center',
            key: 'sxr'
          },
          {
            title: '检验员',
            align: 'center',
            key: 'jyy'
          },
          {
            title: '保养类别',
            align: 'center',
            key: 'bylb'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 150,
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
                      this.deleteRow(params.row);
                    }
                  }
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
                        value: 'bygl_clby_delete',
                      }
                    ]
                  }, '删除')
                ]),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      console.log('查看详情');
                      this.$router.push({
                        path: '/MMDetail',
                        query: {row: params.row}
                      })
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'bygl_clby_show',
                    }
                  ]
                }, '查看'),
              ]);
            }
          },
        ],
        sourceData: [],
        tableData:[],
        formItem: {
          date: '',
          currPage: 1,
          pageSize: 10,
        },
        totalSize: 0,
        newRecordModal: false,
        loading: true,
      }
    },
    computed: {

    },
    methods: {
      startMaintain(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveRow();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      cancle() {
        this.newRecordModal = false;
        let newData = {
          djbh: '',
          clzbh: '',
          cph: '',
          clxh: '',
          cx: '',
          xl: '',
          gfs: '',
          jcsj: '',
          sxr: '',
          jyy: '',
          bylb: '',
        };
        newData.clzbh = this.basicData.clzbh;
        this.basicData = newData;
      },
      saveRow() {
        let fgsDict = this.$store.state.dictData.parseDict.EJGS;
        let params = {};
        for (let attr in this.basicData) {
          params[attr] = this.basicData[attr];
        }
        params.jcsj = DateTool.yyyymmddFormatDate(this.basicData.jcsj);
        for (let attr in fgsDict) {
          if (fgsDict[attr] === params.fgs) {
            params.fgs = attr;
          }
        }
        if (params.bylb.length > 0) {
          params.bylb = params.bylb.join('、');
        }

        var that = this;
        this.$post(this.$url.maintain_BYGL_CLBY_saveRecord, params)
        .then(res => {
          if (res.code === 0) {
            let newData = {
              djbh: '',
              clzbh: '',
              cph: '',
              clxh: '',
              cx: '',
              xl: '',
              gfs: '',
              jcsj: '',
              sxr: '',
              jyy: '',
              bylb: '',
            };
            newData.clzbh = this.basicData.clzbh;
            that.basicData = newData;
            that.$Message.success('登记成功, 请在列表查看!');
            that.newRecordModal = false;
            that.requestListData();
          }else{
            this.$Message.error('登记失败, 请重试!');
          }
        })
      },
      deleteRow(row) {
        var that = this;
        let params = {id : row.id};
        this.$fetch(this.$url.maintain_BYGL_CLBY_deleteRecord, params)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('删除成功!');
            that.requestListData();
          }else{
            this.$Message.error('删除失败!');
          }
        });
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
        this.$fetch(this.$url.maintain_BYGL_CLBY_recordList, params)
        .then(res => {
          if (res.code === 0) {
            that.sourceData = JSON.parse(JSON.stringify(res.page.list));
            let allDict = this.$store.state.dictData.parseDict;
            res.page.list.forEach(item => {
              item.jcsj = DateTool.timesToDate(item.jcsj);
              item.fgs = allDict.EJGS[item.fgs];
              let array = (item.bylb !== null && item.bylb.length > 0) ? item.bylb.split("、") : [];
              let stringArray = [];
              array.forEach(bylbItem => {
                stringArray.push(allDict.BYLB[bylbItem]);
              })
              item.bylb = stringArray.join("、");
            })
            that.currPage = 1;
            that.tableData = res.page.list;
            that.totalSize = res.page.totalCount;
          }else{
            that.$Message.error('获取数据失败!');
          }
        })
      },
      exportExcel() {
        let url = this.$url.maintain_BYGL_CLBY_exportExcel;
        url = url + '?currPage='+this.formItem.currPage+'&pageSize='+this.formItem.pageSize;
        if (this.formItem.date instanceof Date) {
          url = url + '&date=' + this.formItem.date;
        }
        this.$getExcel(url);
      },
      selectCLItem(value) {

        this.selectCL = this.$store.state.dictData.CLDict[value];
        this.basicData.cph = this.selectCL.busNum;
        this.basicData.cx = this.selectCL.busModelName;
        this.basicData.xl = this.selectCL.lineName;
        this.basicData.fgs = this.selectCL.orgName;
      }
    },
    mounted () {
      this.requestListData();
    }
  }
</script>

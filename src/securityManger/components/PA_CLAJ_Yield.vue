<!--安全生产情况分析-->
<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <div style="display: flex;align-items: center">
          <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end"
                      v-model="formItem.tab7Date"></DatePicker>
          <CheckboxGroup v-model="formItem.tab7Select" style="margin-left: 20px;">
            <Checkbox label="1">第一季度</Checkbox>
            <Checkbox label="2">第二季度</Checkbox>
            <Checkbox label="3">第三季度</Checkbox>
            <Checkbox label="4">第四季度</Checkbox>
          </CheckboxGroup>
          <Button type="primary" icon="ios-search" @click="requestListData" v-has="'aqscqkfx_claj_search'">搜索</Button>
          <Button type="primary" icon="plus" style="position: absolute;right: 100px;" @click="addModal = true">新增
          </Button>
          <Button type="primary" icon="android-download" style="position: absolute;right: 10px" @click="exportExcel"
                  v-has="'aqscqkfx_claj_export'">导出
          </Button>
        </div>
      </Form>
    </Card>
    <Table border style="margin-top: 10px;" :data="PA_CLAJ_Yield_Data" :columns="PA_CLAJ_Yield">
      <div slot="header" style="height: 50px;font-size: 18px;text-align: center">
        {{tableTitle}}
      </div>
    </Table>
    <Modal
      v-model="addModal"
      title="新增车辆安检信息"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="saveCLAJ('addItem')"
                v-show="edit===false">保存
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="updateCLAJ('addItem')"
                v-show="edit===true">修改
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <div style="padding: 0px; height: 100%;">
        <Form :model="addItem" ref="addItem" :rules="ruleValidate" :label-width="90">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="单位:" style="margin-bottom: 0px" prop="dw">
              <CommonSelect type="EJGS" :selectValue="addItem.dw" style="width: 135px;"></CommonSelect>
            </FormItem>
            <FormItem prop="date" label="年份月份:" style="margin-top: 0px;">
              <DatePicker
                style="width: 140px;"
                type="month"
                placeholder="选择时间"
                :transfer="true"
                placement="bottom-end"
                v-model="addItem.date">
              </DatePicker>
            </FormItem>
            <FormItem label="检车台次">
              <InputNumber v-model="addItem.ajJctc" style="width: 135px;"></InputNumber>
            </FormItem>
            <FormItem label="不合格">
              <InputNumber v-model="addItem.ajBhg" style="width: 135px;"></InputNumber>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import PATableData from '../views/PATableData.js';
  import QuarterQuery from './QuarterQuery.vue';
  import * as DateTool from '../../../utils/DateTool';
  import CommonSelect from '../../components/common/CommonSelect.vue'

  export default {
    components: {
      QuarterQuery,
      CommonSelect
    },
    data() {
      return {
        currentTab: 'name1',
        edit: false,
        exportURL: this.$url.security_AQQKFX_exportExcel,
        formItem: {
          tab7Date: this.initDate(),
          tab7Select: ['1'],
        },
        addItem: {
          dw: '',
          ajJctc: 0,
          id: '',
          ajBhg: 0,
          date: ''
        },
        addModal: false,
        tableTitle: '',
        PA_CLAJ_Yield: [
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.EJGS[params.row.dw];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '月份',
            key: 'yf',
            align: 'center',
          },
          {
            title: '检车台次',
            key: 'jctc',
            align: 'center',
          },
          {
            title: '不合格',
            key: 'bhg',
            align: 'center',
          },
          {
            title: '合格率',
            key: 'hgl',
            align: 'center',
          },
          {
            title: '操作',
            key: 'time',
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
                      this.edit = true
                      this.addModal = true;
                      console.log(params.row)
                      this.addItem.ajJctc = params.row.jctc
                      this.addItem.ajBhg = params.row.bhg
                      this.addItem.dw = params.row.dw
                      this.addItem.id = params.row.id
                      this.addItem.date = params.row.nd.toString() + params.row.yf.toString()
                    }
                  }
                }, '操作'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    type: 'error',
                    size: 'large',
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      debugger
                      this.$post(this.$url.claj_del + '?id=' + params.row.id)
                        .then(res => {
                          console.log(res);
                          if (res.success === true) {
                            this.$Message.info('删除成功');
                            this.requestListData();
                          } else {
                            this.$Message.error('删除失败')
                          }
                        })
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                  }, '删除')
                ])
              ]);
            }
          }
        ],
        PA_CLAJ_Yield_Data: [],
        ruleValidate: {
          dw: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          date: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ]
        }
      }
    },
    computed: {},
    methods: {
      initDate() {
        let now = new Date();
        return now;
      },
      cancel() {
        this.addModal = false;
        this.edit = false
        this.addItem.dw = '',
          this.addItem.ajJctc = 0,
          this.addItem.ajBhg = 0,
          this.addItem.date = ''
      },
      getTableTitle() {
        let year = this.formItem.tab7Date.getFullYear();
        let jiduArray = [];
        this.formItem.tab7Select.forEach(item => {
          if (item === '1') {
            jiduArray.push('一');
          } else if (item === '2') {
            jiduArray.push('二');
          } else if (item === '3') {
            jiduArray.push('三');
          } else {
            jiduArray.push('四');
          }
        })
        let jiduStr = jiduArray.join('、');
        let title = year + '年第' + jiduStr + '季度车辆安检台次及合格率';
        this.tableTitle = title;
      },
      getData() {
        //车辆安检台次及合格率
        // this.PA_CLAJ_Yield = PATableData.PA_CLAJ_Yield;
      },
      requestListData() {
        let params = this.getParams();
        params.jidus = params.jidus.join(',');
        this.getTableTitle();
        let allDict = this.$store.state.dictData.parseDict;
        let that = this;
        let url = this.$url.claj_list + '?year=' + params.year + '&jidu=' + params.jidus;
        this.$fetch(url)
          .then(res => {
            if (res.success === true) {
              // res.data.forEach(item => {
              //   item.dw = allDict.EJGS[item.dw];
              // })
              that.PA_CLAJ_Yield_Data = res.data;
            }
          });
      },
      exportExcel() {
        console.log('导出数据');
        let params = this.getParams();
        let year = params.year;
        let url = params.exportURL;
        let jidus = params.jidus;
        url = url + '?year=' + year + '&jidus=' + jidus;
        this.$getExcel(url);
      },
      getParams() {
        let params = {
          jidus: '',
          year: '',
          exportURL: ''
        };
        params.jidus = this.formItem.tab7Select;
        params.year = this.formItem.tab7Date.getFullYear();
        this.exportURL = this.$url.security_CLAJ_exportExcel;
        params.exportURL = this.exportURL;
        return params;
      },
      updateCLAJ(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.updateCl();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      updateCl() {
        let params = {
          bhg: this.addItem.ajBhg,
          jctc: this.addItem.ajJctc,
          dw: this.addItem.dw,
          id: this.addItem.id,
          nd: this.addItem.date.getFullYear(),
          yf: this.addItem.date.getMonth() + 1,
        };

        this.$post(this.$url.claj_update, params)
          .then(res => {
            if (res.success === true) {
              this.addModal = false;
              this.addItem = {
                dw: '',
                jctc: 0,
                bhg: 0,
                date: ''
              }
              this.$Message.success('修改成功');
              this.edit = false
              this.requestListData();
            } else {
              this.$Message.error('修改失败');
            }
          })
      },
      saveCLAJ(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.requestSave();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      requestSave() {
        let params = {
          bhg: this.addItem.ajBhg,
          jctc: this.addItem.ajJctc,
          dw: this.addItem.dw,
          nd: this.addItem.date.getFullYear(),
          yf: this.addItem.date.getMonth() + 1,
        };

        this.$post(this.$url.security_SCQKFX_add, params)
          .then(res => {
            if (res.success === true) {
              this.addModal = false;
              this.addItem = {
                dw: '',
                ajJctc: 0,
                ajBhg: 0,
                date: ''
              }
              this.$Message.success('添加成功');
            } else {
              this.$Message.error('数据已经存在，不能添加');
            }
          })
      }
    },
    mounted() {
      this.getTableTitle();
    },
    created() {
      this.getData();
    }
  }
</script>

<!--
"ajBhg": 0,
  "ajJctc": 0,
    "clbxHpe": 0,
  "dw": "string",
  "nf": 0,
  "yf": 0,
  "dwtbHpe": 0,
  "dwtbSj": 0,
-->







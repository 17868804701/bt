<!--返修管理-->

<template>
  <div>
    <Modal
      v-model="updateModal"
      title="更新返修记录"
      width="50%">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="update('updateItem')">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancleUpdate">取消</Button>
      </div>
      <div>
        <Form :model="updateItem" ref="updateItem" :rules="updateRuleValidate" :label-width="120">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start">
            <FormItem label="车辆自编号:" style="margin-top: 0px;">
              <div style="width:110px;">{{updateItem.zbh}}</div>
            </FormItem>
            <FormItem prop="ch" label="车号" style="margin-top: 0px;">
              <div style="width:110px;">{{updateItem.ch}}</div>
            </FormItem>
            <FormItem prop="cx" label="车型" style="margin-top: 0px;">
              <div style="width:110px;">{{updateItem.cx}}</div>
            </FormItem>
            <FormItem prop="fxjcsj" label="返修进厂时间" style="margin-top: 0px;">
              <DatePicker type="date" placeholder="选择时间" :transfer="true" placement="bottom-end" v-model="updateItem.fxjcsj" style="width:110px;"></DatePicker>
            </FormItem>
            <FormItem prop="fxccsj" label="返修出厂时间" style="margin-top: 0px;">
              <DatePicker type="date" placeholder="选择时间" :transfer="true" placement="bottom-end" v-model="updateItem.fxccsj" style="width:110px;"></DatePicker>
            </FormItem>
            <FormItem prop="fxxm" label="返修项目" style="margin-top: 0px;">
              <Input v-model="updateItem.fxxm" style="width:110px;"></Input>
            </FormItem>
            <FormItem prop="fxyy" label="返修原因" style="margin-top: 0px;">
              <Input v-model="updateItem.fxyy" style="width:110px;"></Input>
            </FormItem>
            <FormItem prop="bz" label="备注" style="margin-top: 0px;">
              <Input v-model="updateItem.bz" style="width:110px;"></Input>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
    <Modal
      v-model="backModal"
      title="新增返修记录"
      width="50%">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="confirmFX('backItem')">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancle">取消</Button>
      </div>
      <div>
        <Form :model="backItem" ref="backItem" :rules="ruleValidate" :label-width="120">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start">
            <FormItem label="车辆自编号:" style="margin-top: 0px;">
              <Select ref="deviceSelect" v-model="backItem.zbh" filterable @on-change="selectCLItem" style="width: 140px;" placeholder="请选择">
                <Option v-for="(item, index) in $store.state.dictData.CLArray" :value="item" :key="index+item">{{ item }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="ch" label="车号" style="margin-top: 0px;">
              <div style="width:110px;">{{backItem.ch}}</div>
            </FormItem>
            <FormItem prop="cx" label="车型" style="margin-top: 0px;">
              <div style="width:110px;">{{backItem.cx}}</div>
            </FormItem>
            <FormItem prop="fxjcsj" label="返修进厂时间" style="margin-top: 0px;">
              <DatePicker type="date" placeholder="选择时间" :transfer="true" placement="bottom-end" v-model="backItem.fxjcsj" style="width:110px;"></DatePicker>
            </FormItem>
            <FormItem prop="fxccsj" label="返修出厂时间" style="margin-top: 0px;">
              <DatePicker type="date" placeholder="选择时间" :transfer="true" placement="bottom-end" v-model="backItem.fxccsj" style="width:110px;"></DatePicker>
            </FormItem>
            <FormItem prop="fxxm" label="返修项目" style="margin-top: 0px;">
              <Input v-model="backItem.fxxm" style="width:110px;"></Input>
            </FormItem>
            <FormItem prop="fxyy" label="返修原因" style="margin-top: 0px;">
              <Input v-model="backItem.fxyy" style="width:110px;"></Input>
            </FormItem>
            <FormItem prop="bz" label="备注" style="margin-top: 0px;">
              <Input v-model="backItem.bz" style="width:110px;"></Input>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem">
          <Row>
            <Col span="24">
            <FormItem label="按返修进场时间查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
              <Button type="primary" icon="ios-search" @click="this.requestListData" v-has="'bygl_fxgl_search'">搜索</Button>
              <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'bygl_fxgl_daochu'">导出</Button>
              <Button type="primary" icon="plus" style="float: right;margin-right: 10px" @click="backModal=true" v-has="'bygl_fxgl_add'">新增</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <can-edit-table style="margin-top: 10px;" v-model="tableData" :columnsList="columns">
      </can-edit-table>
      <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
    </div>
  </div>
</template>
<script>
  import canEditTable from '../../components/common/canEditTable.vue'
  import * as DateTool from '../../../utils/DateTool'
  export default {
    components: {
      canEditTable
    },
    data () {
      return {
        // 车号、车型、返修进厂时间、返修出厂时间、返修项目以及返修原因、备注
        backModal: false,
        updateModal: false,
        formItem: {
          date: '',
          currPage: 1,
          pageSize: 10,
        },
        totalSize: 0,
        tableData: [],
        backItem: {
          id: '',
          zbh: '',
          ch: '',
          cx: '',
          fxjcsj: '',
          fxccsj: '',
          fxxm: '',
          fxyy: '',
          bz: '',
        },
        updateItem: {
          id: '',
          zbh: '',
          ch: '',
          cx: '',
          fxjcsj: '',
          fxccsj: '',
          fxxm: '',
          fxyy: '',
          bz: '',
        },
        ruleValidate: {
          ch: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          cx: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          fxjcsj: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          fxccsj: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          fxyy: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          bz: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
        },
        updateRuleValidate: {
          fxjcsj: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          fxccsj: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          fxyy: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          bz: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
        },
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60,
          },
          {
            title: '自编号',
            key: 'zbh',
            align: 'center',
          },
          {
            title: '车号',
            key: 'ch',
            align: 'center',
          },
          {
            title: '车型',
            key: 'cx',
            align: 'center',

          },
          {
            title: '返修进厂时间',
            key: 'fxjcsj',
            align: 'center',
          },
          {
            title: '返修出厂时间',
            key: 'fxccsj',
            align: 'center',
          },
          {
            title: '返修项目',
            key: 'fxxm',
            align: 'center',
          },
          {
            title: '返修原因',
            key: 'fxyy',
            align: 'center',
          },
          {
            title: '备注',
            key: 'bz',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
                      this.deleteRow(params);
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
                        value: 'bygl_fxgl_delete',
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
                      for (let attr in this.updateItem) {
                        this.updateItem[attr] = params.row[attr];
                      }
//                      debugger
//                      console.log(this.updateItem);
                      this.updateModal = true;
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'bygl_fxgl_update',
                    }
                  ]
                }, '编辑'),
              ]);
            }
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
      requestListData() {
        let params = {};
        params.date = DateTool.yyyymm01FormatDate(this.formItem.date);
        params.currPage = this.formItem.currPage;
        params.pageSize = this.formItem.pageSize;
        let that = this;
        this.$fetch(this.$url.maintain_BYGL_FXGL_recordList, params)
        .then(res=>{
//          debugger
          if (res.code === 0) {
            res.page.list.forEach(item => {
              item.fxccsj = DateTool.timesToDate(item.fxccsj);
              item.fxjcsj = DateTool.timesToDate(item.fxjcsj);
            })
            that.currPage = 1;
            that.tableData = res.page.list;
            that.totalSize = res.page.totalCount;
//            debugger;
          }else{
            that.$Message.error(res.msg);
          }
        })
      },
      selectCLItem(value) {
        if (typeof value !== 'undefined' && value.length > 0) {
          let selectCL = this.$store.state.dictData.CLDict[value];
          this.backItem.ch = selectCL.busNum;
          this.backItem.cx = selectCL.busModelName;
        }
      },
      confirmFX(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveRow();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      cancle() {
        let newBackItem = {
          id: '',
          zbh: '',
          ch: '',
          cx: '',
          fxjcsj: '',
          fxccsj: '',
          fxxm: '',
          fxyy: '',
          bz: '',
        };
        if (typeof this.backItem.zbh !== 'undefined' && this.backItem.zbh.length > 0) {
          newBackItem.zbh = this.backItem.zbh;
          newBackItem.ch = this.backItem.ch;
          newBackItem.cx = this.backItem.cx;
        }
        this.backItem = newBackItem;
        this.backModal = false;
      },
      saveRow() {
        let params = {};
        for (let attr in this.backItem) {
          params[attr] = this.backItem[attr];
        }
        params.fxjcsj = DateTool.yyyymmddFormatDate(params.fxjcsj);
        params.fxccsj = DateTool.yyyymmddFormatDate(params.fxccsj);
        let that = this;
        this.$post(this.$url.maintain_BYGL_FXGL_save, this.backItem)
        .then(res => {
          if (res.code === 0) {
            let newBackItem = {
              id: '',
              zbh: '',
              ch: '',
              cx: '',
              fxjcsj: '',
              fxccsj: '',
              fxxm: '',
              fxyy: '',
              bz: '',
            };
            if (typeof this.backItem.zbh !== 'undefined' && this.backItem.zbh.length > 0) {
              newBackItem.zbh = this.backItem.zbh;
              newBackItem.ch = this.backItem.ch;
              newBackItem.cx = this.backItem.cx;
            }
            that.backItem = newBackItem;
            that.$Message.success('保存成功, 请在列表查看!');
            that.backModal = false;
            that.requestListData();
          }else{
            that.$Message.error('保存失败, 请重试!');
          }
        })
      },


      cancleUpdate() {
        let newUpdateItem = {
          id: '',
          zbh: '',
          ch: '',
          cx: '',
          fxjcsj: '',
          fxccsj: '',
          fxxm: '',
          fxyy: '',
          bz: '',
        };
        if (typeof this.updateItem.zbh !== 'undefined' && this.updateItem.zbh.length > 0) {
          newUpdateItem.zbh = this.updateItem.zbh;
          newUpdateItem.ch = this.updateItem.ch;
          newUpdateItem.cx = this.updateItem.cx;
        }
        this.updateItem = newUpdateItem;
        this.updateModal = false;
      },
      update(name) {
        this.$refs[name].validate((valid) => {
//          debugger;

          if (valid) {
            let params = {};
            for (let attr in this.updateItem) {
              params[attr] = this.updateItem[attr];
            }
//            debugger
            params.fxjcsj = DateTool.yyyymmddFormatDate(params.fxjcsj);
            params.fxccsj = DateTool.yyyymmddFormatDate(params.fxccsj);
            var that = this;
            this.$post(this.$url.maintain_BYGL_FXGL_update, params)
            .then(res => {
              if (res.code === 0) {
                that.$Message.success('更新成功!');
//                let newUpdateItem = {
//                  id: '',
//                  zbh: '',
//                  ch: '',
//                  cx: '',
//                  fxjcsj: '',
//                  fxccsj: '',
//                  fxxm: '',
//                  fxyy: '',
//                  bz: '',
//                };
//                if (typeof that.updateItem.zbh !== 'undefined' && that.updateItem.zbh.length > 0) {
//                  newUpdateItem.zbh = this.updateItem.zbh;
//                }
//                that.updateItem = newUpdateItem;
                that.updateModal = false;
              } else{
                that.$Message.error('修改失败!');
              }
              that.requestListData();
            })
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      deleteRow(params) {
        var that = this;
        let p = {id : params.row.id};
        let url = this.$url.maintain_BYGL_FXGL_delete + '?id=' +params.row.id ;
        this.$post(url)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.$Message.success('删除成功!');
            that.requestListData();
          }else{
            this.$Message.error('删除失败!');
          }
        })
      },
      exportExcel() {
        let url = this.$url.maintain_BYGL_FXGL_exportExcel;
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

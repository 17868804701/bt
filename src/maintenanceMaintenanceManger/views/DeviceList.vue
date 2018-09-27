<!--设备信息管理-->

<template>

  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Modal
        v-model="addModal"
        title="设备信息"
        width="50%">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="confirmAddDevice('deviceItem')">保存</Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="addModal=false">取消</Button>
        </div>
        <div>
          <Form ref="deviceItem" :model="deviceItem" :rules="ruleValidate" :label-width="100">
            <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
              <FormItem prop="sbbh" label="设备编号:" style="margin-top: 0px;">
                <Input v-model="deviceItem.sbbh" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="sbmc" label="设备名称:" style="margin-top: 0px;">
                <Input v-model="deviceItem.sbmc" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="ggxh" label="规格型号:" style="margin-top: 0px;">
                <Input v-model="deviceItem.ggxh" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="fzxs" label="复杂系数:" style="margin-top: 0px;">
                <Input v-model="deviceItem.fzxs" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="zzcm" label="制造厂名:" style="margin-top: 0px;">
                <Input v-model="deviceItem.zzcm" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="ccbh" label="出厂编号:" style="margin-top: 0px;">
                <Input v-model="deviceItem.ccbh" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="ccrq" label="出厂日期:" style="margin-top: 0px;">
                <DatePicker
                  style="width: 120px;"
                  type="date"
                  placeholder="选择时间"
                  :transfer="true"
                  placement="bottom-end"
                  v-model="deviceItem.ccrq">
                </DatePicker>
              </FormItem>
              <FormItem prop="kssyrq" label="开始使用日期:" style="margin-top: 0px;">
                <DatePicker
                  style="width: 120px;"
                  type="date"
                  placeholder="选择时间"
                  :transfer="true"
                  placement="bottom-end"
                  v-model="deviceItem.kssyrq">
                </DatePicker>
              </FormItem>
              <FormItem prop="azdd" label="安装地点:" style="margin-top: 0px;">
                <Input v-model="deviceItem.azdd" style="width:120px;"></Input>
              </FormItem>
              <FormItem prop="zrr" label="责任人:" style="margin-top: 0px;">
                <Input v-model="deviceItem.zrr" style="width:120px;"></Input>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
      <Card>
        <Form :model="formItem">
          <div>
            <Button type="primary" v-has="'sbbygl_sbxxgl_search'" icon="plus" style="margin-right: 10px" @click="addModal=true" >新增</Button>
            <Button type="primary" v-has="'sbbygl_sbxxgl_daochu'" icon="android-download" @click="exportExcel">导出Excel</Button>
          </div>
        </Form>
      </Card>
      <Table style="margin-top: 10px;" :data="tableData" :columns="columns" border></Table>
      <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
    </div>
  </div>
</template>
<script>
  import canEditTable from '../../components/common/canEditTable.vue';
  import CommonSelect from '../../components/common/CommonSelect.vue';
  import * as DateTool from '../../../utils/DateTool';
  export default {
    components: {
      canEditTable,
      CommonSelect,
    },
    data () {
      return {
        formItem: {
          date: '',
          currPage: 1,
          pageSize: 10,
        },
        totalSize: 0,
        deviceItem: {
          id : '',
          sbbh: "A004",
          sbmc: "设备名称4",
          ggxh: "规格型号4",
          fzxs: "复杂系数4",
          zzcm: "制造厂名4",
          ccbh: "出厂编号4",
          ccrq: '',
          kssyrq: '',
          azdd: "安装地点4",
          zrr: "责任人4"
        },
        ruleValidate: {
          sbbh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          sbmc: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          ggxh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          fzxs: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          zzcm: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          ccbh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          ccrq: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          kssyrq: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          azdd: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          zrr: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
        },
        addModal: false,
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60,
          },
          {
            title: '设备编号',
            key: 'sbbh',
            align: 'center',
          },
          {
            title: '设备名称',
            key: 'sbmc',
            align: 'center',
          },
          {
            title: '规格型号',
            key: 'ggxh',
            align: 'center',
          },
          {
            title: '复杂系数',
            key: 'fzxs',
            align: 'center',
          },
          {
            title: '制造厂名',
            key: 'zzcm',
            align: 'center',
          },
          {
            title: '出厂编号',
            key: 'ccbh',
            align: 'center',
          },
          {
            title: '出厂日期',
            key: 'ccrq',
            align: 'center',
          },
          {
            title: '开始使用日期',
            key: 'kssyrq',
            align: 'center',
          },
          {
            title: '安装地点',
            key: 'azdd',
            align: 'center',
          },
          {
            title: '责任人',
            key: 'zrr',
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
                        value: 'sbbygl_sbxxgl_delete',
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
                      this.updateRow(params);
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'sbbygl_sbxxgl_update',
                    }
                  ]
                }, '修改')
              ]);
            }
          },
        ],
        tableData: [],
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
        console.log('请求设备列表');
        this.$fetch(this.$url.maintain_DEVICE_list, this.formItem)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            res.page.records.forEach(item => {
              item.ccrq = DateTool.timesToDate(item.ccrq);
              item.kssyrq = DateTool.timesToDate(item.kssyrq);
            })
            this.tableData = res.page.records;
            this.totalSize = res.page.total;
          }else{
            this.$Message.error('请求失败!');
          }
        })
      },
      deleteRow(params) {
        let p = {id : params.row.id};
        let that = this;
        this.$fetch(this.$url.maintain_DEVICE_delete, p)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            that.$Message.success('删除成功!');
            that.requestListData();
          } else {
            that.$Message.error('删除失败, 请重试!');
          }
        })
      },
      saveRow() {
        console.log(this.deviceItem);
        let url = '';
        if (this.deviceItem.id.length > 0) {
          console.log('更新接口');
          url = this.$url.maintain_DEVICE_update;
        } else {
          console.log('新增接口');
          url = this.$url.maintain_DEVICE_save;
        }
        this.$post(url, this.deviceItem)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.addModal = false;
            this.$Message.success('操作成功, 请在列表查看!');
            this.deviceItem = {
              id : '',
              sbbh: "",
              sbmc: "",
              ggxh: "",
              fzxs: "",
              zzcm: "",
              ccbh: "",
              ccrq: '',
              kssyrq: '',
              azdd: "",
              zrr: ""
            };
            this.requestListData();
          } else {
            this.$Message.error('操作失败, 请重试!');
          }
        })
      },
      updateRow(params) {
        console.log(params.row);
        for (let attr in params.row) {
          this.deviceItem[attr] = params.row[attr];
        }
        this.addModal = true;
      },
      confirmAddDevice(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveRow();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      exportExcel() {
//        console.log(this.formItem);
//        console.log('导出');
        let url = this.$url.maintain_DEVICE_exportExcel;
        this.$getExcel(url);
      }
    },
    mounted () {

    }
  }
</script>


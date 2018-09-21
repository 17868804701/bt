<!--维修工信息管理-->

<template>

  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <!--新增维修工-->
      <Modal
        v-model="addModal"
        title="维修工信息"
        width="50%"
        :mask-closable="false"
        :closable="false">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="clickSaveBtn('worker')">保存</Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancle">取消</Button>
        </div>
        <div style="padding: 0px; height: 100%;">
          <Form :model="worker" ref="worker" :rules="ruleValidate" :label-width="90">
            <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
              <FormItem prop="gh" label="工号" style="margin-top: 0px;">
                <Input v-model="worker.gh" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="xm" label="姓名" style="margin-top: 0px;">
                <Input v-model="worker.xm" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="xb" label="性别" style="margin-top: 0px;">
                <Select v-model="worker.xb" style="width: 110px;">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </FormItem>
              <FormItem prop="shcj" label="所属车间" style="margin-top: 0px;">
                <CommonSelect type="CJXX" :selectValue="worker.shcj"></CommonSelect>
              </FormItem>
              <FormItem prop="wxbz" label="维修班组" style="margin-top: 0px;">
                <CommonSelect type="WXBZ" :selectValue="worker.wxbz"></CommonSelect>
              </FormItem>
              <FormItem prop="lxdh" label="联系电话" style="margin-top: 0px;">
                <Input v-model="worker.lxdh" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="zt" label="状态" style="margin-top: 0px;">
                <Input v-model="worker.zt" style="width: 110px;"></Input>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
      <Card>
        <Form :model="formItem">
          <FormItem label="按姓名查询" style="margin: 0;">
            <Input v-model="formItem.name" style="width: 120px;"></Input>
            <Button type="primary" icon="ios-search" @click="requestListData" v-has="'jcsjgl_wxgxxgl_search'">搜索</Button>
            <Button type="primary" icon="plus" style="float: right;margin-right: 10px;" @click="addModal=true" v-has="'jcsjgl_wxgxxgl_add'">新增</Button>
          </FormItem>
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
          name: '',
          currPage: 1,
          pageSize: 10,
        },
        totalSize: 0,
        addModal: false,
        worker: {
          id: "",
          gh: "",
          xm: "",
          xb: "",
          shcj: "",
          wxbz: "",
          lxdh: "",
          zt: ""
        },
        ruleValidate: {
          gh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          xm: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          xb: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          shcj: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          wxbz: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          lxdh: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          zt: [
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
            title: '工号',
            key: 'gh',
            align: 'center',
          },
          {
            title: '姓名',
            key: 'xm',
            align: 'center',
          },
          {
            title: '性别',
            key: 'xb',
            align: 'center',
          },
          {
            title: '所属车间',
            key: 'shcjText',
            align: 'center',
          },
          {
            title: '维修班组',
            key: 'wxbzText',
            align: 'center',
          },
          {
            title: '联系电话',
            key: 'lxdh',
            align: 'center',
          },
          {
            title: '状态',
            key: 'zt',
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
                        value: 'jcsjgl_wxgxxgl_delete',
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
                      for (let attr in this.worker) {
                        this.worker[attr] = params.row[attr];
                      }
                      this.addModal = true;
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'jcsjgl_wxgxxgl_update',
                    }
                  ]
                }, '修改'),
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
        let that = this;
        let cjxxDict = that.$store.state.dictData.parseDict.CJXX;
        let wxbzDict = that.$store.state.dictData.parseDict.WXBZ;
        this.$fetch(this.$url.maintain_BYGL_DATA_WXGXX_list, this.formItem)
        .then(res => {
          if (res.code === 0) {
            res.page.records.forEach(item => {
              item.shcjText = cjxxDict[item.shcj];
              item.wxbzText = wxbzDict[item.wxbz];
            })
            this.tableData = res.page.records;
            this.totalSize = res.page.total;
          }else{
            this.$Message.error(res.message);
          }
        })
      },
      clickSaveBtn(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveOrUpdate();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      cancle() {
        this.addModal = false;
        this.worker = {
            id: "",
            gh: "",
            xm: "",
            xb: "",
            shcj: "",
            wxbz: "",
            lxdh: "",
            zt: ""
        }
      },
      saveOrUpdate() {
        console.log(this.worker);
        this.$post(this.$url.maintain_BYGL_DATA_WXGXX_saveOrUpdate, this.worker)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.$Message.success('保存成功!');
            this.addModal = false;
            this.worker = {
              id: "",
              gh: "",
              xm: "",
              xb: "",
              shcj: "",
              wxbz: "",
              lxdh: "",
              zt: ""
            }
            this.requestListData();
          }else{
            this.$Message.error('保存失败, 请重试!');
          }
        })
      },
      deleteRow(params) {
        let url = this.$url.maintain_BYGL_DATA_WXGXX_delete;
        url += '?id=' + params.row.id;
        this.$post(url)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.$Message.success('删除成功!');
            this.requestListData();
          } else {
            this.$Message.error('删除失败, 请重试!');
          }
        })
      },
    },
    mounted () {

    }
  }
</script>


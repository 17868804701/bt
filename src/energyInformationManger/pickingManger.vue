<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        领料管理
      </h2>
      <Tabs value="name1" style="margin-top: 5px;">
        <TabPane v-if="$showMenu('领料管理')" label="领料管理" name="name1">
          <Card>
            <Form :model="formItem" :label-width="110">
              <Row>
                <Col span="24">
                  <FormItem label="选择时间" style="margin: 0 0 0 -50px;">
                    <DatePicker type="daterange" placeholder="选择时间段" :transfer="true" placement="bottom-end"
                                v-model="time"></DatePicker>
                    <Button type="primary" icon="ios-search" @click="search" v-has="'llgl_llgl_search'">搜索</Button>
                    <Button type="primary" icon="android-download"
                            style="float: right;margin-right: 10px" @click="daochuExcel" v-has="'llgl_llgl_export'">
                      导出Excel
                    </Button>
                    <!--<Button type="ghost" icon="android-download"  style="float: right;margin-right:10px">批量派发</Button>-->
                    <Button type="primary" icon="plus" style="float: right;margin-right:10px" @click="addPicking=true"
                            v-has="'llgl_llgl_add'">
                      新增领料
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
          <Table :columns="columns11" :data="data10" border height="500" style="margin-top: 10px;" size="small"></Table>
          <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="step"></Page>
        </TabPane>
        <!--<TabPane label="领料信息管理" name="name2">-->
        <!--<spPicking></spPicking>-->
        <!--</TabPane>-->
      </Tabs>

      <!--增加领料-->
      <Modal
        v-model="addPicking"
        title="领料信息"
        width="50%"
        @on-cancel="cancel"
      >
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click='update' v-if="this.type=='edit'">修改
          </Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="save('add')" v-else>新增
          </Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
        </div>
        <div>
          <Form :model="add" ref="add" :rules="ruleValidate" :label-width="80">
            <span style="color: red;display: inline-block;margin-left: 35px;margin-bottom: 20px;">*备注：选择物品的时候，输入物品编号即可，其他相关信息自动回填</span>
            <div style="display: flex;flex-wrap: wrap">

              <FormItem label="单位" prop="dw">
                <!--<Select v-model="add.dw" style="width: 195px;">-->
                  <!--<Option value="公交一公司">公交一公司</Option>-->
                  <!--<Option value="公交二公司">公交二公司</Option>-->
                  <!--<Option value="公交三公司">公交三公司</Option>-->
                <!--</Select>-->
                <CommonSelect type="EJGS"  :selectValue="add.dw" style="width: 195px;"></CommonSelect>
              </FormItem>
              <FormItem label="领料时间" prop="llsj">
                <DatePicker type="date" placeholder="选择领料时间" v-model="add.llsj" style="width: 195px;"></DatePicker>
              </FormItem>
              <FormItem label="物品编号" prop="wpbh">
                <Input v-model="add.wpbh" placeholder="物品编号" style="width: 195px;" @on-blur="change"/>
              </FormItem>
              <FormItem label="物品名称" prop="wpmc">
                <Input v-model="add.wpmc" placeholder="物品名称" style="width: 195px;" :readonly="true"/>
              </FormItem>
              <FormItem label="供货单位" prop="ghdw">
                <Input v-model="add.ghdw" placeholder="物品编号" style="width: 195px;" :readonly="true"/>
              </FormItem>
              <FormItem label="规格">
                <Input v-model="add.gg" placeholder="规格" style="width: 195px;" :readonly="true"/>
              </FormItem>
              <FormItem label="计量单位">
                <Input v-model="add.jldw" placeholder="物品编号" style="width: 195px;" :readonly="true"/>
              </FormItem>
              <FormItem label="单价" prop="dj">
                <Input v-model="add.dj" placeholder="单价" style="width: 195px;" :readonly="true"/>
              </FormItem>
              <FormItem label="领料数量" prop="llsl">
                <Input v-model="add.llsl" placeholder="请输入领料数量" style="width: 195px;"/>
              </FormItem>
              <!--<FormItem label="金额" prop="je">-->
                <!--<Input v-model="add.je" placeholder="金额" style="width: 195px;"/>-->
              <!--</FormItem>-->
              <FormItem label="附记">
                <Input v-model="add.fj" placeholder="附记" style="width: 470px;"/>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import addPicking from './addPicking.vue'
  import spPicking from './spPicking.vue'
  import CommonSelect from '../components/common/CommonSelect.vue'
  export default {
    components: {
      CommonSelect,
      addPicking,
      spPicking
    },
    data() {
      return {
        addPicking: false,
        type: '',
        time: '',
        totalPage: 0,
        formItem: {
          kssj: '',
          jssj: '',
          current: 1,
          size: 10
        },
        add: {
          cph: "",
          dw: '',
          cx: "",
          wpmc: "",
          llsl: "",
          ghdw: "",
          ppxh: "",
          gg: "",
          jldw: "",
          dj: '',
          je: '',
          fj: "",
          zt: "",
          llsj: '',
          wpbh: "",
          llgg: "--"
        },
        ruleValidate: {
          cph: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          cx: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ], dw: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          // wpmc: [
          //   {required: true, message: '必填项必填', trigger: 'blur'}
          // ],
          llsl: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          // ghdw: [
          //   {required: true, message: '必填项必填', trigger: 'blur'}
          // ],
          ppxh: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          dj: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          je: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          fj: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          zt: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
          llsj: [
            {required: true, message: '必填项必填', trigger: 'blur', type: 'date'}
          ],
          wpbh: [
            {required: true, message: '必填项必填', trigger: 'blur'}
          ],
        },
        columns11: [
          {
            title: '公司',
            key: 'dw',
            align: 'center',
            width: 100,
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.EJGS[params.row.dw];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '物品名称',
            key: 'wpmc',
            align: 'center',
            width: 100,
          },
          {
            title: '领料数量',
            key: 'llsl',
            align: 'center',
            width: 100,
          }, {
            title: '领料时间',
            key: 'llsj',
            align: 'center',
            width: 130,
          },
          {
            title: '物品编号',
            key: 'wpbh',
            align: 'center',
            width: 120,
          },
          {
            title: '供货单位',
            key: 'ghdw',
            align: 'center',
            width: 120,
          }, {
            title: '规格',
            key: 'gg',
            align: 'center',
            width: 120,
          }, {
            title: '计量单位',
            key: 'jldw',
            align: 'center',
            width: 120,
          }, {
            title: '单价',
            key: 'dj',
            align: 'center',
            width: 120,
          }, {
            title: '金额',
            key: 'je',
            align: 'center',
            width: 120,
          }, {
            title: '附记',
            key: 'fj',
            align: 'center',
            width: 120,
          },{
            title: '操作',
            key: 'zt',
            align: 'center',
            fixed: 'right',
            width: 180,
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
                      console.log(params.row)
                      this.addPicking = true;
                      this.type = 'edit'
                      this.add = params.row
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'llgl_llgl_edit',
                    }
                  ],
                }, '修改'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    type: 'error',
                    transfer: true,
                    size: 'large',
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      console.log(params.row);
                      let arr = []
                      arr.push(params.row.id)
                      console.log(arr)
                      this.$post(this.$url.delll + '?id=' + arr.toString())
                        .then(res => {
                          console.log(res);
                          if (res.success === true) {
                            this.$Message.info('删除成功')
                            this.list();
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
                    directives: [
                      {
                        name: 'has',
                        value: 'llgl_llgl_delete',
                      }
                    ]
                  }, '删除')
                ])
              ]);
            }
          }
        ],
        data10: []
      }
    },
    methods: {
      search: function () {
        this.formItem.kssj = this.time[0];
        this.formItem.jssj = this.time[1];
        if (this.formItem.kssj === '') {
          this.formItem.kssj = ''
        } else {
          this.formItem.kssj = this.$formatDate(this.formItem.kssj).substring(0, 10)
        }
        if (this.formItem.jssj === '') {
          this.formItem.jssj = ''
        } else {
          this.formItem.jssj = this.$formatDate(this.formItem.jssj).substring(0, 10)
        }
        this.list();
        console.log(this.formItem.kssj)
      },
      list: function () {
        this.$fetch(this.$url.lljl, this.formItem)
          .then(res => {
            console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无数据');
              this.totalPage = res.data.total;
              this.data10 = res.data.records;
            } else {
              res.data.records.forEach(item => {
                item.llsj = this.$formatDate(item.llsj).substring(0, 10)
              })
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            }
          })
      },
      step: function (current) {
        this.formItem.current = current
        this.list()
      },
      cancel: function () {
        this.addPicking = false
        this.add = {};
        this.type = ''
        this.list()
      },
      save: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.add.llsj = this.$formatDate(this.add.llsj).substring(0, 10)
            console.log(this.add)
            this.add.je = this.add.llsl*this.add.dj
            console.log(this.add.je)
            this.$post(this.$url.savell, this.add)
              .then(res => {
                console.log(res);
                if (res.success === true) {
                  this.addPicking = false;
                  this.list();
                  this.$Message.info('添加成功');
                  this.add = {}
                }
              })
          } else {
            this.$Message.error('请填写完整表单!');
          }
        })
      },
      update: function () {
        this.add.llsj = this.$formatDate(this.add.llsj).substring(0, 10)
        this.$post(this.$url.updatell, this.add)
          .then(res => {
            console.log(res);
            if (res.success === true) {
              this.addPicking = false
              this.list();
              this.$Message.info('修改成功');
              this.add = {}
            }
          })
      },
      change() {
        if(this.add.wpbh===''){
          this.$Message.error('物品编号不能为空')
        }else {
          this.$fetch(this.$url.lingliaoSearch, {wpmc: '', spbm: this.add.wpbh, currPage: 1, pageSize: 10})
            .then(res => {
              console.log(res);
              if(res.msg==='success'){
                console.log(res.page.records[0].dw)
                console.log(res.page.records[0].gys)
                console.log(res.page.records[0].jhj)
                console.log(res.page.records[0].wpmc)
                this.add.jldw = res.page.records[0].dw.split('-')[1]
                this.add.gg = res.page.records[0].dw.split('-')[0]
                this.add.ghdw = res.page.records[0].gys
                this.add.dj = res.page.records[0].jhj
                this.add.wpmc = res.page.records[0].wpmc
              }else {
                this.$Message.error('error')
              }
            })
        }
      },
      daochuExcel: function () {
        this.formItem.kssj = this.time[0];
        this.formItem.jssj = this.time[1];
        if (this.formItem.kssj === '') {
          this.formItem.kssj = ''
        } else {
          this.formItem.kssj = this.$formatDate(this.formItem.kssj).substring(0, 10)
        }
        if (this.formItem.jssj === '') {
          this.formItem.jssj = ''
        } else {
          this.formItem.jssj = this.$formatDate(this.formItem.jssj).substring(0, 10)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.daochull + '?kssj=' + this.formItem.kssj + '&jssj=' + this.formItem.jssj)
      }
    },
    mounted() {
      console.log(this.formItem)
      this.list();
    }
  }
</script>

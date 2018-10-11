<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container {
    padding: 10px;
  }

  .container h2 {
    margin-left: 15px;
  }

  .search_btn {
    margin-left: 10px;
  }

  .text_width {
    width: 195px;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
    align-items: center;
  }

  .btn {
    position: absolute;
    right: 20px;
  }
</style>
<template>
  <div>
    <Card style="padding-left: 15px;">
      <Form :model="formItem" :label-width="100">
        <div class="search">
          <FormItem label="选择分类名称" style="margin: 0">
            <Select v-model="formItem.flmc" :transfer="true" style="width: 195px;">
              <Option value="">全部</Option>
              <Option value="钢瓶">钢瓶</Option>
              <Option value="钢瓶2">钢瓶2</Option>
              <Option value="钢瓶3">钢瓶3</Option>
            </Select>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search" v-has="'gpjc_jcfysd_search'">查询</Button>
          <FormItem label="" style="margin: 0">
            <Button type="primary" icon="plus" @click="add" v-has="'gpjc_jcfysd_add'">新增</Button>
          </FormItem>

          <!--添加钢瓶类型-->
          <Modal
            v-model="modal1"
            width="320"
            @on-cancel="quxiao"
            title="检测费用设定">
            <div slot="footer" style="height: 30px;">
              <Button type="primary" style="float: right;margin-right: 10px" v-show="this.madalType==='add'"
                      @click='ok("addFysd")'>新增
              </Button>
              <Button type="primary" style="float: right;margin-right: 10px" v-show="this.madalType==='update'"
                      @click='update'>修改
              </Button>
              <Button type="primary" style="float: right;margin-right: 10px" @click='cancel'>取消</Button>
            </div>
            <Form :model="addFysd" ref="addFysd" :rules="ruleValidate" :label-width="80">
              <FormItem label="名称" prop="flmc" style="margin: 0 0 25px 0">
                <Input v-model="addFysd.flmc" placeholder="名称" class="text_width"/>
              </FormItem>
              <FormItem label="体积" prop="tj" style="margin: 0 0 25px 0">
                <Input v-model="addFysd.tj" placeholder="体积" class="text_width"/>
              </FormItem>
              <FormItem label="单价" prop="dj" style="margin: 0 0 25px 0">
                <Input v-model="addFysd.dj" placeholder="单价" class="text_width"/>
              </FormItem>
              <FormItem label="备注"  style="margin: 0 0 25px 0">
                <Input v-model="addFysd.bz" placeholder="备注" class="text_width"/>
              </FormItem>
              <FormItem label="选择年份" prop="xzsj" style="margin: 0 0 10px 0">
                <DatePicker type="date" placeholder="选择时间" :transfer="true" v-model="addFysd.xzsj"
                            class="text_width"></DatePicker>
              </FormItem>

            </Form>
          </Modal>
        </div>
      </Form>
    </Card>
    <Table :columns="columns1" :data="data1" size="small" border style="margin-top: 10px;"></Table>
    <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  export default {
    data () {
      return {
        modal1: false,
        madalType: 'add',
        totalPage: 0,
        formItem: {
          currPage: 1,
          pageSize: 10,
          flmc: ''
        },
        addFysd: {
          flmc: '',
          tj: '',
          dj: '',
          bz: '',
          xzsj: ''
        },
        gpjcdjLists: {
          currPage: 1,
          pageSize: 10
        },
        ruleValidate: {
          flmc: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          xzsj: [
            {required: true, message: '必填项', trigger: 'blur', type: 'date'}
          ],
          tj: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          dj: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          bz: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          jcrq: [
            {required: true, message: '必填项', trigger: 'blur', type: 'date'}
          ],
          bcjcrq: [
            {required: true, message: '必填项', trigger: 'blur', type: 'date'}
          ],
          cx: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          cph: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          zbh: [
            {required: true, message: '必填项', trigger: 'blur'}
          ],
          dwmc: [
            {required: true, message: '必填项', trigger: 'change'}
          ]
        },
        columns1: [
          {
            title: '分类名称',
            key: 'flmc'
          },
          {
            title: '体积',
            key: 'tj'
          },
          {
            title: '单价',
            key: 'dj'
          },
          {
            title: '备注',
            key: 'bz'
          },
          {
            title: '增加时间',
            key: 'xzsj'
          },
          {
            title: '操作',
            // align: 'center',
            key: 'time',
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    // type: 'error',
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      this.$fetch(this.$url.delFysd + '?id=' + params.row.id)
                        .then(res => {
                          console.log(res);
                          if (res.msg === 'success') {
                            this.$Message.info('删除成功');
                            this.getList();
                          } else {
                            this.$Message.error('删除失败');
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
                        value: 'gpjc_jcfysd_delete',
                      }
                    ]
                  },'删除')
                ]),
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
                      console.log(params.row);
                      this.madalType = 'update';
                      this.modal1 = true;
                      for (let attr in params.row) {
                        this.addFysd[attr] = params.row[attr];
                      }
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'gpjc_jcfysd_update',
                    }
                  ]
                }, '修改')
              ]);
            }
          }
        ],
        data1: [],
      }
    },
    methods: {
//        检测费用设定
      getList: function () {
        this.$fetch(this.$url.gpjcList, this.formItem)
          .then(res => {
            console.log(res)
            if (res.page.total === 0) {
              this.$Message.info('暂无数据');
              this.totalPage = res.page.total;
              this.data1 = res.page.records;
            } else {
              res.page.records.forEach(item => {
                item.xzsj = DateTool.timesToDate(item.xzsj)
              });
              this.totalPage = res.page.total;
              this.data1 = res.page.records;
            }
          })
      },
      search: function () {
        this.getList()
      },
      add: function () {
        this.modal1 = true;
        this.madalType = 'add'
      },
      quxiao: function () {
        this.addFysd = {}
      },
      cancel: function () {
        this.modal1 = false;
        this.addFysd = {}
        this.modal2 = false;
        this.formItem1 = {}
      },
      update: function () {
        this.$post(this.$url.updateFysd, this.addFysd)
          .then(res => {
            if (res.msg === 'success') {
              this.$Message.info('修改成功');
              this.modal1 = false;
              this.addFysd = {}
              this.getList();
            } else {
              this.$Message.error('修改失败');
            }
          })
      },
      ok: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$post(this.$url.addFysd, this.addFysd)
              .then(res => {
                if (res.msg === 'success') {
                  this.$Message.info('添加成功');
                  this.modal1 = false;
                  this.addFysd = {}
                  this.getList();
                } else {
                  this.$Message.error('添加失败');
                }
              })
          } else {
            this.$Message.error('请输入完整信息!');
          }
        });
      },
      setPage: function (current) {
        this.formItem.currPage = current;
        this.getList();
      }
    },
    mounted () {

    }
  }
</script>

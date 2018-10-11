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
      <Form :model="formItem" :label-width="80">
        <div class="search">
          <Button type="primary" icon="plus" @click="modal2=true" v-has="'gpjc_gpjcdj_add'" style="margin-left: 20px;">进厂登记</Button>

          <!--进厂登记-->
          <Modal
            v-model="modal2"
            width="360"
            title="进厂登记">
            <div slot="footer" style="height: 30px;">
              <Button type="primary" style="float: right;margin-right: 10px" @click="jcdj('formItem1')">确定</Button>
              <Button type="primary" style="float: right;margin-right: 10px" @click='cancel'>取消</Button>
            </div>
            <Form :model="formItem1" ref="formItem1" :rules="ruleValidate" :label-width="100">
              <FormItem label="单位名称" style="margin: 0 0 25px 0" prop="dwmc">
                <!--<Select v-model="formItem1.dwmc" :transfer="true" style="width: 195px;">-->
                  <!--<Option value="公交一公司">公交一公司</Option>-->
                  <!--<Option value="公交二公司">公交二公司</Option>-->
                  <!--<Option value="公交三公司">公交三公司</Option>-->
                <!--</Select>-->
                <CommonSelect type="EJGS"  :aria-disabled="true" :selectValue="formItem1.dwmc"  class="input_item" style="width: 195px;"></CommonSelect>
              </FormItem>
              <FormItem label="车牌号" style="margin: 0 0 25px 0" prop="cph">
                <Input v-model="formItem1.cph" placeholder="车牌号" style="width: 195px;"/>
              </FormItem>
              <FormItem label="自编号" style="margin: 0 0 25px 0" prop="zbh">
                <Input v-model="formItem1.zbh" placeholder="自编号" style="width: 195px;"/>
              </FormItem>
              <FormItem label="车型" style="margin: 0 0 25px 0" prop="cx">
                <Input v-model="formItem1.cx" placeholder="车型" style="width: 195px;"/>
              </FormItem>
              <FormItem label="本次检测日期" style="margin: 0 0 25px 0" prop="bcjcrq">
                <DatePicker type="date" placeholder="本次检测日期" :transfer="true" v-model="formItem1.bcjcrq"
                            style="width: 195px;"></DatePicker>
              </FormItem>
              <FormItem label="接车日期" style="margin: 0 0 25px 0" prop="jcrq">
                <DatePicker type="date" placeholder="接车日期" :transfer="true" v-model="formItem1.jcrq"
                            style="width: 195px;"></DatePicker>
              </FormItem>
            </Form>
          </Modal>


          <!--<FormItem label="" style="margin: 0">-->
          <!--</FormItem>-->
        </div>
      </Form>
    </Card>
    <Table :columns="columns2" :data="data2" size="small" border style="margin-top: 10px;"></Table>
    <Page :total="totalPage2" show-total style="margin-top: 10px;" @on-change="setPageGpjcdj"></Page>
  </div>
</template>
<script>
  import CommonSelect from '../../components/common/CommonSelect.vue'
  import * as DateTool from '../../../utils/DateTool'
  export default {
    components: {
      CommonSelect,
    },
    data () {
      return {
        modal1: false,
        modal2: false,
        madalType: 'add',
        totalPage: 0,
        totalPage2: 0,
        formItem: {
          currPage: 1,
          pageSize: 10,
          flmc: ''
        },
        formItem1: {
          bcjcrq: "",
          cph: "",
          cx: "",
          dwmc: "",
          jcrq: "",
          zbh: ""
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

        columns2: [
          {
            title: '单位名称',
            key: 'dwmc',
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.EJGS[params.row.dwmc];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '车牌号',
            key: 'cph'
          },
          {
            title: '自编号',
            key: 'zbh'
          },
          {
            title: '车型',
            key: 'cx'
          }, {
            title: '本次检测日期',
            key: 'bcjcrq'
          }, {
            title: '接车日期',
            key: 'jcrq'
          },
          {
            title: '操作',
            // align: 'center',
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
                      this.$router.push({path: '/gpjcInfo', query: {djInfo: params.row}});
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'gpjc_gpjcdj_info',
                    }
                  ]
                }, '详情'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    type: 'error',
                    size: 'large',
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      console.log(params.row.id)
                      this.$fetch(this.$url.gpjcdjDel + '?id=' + params.row.id)
                        .then(res => {
                          console.log(res)
                          if (res.msg === 'success') {
                            this.$Message.info('删除成功');
                            this.gpjcdjList();
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
                        value: 'gpjc_gpjcdj_delete',
                      }
                    ]
                  },'删除')
                ])
              ]);
            }
          }
        ],
        data2: []
      }
    },
    methods: {
//      钢瓶检测登记
      jcdj: function (name) {
        console.log(this.formItem1)
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$post(this.$url.gpjcdj, this.formItem1)
              .then(res => {
                if (res.msg === 'success') {
                  this.$Message.info('添加成功');
                  this.getList();
                  this.modal2 = false;
                  this.formItem1 = {}
                } else {
                  this.$Message.error('添加失败');
                }
              })
          } else {
            this.$Message.error('请输入完整信息!');
          }
        });
      },
      cancel: function () {
        this.modal1 = false;
        this.addFysd = {}
        this.modal2 = false;
        this.formItem1 = {}
      },
      getList: function () {
        this.$fetch(this.$url.gpjcdjList, this.gpjcdjLists)
          .then(res => {
            console.log(res)
            if (res.page.total === 0) {
              this.$Message.info('暂无数据');
              this.totalPage2 = res.page.total;
              this.data2 = res.page.records;
            } else {
              res.page.records.forEach(item => {
                item.jcrq = DateTool.timesToDate(item.jcrq)
                item.bcjcrq = DateTool.timesToDate(item.bcjcrq)
              });
              this.totalPage2 = res.page.total;
              this.data2 = res.page.records;
            }
          })
      },
      setPageGpjcdj: function (current) {
        this.gpjcdjLists.currPage = current;
        this.getList();
      }
    },
    mounted () {

    }
  }
</script>

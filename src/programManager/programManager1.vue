<template>
  <div style="padding: 20px;">
    <div style="padding: 10px;border-bottom: 1px solid #e9eaec">
      <h2>运营计划调整管理</h2>
    </div>
    <div v-if="$showMenu('运营计划调整管理')">
      <Card style="margin-top: 10px;">
        <Form :model="formItem" :label-width="80">
          <div style="display: flex;flex-wrap: wrap">
            <FormItem label="按年份查询" style="margin: 0;">
              <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end"
                          v-model="formItem.nf"></DatePicker>
            </FormItem>
            <FormItem label="线路" style="margin: 0;" prop="lb">
              <!--<Select v-model="formItem.lb" style="width: 195px;">-->
                <!--<Option value="全部">全部</Option>-->
                <!--<Option value="1路">1路</Option>-->
                <!--<Option value="2路">2路</Option>-->
                <!--<Option value="3路">3路</Option>-->
              <!--</Select>-->
              <CommonSelect type="LB" :selectValue="formItem.lb" style="width: 195px;"></CommonSelect>
            </FormItem>
            <FormItem label="公司" style="margin: 0;" prop="gsm">
              <!--<Select v-model="formItem.gsm" style="width: 195px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="四公司">四公司</Option>-->
                <!--<Option value="公交一公司">公交一公司</Option>-->
                <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS" :selectValue="formItem.gsm" style="width: 195px;"></CommonSelect>
            </FormItem>
            <!--添加-->
            <Modal
              v-model="addyyProgram"
              title="调整计划详情"
              width="80%"
              :mask-closable="false"
              @on-cancel="quxiao"
              :scrollable="true"
              style="height: auto">
              <div slot="footer" style="height: 30px;">
                <Button type="primary" style="float: right;margin-right: 10px" @click="update" v-if="this.type=='edit'">修改</Button>
                <Button type="primary" style="float: right;margin-right: 10px" @click="save" v-else >确定
                </Button>
                <Button type="primary" style="float: right;margin-right: 10px" @click="quxiao">取消</Button>
              </div>
              <Form :model="program" :label-width="90">
                <div style="display: flex;flex-wrap: wrap">
                  <FormItem label="路别" style="margin-bottom: 25px">
                    <Select v-model="lb" filterable style="width: 195px;" @on-change="chooseLb">
                      <Option v-for="item in cityList" :value="item.lineAlias" :key="item.lineAlias">{{ item.lineAlias }}
                      </Option>
                    </Select>
                  </FormItem>
                  <FormItem label="单位" style="margin-bottom: 25px">
                    <Select v-model="program.gsm" filterable style="width: 195px;">
                      <Option v-for="item in chList" :value="item.dwcode" :key="item.dwcode">{{ item.dw }}</Option>
                    </Select>
                  </FormItem>


                  <!--<FormItem label="公司名" prop="gsm">-->
                    <!--&lt;!&ndash;<Select v-model="program.gsm" style="width: 195px;">&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="四公司">四公司</Option>&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="公交一公司">公交一公司</Option>&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="公交二公司">公交二公司</Option>&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="公交三公司">公交三公司</Option>&ndash;&gt;-->
                    <!--&lt;!&ndash;</Select>&ndash;&gt;-->
                    <!--<CommonSelect type="EJGS" :selectValue="program.gsm" style="width: 195px;"></CommonSelect>-->
                  <!--</FormItem>-->
                  <!--<FormItem label="路别" prop="lb">-->
                    <!--&lt;!&ndash;<Select v-model="program.lb" style="width: 195px;">&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="1路">1路</Option>&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="2路">2路</Option>&ndash;&gt;-->
                      <!--&lt;!&ndash;<Option value="3路">3路</Option>&ndash;&gt;-->
                    <!--&lt;!&ndash;</Select>&ndash;&gt;-->
                    <!--<CommonSelect type="LB" :selectValue="program.lb" style="width: 195px;"></CommonSelect>-->
                  <!--</FormItem>-->
                  <FormItem label="班车数量">
                    <Input v-model="program.bcs" placeholder="班车数量" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="备用车数">
                    <Input v-model="program.bys" placeholder="备用车数" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="日车次">
                    <Input v-model="program.rcc" placeholder="日车次" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="路线长度">
                    <Input v-model="program.xlcd" placeholder="路线长度" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="日出入库里程">
                    <Input v-model="program.rcrklc" placeholder="日出入库里程" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="日加气里程">
                    <Input v-model="program.rjqlc" placeholder="日加气里程" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="年份">
                    <DatePicker type="year" placeholder="选择年份" :transfer="true" style="width: 195px;"
                                v-model="program.nf"></DatePicker>
                  </FormItem>
                  <FormItem label="出入库台数">
                    <Input v-model="program.crkts" placeholder="出入库台数" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="加气台数">
                    <Input v-model="program.jqts" placeholder="加气台数" style="width: 195px;"/>
                  </FormItem>
                  <FormItem label="出入库说明">
                    <Input v-model="program.crksm" style="width: 480px;" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" placeholder="出入库说明"></Input>
                  </FormItem>
                </div>
              </Form>
            </Modal>
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary" @click="search" style="margin-right: 3px;" v-has="'yyjhtzgl_yyjhtzgl_search'"><Icon type="search"></Icon>  搜索</Button>
              <Button type="primary" icon="android-download" @click="addyyProgram=true" style="margin-right: 3px;" v-has="'yyjhtzgl_yyjhtzgl_add'">新增调整</Button>
              <Button type="primary" @click="daochu" icon="android-download" v-has="'yyjhtzgl_yyjhtzgl_export'">导出</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <Table border :columns="columns11" size="small" :data="data10" style="margin-top: 20px;"></Table>
      <Page :total="totalPage" show-total  @on-change = 'step'/>
    </div>
  </div>
</template>
<script>
  import CommonSelect from '../components/common/CommonSelect.vue'
  export default {
    components: {
      CommonSelect,
    },
    data () {
      return {
        addyyProgram: false,
        totalPage:0,
        lb:'',
        chList:[],
        cityList:[],
        type:'',
        editZd: false,
        formItem: {
          nf: '',
          lb: '',
          gsm: '',
          current: 1,
          size: 10,
        },
        program: {
          bcs: '',//
          bys: '',//
          crksm: "",//
          crkts: '',//
          gsm: "",//
          jqts: '',//
          lb: "",//
          nf: '',//
          rcc: '',//
          rcrklc: '',//
          rjqlc: '',//
          xlcd: '',//
        },
        columns11: [
          {
            title: '年份',
            key: 'nf',
            align: 'center',
            width: 100,
          },
          {
            title: '路别',
            key: 'lb',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.LB[params.row.lb];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '公司',
            key: 'gsm',
            align: 'center',
            width: 100,
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.EJGS[params.row.gsm];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '线路长度',
            key: 'xlcd',
            align: 'center',
            width: 100,
          },
          {
            title: '配车数',
            align: 'center',
            children: [
              {
                title: '班车',
                key: 'bcs',
                align: 'center',
                width: 100,
              },
              {
                title: '备用',
                key: 'bys',
                align: 'center',
                width: 100,
              },
//              {
//                title: '合计',
//                key: 'xj',
//                align: 'center',
//                width: 100,
//              },
            ]
          },
          {
            title: '车次',
            align: 'center',
            children: [
              {
                title: '日车次',
                key: 'rcc',
                align: 'center',
                width: 100,
              },
              {
                title: '年度车次',
                key: 'ndcc',
                align: 'center',
                width: 100,
              },
            ]
          },

          {
            title: '运营里程',
            align: 'center',
            children: [
              {
                title: '日里程',
                key: 'rlc',
                align: 'center',
                width: 100,
              },
              {
                title: '年度里程',
                key: 'ndlc',
                align: 'center',
                width: 100,
              },
            ]
          },
          {
            title: '非运营里程',
            align: 'center',
            children: [
              {
                title: '出入库加气里程',
                align: 'center',
                width: 100,
                children: [
                  {
                    title: '日出入库里程',
                    key: 'rcrklc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '年度里程',
                    key: 'crkndlc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '日加气里程',
                    key: 'rjqlc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '年度加气里程',
                    key: 'rjqndlc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '非运营小计',
                    key: 'fyyxj',
                    align: 'center',
                    width: 100,
                  }
                ]
              },
              {
                title: '备用车年度里程',
                key: 'bycndlc',
                align: 'center',
                width: 100,
              },
              {
                title: '合计',
                key: 'fyyhj',
                align: 'center',
                width: 100,
              },
            ]
          },
          {
            title: '出入库台数',
            key: 'crkts',
            align: 'center',
            width: 120,
//            fixed: 'right',
          },
          {
            title: '加气台数',
            key: 'jqts',
            align: 'center',
            width: 100,
          },
          {
            title: '出入库说明',
            key: 'crksm',
            align: 'center',
            width: 220,
          },
          {
            title: '操作',
            align: 'center',
            width: 170,
            fixed: 'right',
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
                      console.log(params.row, '**********************************');
                      this.type='edit'
                      this.addyyProgram = true;
                      this.program = params.row
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'yyjhtzgl_yyjhtzgl_edit',
                    }
                  ],
                }, '修改'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    type: 'error',
                    size: 'large',
                    transfer:true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      this.$post(this.$url.yyjhtzDel + '?id=' + params.row.id)
                        .then(res => {
                          console.log(res);
                          if (res.success === true) {
                            this.$Message.info('删除成功');
                            this.getList();
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
                        value: 'yyjhtzgl_yyjhtzgl_delete',
                      }
                    ],
                  },'删除')
                ])
              ]);
            }
          }
        ],
        data10: []
      }
    },
    methods: {
      chooseLb(val){
        console.log(val)
        console.log(val.split('路')[0])
        let LB = val.split('路')[0]
        this.$fetch(this.$url.getDwByLb, {lb: LB})
          .then(res => {
            console.log(res);
            if (res.success == true) {
              this.chList = res.data
            } else {
              this.$Message.error("查询部门失败")
            }
          })
      },
      getList: function () {
        console.log(this.formItem)
        this.$fetch(this.$url.yyjhtzList, this.formItem)
          .then(res => {
            console.log(res)
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无信息');
                this.data10 = res.data.records;
                this.totalPage = res.data.total
              } else {
                res.data.records.forEach(item=>{
                    item.nf = item.nf.toString()
                })
                this.data10 = res.data.records;
                this.totalPage = res.data.total
              }
            }
          })
      },
      search: function () {
        if (this.formItem.nf === '') {
          this.formItem.nf = ''
        } else {
          this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0, 4);
        }
        this.getList();
      },
      save: function () {
        this.program.nf = this.$formatDate(this.program.nf).substring(0, 4)
        this.program.lb = this.lb.split('路')[0];
        console.log(this.program)
        this.$post(this.$url.saveYyjh, this.program)
          .then(res => {
            console.log(res);
            if (res.success === true) {
              this.$Message.info('添加成功');
              this.addyyProgram = false;
              this.program = {}
              this.getList();
            }
          })
      },
      update: function () {
        this.program.nf = this.$formatDate(this.program.nf).substring(0, 4)
        this.$post(this.$url.updateYyjh, this.program)
          .then(res => {
            console.log(res);
            if (res.success === true) {
              this.$Message.info('修改成功');
              this.addyyProgram = false;
              this.program = {};
              this.getList();
            }
          })
      },
      quxiao: function () {
        this.getList();
        this.program = {};
        this.type = '',
        this.addyyProgram = false
      },
      step:function (current) {
          console.log(current)
        this.formItem.current = current;
        this.getList();
      },
      daochu:function () {
          if(this.formItem.nf==''){
              this.formItem.nf=''
          }else {
              this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0,4)
          }
          if(this.formItem.gsm =='' ){
            this.formItem.gsm = 'YGS'
          }
        this.$getExcel(process.env.BASE_URL + this.$url.yyjhgldc+'?nf='+this.formItem.nf+'&gsm='+this.formItem.gsm)
      },
      getallList() {
        this.$post(this.$url.getAllList)
          .then(res => {
            //console.log(res);
            if (res.success == true) {
              console.log(res.data)
              this.cityList = res.data
            } else {
              this.$Message.error("查询线路失败")
            }
          })
      },
    },
    mounted () {
      this.getList()
      this.getallList()
    }
  }
</script>

<template>
  <div>
    <!--新增-->
    <Modal
      v-model="addProgram"
      title="新增计划"
      @on-ok="ok"
      width="80%"
      :mask-closable="false"
      style="height: auto"
      :scrollable="true"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="add">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="formItem1" :label-width="90">
        <div style="display: flex;flex-wrap: wrap">
        <FormItem label="年份">
          <DatePicker type="year" placeholder="选择年份" v-model="formItem1.nf" style="width: 195px;"></DatePicker>
        </FormItem>
          <FormItem label="路别" style="margin-bottom: 25px">
            <Select v-model="lb" filterable style="width: 195px;" @on-change="chooseLb">
              <Option v-for="item in cityList" :value="item.lineAlias" :key="item.lineAlias">{{ item.lineAlias }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="单位" style="margin-bottom: 25px">
            <Select v-model="formItem1.gsm" filterable style="width: 195px;">
              <Option v-for="item in chList" :value="item.dwcode" :key="item.dwcode">{{ item.dw }}</Option>
            </Select>
          </FormItem>
        <!--<FormItem label="路别" prop="lb">-->
          <!--&lt;!&ndash;<Select v-model="formItem1.lb" style="width: 195px;">&ndash;&gt;-->
            <!--&lt;!&ndash;<Option value="1路">1路</Option>&ndash;&gt;-->
            <!--&lt;!&ndash;<Option value="2路">2路</Option>&ndash;&gt;-->
            <!--&lt;!&ndash;<Option value="3路">3路</Option>&ndash;&gt;-->
          <!--&lt;!&ndash;</Select>&ndash;&gt;-->
          <!--<CommonSelect type="LB" :selectValue="formItem1.lb" style="width: 195px;"></CommonSelect>-->
        <!--</FormItem>-->

          <!--<FormItem label="公司名" prop="gsm">-->
            <!--&lt;!&ndash;<Select v-model="formItem1.gsm" style="width: 195px;">&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="一公司">一公司</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="二公司">二公司</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="三公司">三公司</Option>&ndash;&gt;-->
            <!--&lt;!&ndash;</Select>&ndash;&gt;-->
            <!--<CommonSelect type="EJGS" :selectValue="formItem1.gsm" style="width: 195px;"></CommonSelect>-->
          <!--</FormItem>-->
        <FormItem label="班车数量">
          <Input v-model="formItem1.bcs" placeholder="班车数量" style="width: 195px;"/>
        </FormItem>
        <FormItem label="备用车数">
          <Input v-model="formItem1.bys" placeholder="备用车数量" style="width: 195px;"/>
        </FormItem>
        <FormItem label="日车次">
          <Input v-model="formItem1.rcc" placeholder="日车次" style="width: 195px;"/>
        </FormItem>
        <FormItem label="路线长度">
          <Input v-model="formItem1.xlcd" placeholder="路线长度" style="width: 195px;"/>
        </FormItem>
        </div>
      </Form>

      <Form :model="formItem2" :label-width="90">
        <div style="display: flex;flex-wrap: wrap">
        <FormItem label="日出入库里程">
          <Input v-model="formItem2.rcrklc" placeholder="日出入库里程" style="width: 195px;"/>
        </FormItem>
        <FormItem label="日加气里程">
          <Input v-model="formItem2.rjqlc" placeholder="日加气里程" style="width: 195px;"/>
        </FormItem>
        <FormItem label="出入库台数">
          <Input v-model="formItem2.crkts" placeholder="出入库台数" style="width: 195px;"/>
        </FormItem>
        <FormItem label="加气台数">
          <Input v-model="formItem2.jqts" placeholder="加气台数" style="width: 195px;"/>
        </FormItem>
        <FormItem label="出入库说明">
          <Input v-model="formItem2.crksm" style="width: 480px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="出入库说明"></Input>
        </FormItem>
        </div>
      </Form>
    </Modal>
    <!--修改-->
    <Modal
      v-model="editProgram"
      title="修改"
      @on-ok="ok"
      width="500"
      :mask-closable="false"
      style="height: auto"
      :scrollable="true"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="update">确定
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="editItem" :label-width="90">
        <div style="display: flex;flex-wrap: wrap">
          <FormItem label="出入库台数">
            <Input v-model="editItem.crkts" placeholder="出入库台数" style="width: 195px;"/>
          </FormItem>
          <FormItem label="加气台数">
            <Input v-model="editItem.jqts" placeholder="加气台数" style="width: 195px;"/>
          </FormItem>
          <FormItem label="出入库说明">
            <Input v-model="editItem.crksm" style="width: 200%;" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="出入库说明"></Input>
          </FormItem>
        </div>
      </Form>
    </Modal>
    <Card>
      <Form :model="searchItem" :label-width="80">
        <div style="display: flex;flex-wrap: wrap">
          <FormItem label="按年份查询" style="margin: 0;">
            <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end"
                        v-model="searchItem.nf"></DatePicker>
          </FormItem>
          <FormItem label="公司名" style="margin: 0" prop="gsm">
            <!--<Select v-model="searchItem.gsm" style="width: 195px;">-->
              <!--<Option value="">全部</Option>-->
              <!--<Option value="四公司">四公司</Option>-->
            <!--</Select>-->
            <CommonSelect type="EJGS" :selectValue="searchItem.gsm" style="width: 195px;"></CommonSelect>
          </FormItem>
        </div>
        <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
          <ButtonGroup>
            <Button type="primary" @click="sousuo" style="margin-right: 3px;"><Icon type="search" v-has="'yyjhgl_fgsyyjh_search'"></Icon>搜索</Button>
            <Button type="primary" icon="android-download" @click="addProgram=true" style="margin-right: 3px;" v-has="'yyjhgl_fgsyyjh_add'">新增计划</Button>
            <Button type="primary" @click="daochu" icon="android-download" v-has="'yyjhgl_fgsyyjh_export'">导出</Button>
          </ButtonGroup>
        </div>
      </Form>
    </Card>
    <Table :columns="columns11" :data="data10" border height="515" size="small" style="margin-top: 20px;"></Table>
    <Page :total="total" show-total  style="margin-top: 10px;" @on-change="step"/>
  </div>
</template>
<script>
  import canEditTable from './canEditTable.vue';
  import CommonSelect from '../components/common/CommonSelect.vue'
  import addProgram from './addProgram.vue';
  export default {
    components: {
      canEditTable,
      CommonSelect,
      addProgram
    },
    data () {
      return {
        total:0,
        chList:[],
        cityList:[],
        lb:'',
        addProgram: false,
        editProgram: false,
        formItem1: {
          lb: '',
          bcs: '',
          bys: '',
          rcc: '',
          xlcd:'',
          rlc:'',
          nf:'',
          gsm:''
        },
        formItem2:{
          rcrklc:'',
          rjqlc:'',
          crkts:'',
          jqts:'',
          crksm:''
        },
        editItem: {
          id: '',
          crksm: '',
          crkts: '',
          jqts: ''
        },
        searchItem: {
          nf: '',
          gsm:'',
          current: 1,
          size: 10
        },
        columns11: [
          {
            title: '年份',
            key: 'nf',
            align: 'center',
            width: 100,
          },
          {
            title: '公司名',
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
            title: '路别',
            key: 'lb',
            align: 'center',
            width: 100,
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.LB[params.row.lb];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '路线长度',
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
              {
                title: '合计',
                key: 'xj',
                align: 'center',
                width: 100,
              },
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
            width: 80,
          },
          {
            title: '加气台数',
            key: 'jqts',
            align: 'center',
            width: 80,
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
                      this.editProgram = true;
                      this.editItem.id = params.row.id;
                      this.editItem.crksm = params.row.crksm;
                      this.editItem.crkts = params.row.crkts;
                      this.editItem.jqts = params.row.jqts
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'yyjhgl_fgsyyjh_edit',
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
                      this.$fetch(this.$url.delFgsjh + '?id=' + params.row.id)
                        .then(res => {
                          console.log(res)
                          if (res.success === true) {
                            this.$Message.info('删除成功')
                            this.getList()
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
                      size: 'small',
                      transfer:false,
                    },
                    style: {
                      marginRight: '5px'
                    },
                    directives: [
                      {
                        name: 'has',
                        value: 'yyjhgl_fgsyyjh_delete',
                      }
                    ],
                  }, '删除')]),
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
      ok () {
        this.$Message.info('Clicked ok');
      },
      step(current){
          this.searchItem.current = current
          this.getList()
      },
      cancel () {
//        this.$Message.info('取消');
        this.editProgram = false
        this.addProgram = false
        this.formItem1 = {}
        this.formItem2 = {}
      },
      update: function () {
        console.log(this.editItem)
        this.$post(this.$url.updateFgssrjh + '?id=' + this.editItem.id + '&crksm=' + this.editItem.crksm + '&jqts=' + this.editItem.jqts + '&crkts=' + this.editItem.crkts)
          .then(res => {
            console.log(res)
            if (res.success === true) {
              this.$Message.info('修改成功')
              this.editProgram = false
              this.getList()

            } else {
              this.$Message.error('修改失败')
            }
          })
      },
      add:function () {
        console.log(this.formItem1)
        console.log(this.formItem2)
        if(this.formItem1.nf===''||this.lb===''){
            this.$Message.error('请输入年份或者路别')
        }else {
            this.formItem1.lb = this.lb.split('路')[0];
            this.formItem1.rlc = this.formItem1.rcc*this.formItem1.xlcd;
            console.log(this.formItem1.rlc)
            this.formItem1.nf=this.$formatDate(this.formItem1.nf).substring(0,4)
            let obj = {
              yyscjh:this.formItem1,
              fyylc:this.formItem2
            }
            console.log(obj)
            this.$post(this.$url.addFgsyyjh, obj)
              .then(res => {
                if (res.success === true) {
                  this.$Message.info('添加成功');
                  this.addProgram = false
                  this.formItem1 = {}
                  this.formItem2 = {}
                  this.getList()
                }else {
                  this.$Message.info('添加失败')
                }
              })
        }
      },
      getList: function () {
        this.$fetch(this.$url.fgsyyList, this.searchItem)
          .then(res => {
            console.log(res)
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无信息');
                this.data10 = res.data.records;
                this.total = res.data.total
              } else {
                this.data10 = res.data.records;
                this.total = res.data.total
              }
            }
          })
      },
      daochu:function () {
        if(this.searchItem.nf==''){
          this.searchItem.nf=''
        }else {
          this.searchItem.nf = this.$formatDate(this.searchItem.nf).substring(0,4)
        }

        if(this.searchItem.gsm==''){
          this.searchItem.gsm='YGS'
        }
        this.$getExcel(process.env.BASE_URL + this.$url.fgsyyjhdc+'?nf='+this.searchItem.nf+'&gsm='+this.searchItem.gsm)
      },
      sousuo:function () {
        if(this.searchItem.nf==''){
          this.searchItem.nf=''
        }else {
          this.searchItem.nf = this.$formatDate(this.searchItem.nf).substring(0,4)
        }
        this.getList()
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


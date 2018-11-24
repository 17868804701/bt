<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 15px 10px 10px 0px;
    width: 98%;
    margin-left: 1%;
    border-bottom: 1px solid #eae9ec;
  }

  .container h2 {
    margin-left: 15px;
  }
</style>
<template>
  <div>
    <div class="container">
      <h2>钢瓶检测详情
        <router-link  :to="{path:'/GPCheckList', query:{type:'back'}}">
          <Button type="primary" size="small"><
            <返回列表
          </Button>
        </router-link>
      </h2>
    </div>
    <Card style="width:98%;margin: 10px 1%">
      <p slot="title">登记详情</p>
      <div slot="extra">
        <Button type="primary" size="small" v-show="this.isDisable==false"
                :icon="this.isDisable==false?'checkmark-circled':'edit'" @click="update">
          保存
        </Button>
        <Button type="primary" size="small" v-show="this.isDisable==true"
                :icon="this.isDisable==false?'checkmark-circled':'edit'" @click="edit">
          修改
        </Button>
      </div>
      <div>
        <Form :model="formItem" :label-width="80">
          <div style="padding-left: 20px;display: flex;flex-wrap: wrap">
            <FormItem label="单位名称" style="margin: 0 0 10px 0">
              <Select v-model="formItem.dwmc" :disabled="isDisable" :transfer="true" style="width: 195px;">
                <Option value="公交一公司">公交一公司</Option>
                <Option value="公交二公司">公交二公司</Option>
                <Option value="公交三公司">公交三公司</Option>
              </Select>
              <!--<CommonSelect type="EJGS"  :aria-disabled="true" :selectValue="formItem1.dwmc"  class="input_item" style="width: 195px;"></CommonSelect>-->
            </FormItem>
            <FormItem label="车牌号" style="margin: 0 0 10px 0">
              <Input v-model="formItem.cph" :disabled="isDisable" placeholder="车牌号" style="width: 195px;"/>
            </FormItem>
            <FormItem label="自编号" style="margin: 0 0 10px 0">
              <Input v-model="formItem.zbh" :disabled="isDisable" placeholder="自编号" style="width: 195px;"/>
            </FormItem>
            <FormItem label="车型" style="margin: 0 0 10px 0">
              <Input v-model="formItem.cx" :disabled="isDisable" placeholder="车型" style="width: 195px;"/>
            </FormItem>
            <FormItem label="检测日期" style="margin: 0 0 10px 0">
              <DatePicker type="date" :disabled="isDisable" placeholder="本次检测日期" :transfer="true"
                          v-model="formItem.jcrq"
                          style="width: 195px;"></DatePicker>
            </FormItem>
            <FormItem label="接车日期" style="margin: 0 0 10px 0">
              <DatePicker type="date" :disabled="isDisable" placeholder="接车日期" :transfer="true"
                          v-model="formItem.bcjcrq"
                          style="width: 195px;"></DatePicker>
            </FormItem>
          </div>
        </Form>
      </div>
    </Card>


    <!--添加钢瓶-->
    <Modal
      v-model="modal1"
      width="320"
      title="添加钢瓶">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="addGp">确定
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="quxiao">取消</Button>
      </div>
      <Form :model="addGps" :label-width="80">
        <FormItem label="钢瓶体积" style="margin: 0 0 10px 0">
          <Select v-model="addGps.fyszid" :transfer="true" style="width: 195px;">
            <Option :value="item.id" v-for="item in this.tjList" :key="item.id">{{item.tj}}</Option>
          </Select>
        </FormItem>
        <FormItem label="钢瓶重量" style="margin: 0 0 10px 0">
          <Input v-model="addGps.gpzl" placeholder="钢瓶重量" style="width: 195px;"/>
        </FormItem>
        <FormItem label="瓶号" style="margin: 0 0 10px 0">
          <Input v-model="addGps.gpph" placeholder="瓶号" style="width: 195px;"/>
        </FormItem>
      </Form>
    </Modal>


    <!--更换钢瓶-->
    <Modal
      v-model="modal2"
      width="320"
      title="更换钢瓶/加气登记">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="changeGPJQ">确定
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="quxiao">取消</Button>
      </div>
      <Form :model="changeGp" :label-width="80">
        <FormItem label="操作类型" style="margin: 0 0 10px 0">
          <Select v-model="changeGp.type" :transfer="true" style="width: 195px;">
            <Option value="0">换瓶</Option>
            <Option value="1">报废</Option>
          </Select>
        </FormItem>
        <FormItem label="操作时间" style="margin: 0 0 10px 0">
          <DatePicker type="date" placeholder="操作时间" :transfer="true"
                      v-model="changeGp.czsj"
                      style="width: 195px;"></DatePicker>
        </FormItem>
        <FormItem label="操作内容" style="margin: 0 0 10px 0">
          <Input v-model="changeGp.cznr" placeholder="瓶号" style="width: 195px;"/>
        </FormItem>
        <FormItem label="总价" style="margin: 0 0 10px 0">
          <Input v-model="changeGp.zj" placeholder="瓶号" style="width: 195px;"/>
        </FormItem>
      </Form>
    </Modal>


    <Card style="width:98%;margin: 10px 1%">
      <p slot="title">再装钢瓶详情</p>
      <div slot="extra">
        <Button type="primary" icon="plus" @click="modal1=true" size="small">增加</Button>
      </div>
      <Table :columns="columns2" :data="data2" size="small" border style="margin-top: 10px;"></Table>
    </Card>
    <Card style="width:98%;margin: 10px 1%">
      <p slot="title">钢瓶更换记录</p>
      <Tabs value="name1" style="margin-top: -15px;" @on-click="changesTabs">
        <TabPane label="报废记录" name="name1">
          <Table :columns="columns3" :data="data3" size="small" border style="margin-top: 10px;"></Table>
        </TabPane>
        <TabPane label="换瓶记录" name="name2">
          <Table :columns="columns4" :data="data4" size="small" border style="margin-top: 10px;"></Table>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
  import CommonSelect from '../../components/common/CommonSelect.vue'
  export default {
    components: {
      CommonSelect,
    },
    data () {
      return {
        modal1: false,
        modal2: false,
        isDisable: true,
        gpId: '',
        gpxqId: '',
        tjList: [],
        formItem: {
          dwmc: '',
          cph: '',
          zbh: '',
          jcrq: '',
          bcjcrq: '',
          cx: ''
        },
        addGps: {
          fyszid: '',
          gpph: '',
          gpid: '',
          gpzl: '',
          scrq: ''
        },
        changeGp: {
          cznr: "",
          czsj: "",
          gpxqId: "",
          type: "",
          zj: ""
        },
        cz: {
            currPage:1,
            pageSize:10,
            type:'1'
        },
        cz1: {
          currPage:1,
          pageSize:10,
          type:'0'
        },
//        钢瓶重量、体积、瓶号、生产日期
        columns2: [
          {
            title: '钢瓶重量',
            key: 'gpzl'
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
            title: '瓶号',
            key: 'gpph'
          },
          {
            title: '生产日期',
            key: 'scrq',
          },
          {
            title: '操作',
            align: 'center',
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
                      this.modal2 = true;
                      this.gpxqId = params.row.id
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
                      this.$fetch(this.$url.gpjcxqDel + '?id=' + params.row.id)
                        .then(res => {
                          console.log(res);
                          if (res.msg === 'success') {
                            this.$Message.info('删除成功');
                            this.list1();
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
                  },'删除')
                ])
              ]);
            }
          }
        ],
        data2: [],


        columns3: [
          {
            title: '钢瓶id',
            key: 'gpxqId'
          },
          {
            title: '操作时间',
            key: 'czsj'
          },
          {
            title: '操作内容',
            key: 'cznr'
          },
          {
            title: '总价',
            key: 'zj'
          },
        ],
        data3: [],


        columns4: [
          {
            title: '钢瓶id',
            key: 'gpxqId'
          },
          {
            title: '操作时间',
            key: 'czsj'
          },
          {
            title: '操作内容',
            key: 'cznr'
          },
          {
            title: '总价',
            key: 'zj'
          },
        ],
        data4: []
      }
    },
    methods: {
      edit: function () {
        this.isDisable = false;
      },
      update: function () {
        this.isDisable = true;
        this.$post(this.$url.updateGpjcdj, this.formItem)
          .then(res => {
            if (res.msg === 'success') {
              this.$Message.info('修改成功');
            } else {
              this.$Message.error('修改失败');
            }
          })
      },
      list1: function () {
        this.$fetch(this.$url.gpjcxqList, {currPage: 1, pageSize: 10,gpid:this.gpid})
          .then(res => {
            console.log(res);
            if (res.msg === 'success') {
              res.page.forEach(item => {
                item.scrq = this.$formatDate(item.scrq).substring(0, 10)
              });
              this.data2 = res.page
            }
          })
      },
//      获取钢瓶体积单价
      getTj: function () {
        this.$fetch(this.$url.gpjcList, {currPage: 1, pageSize: 10})
          .then(res => {
            console.log(res);
            if (res.page.total === 0) {
              this.$Message.info('暂无数据');
              this.totalPage = res.page.total;
              this.data1 = res.page.records;
            } else {
              res.page.records.forEach(item => {
                item.xzsj = this.$formatDate(item.xzsj).substring(0, 10)
              });
              this.tjList = res.page.records
              console.log(res.page.records, '体积')
            }
          })
      },
      addGp: function () {
        this.addGps.gpid = this.gpid;
        console.log(this.addGps);
        if (this.addGps.gpid === '' || this.addGps.gpzl === '' || this.addGps.gpph === '') {
          this.$Message.error('填写完整参数');
        } else {
          this.$post(this.$url.gpjcxqSave, this.addGps)
            .then(res => {
              if (res.msg === 'success') {
                this.$Message.info('添加成功');
                this.modal1 = false;
                this.list1();
              } else {
                this.$Message.error('添加失败');
              }
            })
        }
      },
      quxiao: function () {
        // this.$Message.error('操作失败');
        this.modal1 = false;
        this.modal2 = false;
      },
      changeGPJQ: function () {
        console.log(this.gpxqId);
        this.changeGp.gpxqId = this.gpid
        if (this.changeGp.czsj == '') {
          this.changeGp.czsj = ''
        } else {
          this.changeGp.czsj = this.$formatDate(this.changeGp.czsj).substring(0,10)
        };
        this.$post(this.$url.gpjcxqJQ, this.changeGp)
          .then(res => {
            if (res.msg === 'success') {
              this.$Message.info('添加成功');
              this.czlist1();
              this.czlist2();
              this.modal2 = false;
              this.changeGp = {}
            } else {
              this.$Message.error('添加失败');
            }
          });
          console.log(this.changeGp)
      },
      changesTabs:function (name) {
        console.log(name);
        if(name==='name1'){
            this.czlist1()
        }else {
            this.czlist2()
        }
      },
      czlist1:function () {
        this.$post(this.$url.gpjcxqJL+'?currPage='+this.cz.currPage+'&pageSize='+this.cz.pageSize+'&type='+this.cz.type+'&id='+this.gpid)
          .then(res => {

            res.page.records.forEach(item=>{
              item.czsj = this.$formatDate(item.czsj).substring(0,10)
            });
            console.log(res.page.records,'操作记录');
            if (res.msg === 'success') {
                this.data3 = res.page.records
            } else {

            }
          });
      },
      czlist2:function () {
        this.$post(this.$url.gpjcxqJL+'?currPage='+this.cz1.currPage+'&pageSize='+this.cz1.pageSize+'&type='+this.cz1.type+'&id='+this.gpid)
          .then(res => {

            res.page.records.forEach(item=>{
              item.czsj = this.$formatDate(item.czsj).substring(0,10)
            });
            console.log(res.page.records,'操作记录');
            if (res.msg === 'success') {
              this.data4 = res.page.records
            } else {

            }
          });
      }
    },
    mounted () {
      this.gpid = this.$route.query.djInfo.id;
      this.formItem = this.$route.query.djInfo;

      this.list1();
      this.getTj();


      this.czlist1();
//      this.czlist2();
      console.log(this.$server);
    }
  }
</script>

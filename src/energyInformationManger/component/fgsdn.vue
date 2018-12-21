<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card style="padding-left: 15px;">
        <Form :model="formItem" :label-width="80">
          <div class="search">
            <FormItem label="选择时间" style="margin: 0">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="formItem.tjsj"
                          class="text_width" style="width: 150px;"></DatePicker>
            </FormItem>
            <FormItem label="选择线路" style="margin: 0" prop="_lb">
              <!--<Select v-model="formItem.lb" :transfer="true" style="width: 150px;">-->
              <!--<Option value="">全部</Option>-->
              <!--<Option value="1路">1路</Option>-->
              <!--<Option value="2路">2路</Option>-->
              <!--<Option value="3路">3路</Option>-->
              <!--</Select>-->
              <CommonSelect type="LB" :selectValue="formItem._lb" style="width: 150px;"></CommonSelect>
            </FormItem>
            <FormItem label="选择公司" style="margin: 0" prop="_dw">
              <!--<Select v-model="formItem.dw" :transfer="true" style="width: 150px;">-->
              <!--<Option value="">全部</Option>-->
              <!--<Option value="公交一公司">公交一公司</Option>-->
              <!--<Option value="公交二公司">公交二公司</Option>-->
              <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS" :selectValue="formItem._dw" style="width: 150px;"></CommonSelect>
            </FormItem>
            <FormItem label="车牌号" style="margin: 0">
              <Input v-model="formItem.cph" placeholder="车牌号" class="text_width" style="width: 150px;"/>
            </FormItem>
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary" @click="chaxun1" style="margin-right: 3px;" v-has="'dnxhtj_fgs_search'">
                <Icon type="search"></Icon>
                搜索
              </Button>
              <Button type="primary" @click="daochu1" icon="android-download" v-has="'dnxhtj_fgs_export'">导出</Button>
              <Button type="primary" @click="add_de" icon="android-download" style="margin-left: 3px">添加电能定额</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <Table :columns="columns11" :data="data10" border height="500" style="margin-top: 10px;" size="small"></Table>
      <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="setpPage1"></Page>
    </div>


    <!--添加单价-->
    <Modal
      v-model="modal_addde"
      title="添加电能定额"
      width="400"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="save">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <div style="display: flex;justify-content: center">
        <Form :model="formItem2" :label-width="80">
          <FormItem label="时间">
            <DatePicker type="month" placeholder="请选择时间" v-model="formItem2.time" style="width: 190px;"></DatePicker>
          </FormItem>
          <FormItem label="车牌号">
            <Select v-model="formItem2.cph" filterable style="width: 190px;">
              <Option v-for="(item,index) in cphList" :value="item.bus_num" :key="index">{{item.bus_num}}</Option>
            </Select>
          </FormItem>
          <FormItem label="单价">
            <Input v-model="formItem2.dexh" placeholder="单价" style="width: 190px;"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>


  </div>
</template>
<script>
  import CommonSelect from '../../components/common/CommonSelect.vue'

  export default {
    components: {
      CommonSelect,
    },
    data() {
      return {
        cphList: [],
        modal_addde: false,
        formItem2: {
          nd: '',
          yf: '',
          time: '',
          cph: '',
          dexh: '',
        },
        totalPage: 1,
        formItem: {
          current: 1,
          size: 10,
          tjsj: '',
          dw: '',
          _dw: '',
          nd: '',
          yf: '',
          lb: '',
          _lb: '',
          cph: ''
        },
        columns11: [
          {
            title: '路别',
            key: 'lb',
            align: 'center',
            width: 100,
          },
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            width: 100,
          },
          {
            title: '时间',
            key: 'tjsj',
            align: 'center',
            width: 100,
          },
          {
            title: '自编号',
            key: 'zbh',
            align: 'center',
            width: 100,
          },
          {
            title: '车牌号',
            key: 'cph',
            align: 'center',
            width: 100,
          },
          {
            title: '工作车日',
            key: 'gzcr',
            align: 'center',
            width: 120,
          },
          {
            title: '行车次数',
            key: 'xccs',
            align: 'center',
            width: 120,
          },
          {
            title: '行驶里程（公里）',
            key: 'name',
            align: 'center',
            width: 120,
            children: [
              {
                title: '合计',
                key: 'hj',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '营业',
                key: 'yylc',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '非营业',
                key: 'fyylc',
                align: 'center',
                width: 120,
                sortable: false
              },
            ]
          },
          {
            title: '电能消耗（度）',
            key: 'name',
            align: 'center',
            width: 120,
            children: [
              {
                title: '实际消耗',
                key: 'sjxh',
                align: 'center',
                width: 150,
                sortable: false
              },
              {
                title: '定额消耗',
                key: 'dexh',
                align: 'center',
                width: 150,
                sortable: false
              },
              {
                title: '节超（±）',
                key: 'jc',
                align: 'center',
                width: 150,
                sortable: false
              },
            ]
          },
          {
            title: '客运量（人次）',
            key: 'name',
            align: 'center',
            width: 120,
            children: [
              {
                title: '合计',
                key: 'kyl_hj',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '其中：投币人次',
                key: 'kyl_tbrc',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '其中：普通IC卡人次',
                key: 'kyl_ick',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '其中：月票卡人次',
                key: 'kyl_yp',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '其中：老年卡人次',
                key: 'kyl_jlk',
                align: 'center',
                width: 120,
                sortable: false
              }
            ]
          },
        ],
        data10: [],
      }
    },
    methods: {
      add_de() {
        this.modal_addde = true
      },
      save() {
        if (this.formItem2.time === '') {
          this.formItem.nd = ''
          this.formItem.yf = ''
        } else {
          this.formItem2.nd = this.$formatDate(this.formItem2.time).substring(0, 4)
          this.formItem2.yf = this.$formatDate(this.formItem2.time).substring(5, 7)
        }
        if (this.formItem2.time == '' || this.formItem2.cph == '' || this.formItem2.dexh == '') {
          this.$Message.info('请填写完整信息');
        } else {
          console.log(this.formItem2)
          this.$post(this.$url.setDnxhde + '?nd=' + this.formItem2.nd + '&yf=' + this.formItem2.yf + '&cph=' + this.formItem2.cph + '&dexh=' + this.formItem2.dexh)
            .then(res => {
              console.log(res)
              if (res.success === true) {
                this.$Message.success('添加成功');
                this.modal_addde = false
                this.clean()
                this.getList()
              } else {
                this.$Message.error('添加失败')
                this.modal_addde = false
                this.clean()
              }
            })
        }
      },
      cancel() {
        this.modal_addde = false
        this.clean()
      },
      clean() {
        this.formItem2.time = ''
        this.formItem2.dexh = '',
          this.cphList = []
        this.formItem2.cph = ''
        this.getAllCph()
      },
      getList: function () {
        this.$fetch(this.$url.fgsdnList, this.formItem)
          .then(res => {
            console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无信息')
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            } else {
              res.data.records.forEach(item => {
                console.log(item.tjsj)
                item.tjsj = item.nd + '-' + item.yf
              });
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            }
          })
      },
      setpPage1: function (current) {
        console.log(current);
        this.formItem.current = current;
        this.getList()
      },
      chaxun1: function () {
        this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        this.formItem.lb = this.$store.state.dictData.parseDict.LB[this.formItem._lb];
        if (this.formItem.tjsj == '') {
          this.formItem.nd = ''
          this.formItem.yf = ''
        } else {
          this.formItem.nd = this.$formatDate(this.formItem.tjsj).substring(0, 4)
          this.formItem.yf = this.$formatDate(this.formItem.tjsj).substring(5, 7)
        }
        console.log(this.formItem)
        this.getList()
      },
      daochu1: function () {
        if (this.formItem._dw == '') {
          this.formItem.dw = ''
        } else {
          this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        }
        if (this.formItem._lb == '') {
          this.formItem.lb = ''
        } else {
          this.formItem.lb = this.$store.state.dictData.parseDict.LB[this.formItem._lb];
        }
        if (this.formItem.tjsj == '') {
          this.formItem.nd = ''
          this.formItem.yf = ''
        } else {
          this.formItem.nd = this.$formatDate(this.formItem.tjsj).substring(0, 4)
          this.formItem.yf = this.$formatDate(this.formItem.tjsj).substring(5, 7)
        }
        console.log(this.formItem)
        this.$getExcel(process.env.BASE_URL + this.$url.daochufgsdnList + '?nd=' + this.formItem.nd + '&dw=' + this.formItem.dw + '&lb=' + this.formItem.lb + '&cph=' + this.formItem.cph + '&yf=' + this.formItem.yf)
      },
      getAllCph() {
        this.$fetch(this.$url.getAllCph, this.formItem)
          .then(res => {
            console.log(res);
            this.cphList = res.data
          })
      }
    },
    mounted() {
      this.getAllCph()
    }
  }
</script>


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


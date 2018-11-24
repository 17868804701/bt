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
              <CommonSelect type="LB"  :selectValue="formItem._lb" style="width: 150px;"></CommonSelect>
            </FormItem>
            <FormItem label="选择公司" style="margin: 0" prop="_dw">
              <!--<Select v-model="formItem.dw" :transfer="true" style="width: 150px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="公交一公司">公交一公司</Option>-->
                <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS"  :selectValue="formItem._dw" style="width: 150px;"></CommonSelect>
            </FormItem>
            <FormItem label="车牌号" style="margin: 0">
              <Input v-model="formItem.cph" placeholder="车牌号" class="text_width" style="width: 150px;"/>
            </FormItem>
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary"  @click="chaxun1" style="margin-right: 3px;" v-has="'dnxhtj_fgs_search'"><Icon type="search"></Icon>  搜索</Button>
              <Button type="primary" @click="daochu1" icon="android-download" v-has="'dnxhtj_fgs_export'">导出</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <Table :columns="columns11" :data="data10" border height="500" style="margin-top: 10px;" size="small"></Table>
      <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="setpPage1"></Page>
    </div>
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
        totalPage: 1,
        formItem: {
          current: 1,
          size: 10,
          tjsj: '',
          dw: '',
          _dw: '',
          nd:'',
          yf:'',
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
                title: '节超（+）',
                key: 'jc',
                align: 'center',
                width: 150,
                sortable: false
              },
            ]
          }
        ],
        data10: [],
      }
    },
    methods: {
      getList: function () {
        this.$fetch(this.$url.fgsdnList, this.formItem)
          .then(res => {
            console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无信息')
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            } else {
              res.data.records.forEach(item=>{
                  console.log(item.tjsj)
                item.tjsj = item.nd+'-'+item.yf
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
        this.formItem.dw  = this.$store.state.dictData.parseDict.EJGS[ this.formItem._dw];
        this.formItem.lb  = this.$store.state.dictData.parseDict.LB[ this.formItem._lb];
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
        if(this.formItem._dw==''){
          this.formItem.dw = ''
        }else {
          this.formItem.dw  = this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        }

        if(this.formItem._lb==''){
          this.formItem.lb = ''
        }else {
          this.formItem.lb  = this.$store.state.dictData.parseDict.LB[this.formItem._lb];
        }
        if (this.formItem.tjsj == '') {
          this.formItem.nd = ''
          this.formItem.yf = ''
        } else {
          this.formItem.nd = this.$formatDate(this.formItem.tjsj).substring(0, 4)
          this.formItem.yf = this.$formatDate(this.formItem.tjsj).substring(5, 7)
        }
        console.log(this.formItem)
        this.$getExcel(process.env.BASE_URL + this.$url.daochufgsdnList + '?nd=' + this.formItem.nd+'&dw='+this.formItem.dw+'&lb='+this.formItem.lb+'&cph='+this.formItem.cph+'&yf='+this.formItem.yf )
      }
    },
    mounted () {

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


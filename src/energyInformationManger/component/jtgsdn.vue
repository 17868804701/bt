<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card style="padding-left: 15px;">
        <Form :model="formItem1" :label-width="80">
          <div class="search">
            <FormItem label="选择时间" style="margin: 0">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="formItem1.tjsj"
                          class="text_width" style="width: 150px;"></DatePicker>
            </FormItem>
            <FormItem label="选择线路" style="margin: 0" prop="_lb">
              <!--<Select v-model="formItem1.lb" :transfer="true" style="width: 150px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="1路">1路</Option>-->
                <!--<Option value="2路">2路</Option>-->
                <!--<Option value="3路">3路</Option>-->
              <!--</Select>-->
              <CommonSelect type="LB"  :selectValue="formItem1._lb" style="width: 150px;"></CommonSelect>
            </FormItem>
            <FormItem label="选择公司" style="margin: 0" prop="_dw">
              <!--<Select v-model="formItem1.dw" :transfer="true" style="width: 150px;" >-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="公交一公司">公交一公司</Option>-->
                <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS"  :selectValue="formItem1._dw" style="width: 150px;"></CommonSelect>
            </FormItem>
            <!--<FormItem label="车牌号" style="margin: 0">-->
              <!--<Input v-model="formItem1.cph" placeholder="车牌号" class="text_width" style="width: 150px;"/>-->
            <!--</FormItem>-->
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary"  @click="chaxun2" style="margin-right: 3px;" v-has="'dnxhtj_jtgs_search'"><Icon type="search"></Icon>  搜索</Button>
              <Button type="primary" @click="daochu2" icon="android-download" v-has="'dnxhtj_jtgs_export'">导出</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <Table :columns="columns12" :data="data12" border height="500" style="margin-top: 10px;" size="small"></Table>
      <Page :total="totalPage1" show-total style="margin-top: 10px;" @on-change="setpPage2"></Page>
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
        totalPage1: 1,
        formItem1: {
          current: 1,
          size: 10,
          tjsj: '',
          nd: '',
          yf: '',
          dw: '',
          _dw: '',
          lb: '',
          _lb: '',
          cph: ''
        },
        columns12: [
          {
            title: '分公司',
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
            title: '路别',
            key: 'lb',
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
                width: 150,
                sortable: false
              },
              {
                title: '营业',
                key: 'yylc',
                align: 'center',
                width: 150,
                sortable: false
              }, {
                title: '非营业',
                key: 'fyylc',
                align: 'center',
                width: 150,
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
                width: 160,
                sortable: false
              },
              {
                title: '定额消耗',
                key: 'dexh',
                align: 'center',
                width: 160,
                sortable: false
              },
              {
                title: '节超（±）',
                key: 'jc',
                align: 'center',
                width: 160,
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
        data12: [],
      }
    },
    methods: {
      getList:function () {
        this.$fetch(this.$url.jtdnList, this.formItem1)
          .then(res => {
            console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无信息')
              this.data12 = res.data.records;
              this.totalPage1 = res.data.total;
            } else {
              res.data.records.forEach(item=>{
                console.log(item.tjsj)
                item.tjsj = item.nd+'-'+item.yf
              });
              this.data12 = res.data.records;
              this.totalPage1 = res.data.total;
            }
          })
      },


      setpPage2: function (current) {
        console.log(current);
        this.formItem1.current = current;
        this.getList()
      },

      chaxun2:function () {
        console.log(this.formItem1)
        this.formItem1.dw  = this.$store.state.dictData.parseDict.EJGS[ this.formItem1._dw];
        this.formItem1.lb  = this.$store.state.dictData.parseDict.LB[ this.formItem1._lb];
        if(this.formItem1.tjsj==''){
          this.formItem1.nd = ''
          this.formItem1.yf = ''
        }else {
            this.formItem1.nd = this.$formatDate(this.formItem1.tjsj).substring(0,4)
            this.formItem1.yf = this.$formatDate(this.formItem1.tjsj).substring(5,7)
        }
        this.getList()
      },
      tabsChange:function (name) {
        if(name=='name1'){
            this.list1()
        }else {
            this.getList()
        }
      },
      daochu2:function () {
        if(this.formItem1._dw ==''){
          this.formItem1.dw = ''
        }else {
          this.formItem1.dw  = this.$store.state.dictData.parseDict.EJGS[this.formItem1._dw];
        }

        if(this.formItem1._lb ==''){
          this.formItem1.lb = ''
        }else {
          this.formItem1.lb  = this.$store.state.dictData.parseDict.LB[this.formItem1._lb];
        }
        if (this.formItem1.tjsj == '') {
          this.formItem1.nd = ''
          this.formItem1.yf = ''
        } else {
          this.formItem1.nd = this.$formatDate(this.formItem1.tjsj).substring(0, 4)
          this.formItem1.yf = this.$formatDate(this.formItem1.tjsj).substring(5, 7)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.jtdnListdaochu + '?nd=' + this.formItem1.nd+'&dw='+this.formItem1.dw+'&lb='+this.formItem1.lb+'&cph='+this.formItem1.cph+'&yf='+this.formItem1.yf )
      }
    },
    mounted () {
      // this.getList()
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


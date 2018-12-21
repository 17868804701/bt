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
    <div style="padding: 20px 0 10px 20px;border-bottom: 1px solid #eae9ec">
      <h2>线路效益</h2>
    </div>
    <div v-if="$showMenu('线路效益和经济活动')">
      <Card style="padding-left: 15px;margin-top: 10px;">
        <Form :model="formItem" :label-width="80">
          <div class="search">
            <FormItem label="选择时间" style="margin: 0">
              <DatePicker type="year" placeholder="选择时间" :transfer="true" v-model="formItem.nd"
                          class="text_width"></DatePicker>
            </FormItem>
            <FormItem label="选择季度" style="margin: 0">
              <Select v-model="formItem.jd" :transfer="true" style="width: 195px;">
                <Option value="">全部</Option>
                <Option value="1">第一季度</Option>
                <Option value="2">第二季度</Option>
                <Option value="3">第三季度</Option>
                <Option value="4">第四季度</Option>
              </Select>
            </FormItem>
            <FormItem label="选择单位" style="margin: 0" prop="_dw">
              <!--<Select v-model="formItem.dw" :transfer="true" style="width: 195px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="公交一公司">公交一公司</Option>-->
                <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS" :selectValue="formItem._dw" style="width: 195px;"></CommonSelect>
            </FormItem>
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary" @click="getList" style="margin-right: 3px;" v-has="'xlxyfx_search'"><Icon type="search"></Icon>  搜索</Button>
              <Button type="primary" icon="android-download" @click="daochu" v-has="'xlxyfx_daochu'">导出</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <Table :columns="columns12" :data="data12" border height="500" style="margin-top: 10px;" size="small">
        <div slot="header" style="text-align: center">
          <span style="font-size: 16px;">{{nd}}{{jd}}{{dw}}市内各公交各条运营线路效益分析表</span>
        </div>
      </Table>
      <Page :total="total" show-total @on-change="setPage"/>
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
        modal1:false,
        nd: '',
        jd: '',
        dw: '',
        formItem: {
          nd: '',
          jd: '',
          dw: '',
          _dw:'',
          current:1,
          size:10
        },
        total:0,
        columns12: [
          {
            title: '单位',
            key: 'dw',
            width:100,
            align: 'center',
          },
          {
            title: '线路名称',
            key: 'lb',
            width:100,
            align: 'center',
          }, {
            title: '行车次数',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期',
                key: 'xccsBq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期',
                key: 'xccsTq',
                width:100,
                align: 'center',
              }, {
                title: '±%',
                key: 'xccsZzl',
                width:100,
                align: 'center',
              },
            ]
          },
          {
            title: '运营里程',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期',
                key: 'yylcBq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期',
                key: 'yylcTq',
                width:100,
                align: 'center',
              }, {
                title: '±%',
                key: 'yylcZzl',
                width:100,
                align: 'center',
              },
            ]
          },
          {
            title: '客运量',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期敬老卡',
                key: 'kyl_jlkbq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期敬老卡',
                key: 'kyl_jlktq',
                width:100,
                align: 'center',
              }, {
                title: '本期月票卡',
                key: 'kyl_ypkbq',
                width:100,
                align: 'center',
              }, {
                title: '上年同期月票卡',
                key: 'kyl_ypktq',
                width:100,
                align: 'center',
              },

              {
                title: '±%',
                key: 'kylZzl',
                width:100,
                align: 'center',
              },
            ]
          },
          {
            title: '收入',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期',
                key: 'srBq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期',
                key: 'srTq',
                width:100,
                align: 'center',
              }, {
                title: '±%',
                key: 'srZzl',
                width:100,
                align: 'center',
              },
            ]
          },
          {
            title: '每车次客运量',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期',
                key: 'mcckylBq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期',
                key: 'mcckylTq',
                width:100,
                align: 'center',
              }, {
                title: '±%',
                key: 'mcckylZzl',
                width:100,
                align: 'center',
              },
            ]
          },
          {
            title: '百公里收入（元/百公里）',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期',
                key: 'bglcbBq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期',
                key: 'bglcbTq',
                width:100,
                align: 'center',
              }, {
                title: '±%',
                key: 'bglcbZzl',
                width:100,
                align: 'center',
              },
            ]
          },
          {
            title: '百公里成本（元/百公里）',
            key: 'tbrc',
            width:100,
            align: 'center',
            children:[
              {
                title: '本期',
                key: 'bglsrBq',
                width:100,
                align: 'center',
              },   {
                title: '上年同期',
                key: 'bglsrTq',
                width:100,
                align: 'center',
              }, {
                title: '±%',
                key: 'bglsrZzl',
                width:100,
                align: 'center',
              },
            ]
          }
        ],
        data12: [],
      }
    },
    methods: {
      getList() {
        this.formItem.dw =  this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        if (this.formItem.nd === '') {
          this.formItem.nd = ''
        } else {
          this.formItem.nd = this.$formatDate(this.formItem.nd).substring(0, 4)
        }



        this.nd = this.formItem.nd
        this.dw = this.formItem.dw
        if(this.formItem.jd === '1'){
          this.jd = '年第一季度'
        }else if(this.formItem.jd === '2'){
          this.jd = '年第二季度'
        }else if(this.formItem.jd === '3'){
          this.jd = '年第三季度'
        }else if(this.formItem.jd === '4'){
          this.jd = '年第四季度'
        }else {
          this.jd = ''
        }


        this.$fetch(this.$url.xlxyList, this.formItem)
          .then(res => {
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无数据')
                console.log(res);
                console.log(res.data.records);
                this.data12 = res.data.records;
                this.total = res.data.total
              } else {
                console.log(res);
                console.log(res.data.records);
                this.data12= res.data.records
                this.total = res.data.total
              }
            } else {
              this.$Message.info('查询失败')
            }
          })
      },
      daochu(){
        if (this.formItem.nd === '') {
          this.formItem.nd = ''
        } else {
          this.formItem.nd = this.$formatDate(this.formItem.nd).substring(0, 4)
        }
        if(this.formItem._dw==''){
          this.formItem.dw = ''
        }else {
          this.formItem.dw =  this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        }
        this.$getExcel(this.$url.xlxyDaochu+'?nd='+this.formItem.nd+'&jd='+this.formItem.jd+'&dw='+this.formItem.dw)
      },
      setPage: function (current) {
          console.log(current)
        this.formItem.current = current;
        this.getList();
      },
    },
    mounted () {
      this.getList()
    }
  }
</script>

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
      <Form :model="fgstsqkfl" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="fgstsqkfl.tssj"
                        class="text_width"></DatePicker>
          </FormItem>
          <FormItem label="选择公司" style="margin: 0" prop="bm">
            <!--<Select v-model="fgstsqkfl.bm" :transfer="true" style="width: 195px;">-->
              <!--<Option value="公交一公司">公交一公司</Option>-->
              <!--<Option value="公交二公司">公交二公司</Option>-->
              <!--<Option value="公交三公司">公交三公司</Option>-->
            <!--</Select>-->
            <CommonSelect type="EJGS"  :selectValue="fgstsqkfl.bm" style="width: 180px;"></CommonSelect>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search2"
                  v-has="'kfclqktj_fgstsqkflhzb_search'">查询
          </Button>
          <div class="btn">
            <!--<Button type="primary" icon="android-upload">导入</Button>-->
            <Button type="primary" icon="android-download" @click="daochu2" v-has="'kfclqktj_fgstsqkflhzb_export'">
              导出Excel
            </Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns12" :data="data12" border height="auto" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px">{{nian}}{{yue}}{{gs}}投诉情况分类汇总表</span>
      </div>
    </Table>
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
        fgstsqkfl: {
          bm: '',
          tssj: '',
          _bm:'',
        },
        nian:'',
        yue:'',
        gs:'公交一公司',
        columns12: [
          {
            title: '路别/项目',
            key: 'xl',
            align: 'center',
            render: (h, params) => {
              let texts = '';
              if(params.row.xl==='合计'){
                texts = '合计'
              }else {
                texts = this.$store.state.dictData.parseDict.LB[params.row.xl];
              }
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '到站不停车',
            key: 'DZBTC',
            align: 'center',
          }, {
            title: '拒载',
            key: 'JZ',
            align: 'center',
          }, {
            title: '服务态度差',
            key: 'FWTDC',
            align: 'center',
          }, {
            title: '脱线运营',
            key: 'TXYY',
            align: 'center',
          }, {
            title: '摔夹事故',
            key: 'SJSG',
            align: 'center',
          }, {
            title: '刷IC卡方面',
            key: 'ICKFM',
            align: 'center',
          }, {
            title: '其它',
            key: 'QT',
            align: 'center',
          }, {
            title: '项目合计',
            key: 'sumcount',
            align: 'center',
          },
        ],
        data12: [],

      }
    },
    methods: {
      getList: function () {
        if (this.fgstsqkfl.tssj === '') {
          this.fgstsqkfl.tssj = ''
          this.nian =''
          this.yue  = ''
          this.gs  = this.fgstsqkfl.bm
        } else {
          this.fgstsqkfl.tssj = this.$formatDate(this.fgstsqkfl.tssj).substring(0,7)
          this.nian = this.$formatDate(this.fgstsqkfl.tssj).substring(0,4)
          this.yue  = this.$formatDate(this.fgstsqkfl.tssj).substring(4,7)
          this.gs  = this.fgstsqkfl.bm
        }
        this.$fetch(this.$url.fgstsqkfl, this.fgstsqkfl)
          .then(res => {
            //console.log(res)
            if (res.success === true) {
              if (res.data == null) {
                this.$Message.info('暂无数据');
//                this.data12 = res.data
              } else {
                res.sumcount[0].xl = '合计';
                delete res.sumcount[0].hj;
                let zj = res.sumcount;
                res.data = res.data.concat(zj);
                //console.log(res.data)
                this.data12 = res.data
              }
            }
          })
      },
      search2: function () {
        // this.fgstsqkfl.bm  = this.$store.state.dictData.parseDict.EJGS[ this.fgstsqkfl.bm];
        this.getList();
      },
      daochu2: function () {
        if(this.fgstsqkfl._bm==''){
          this.fgstsqkfl.bm = ''
        }else {
          this.fgstsqkfl.bm  = this.$store.state.dictData.parseDict.EJGS[this.fgstsqkfl._bm];
        }
        if (this.fgstsqkfl.tssj === '') {
          this.fgstsqkfl.tssj = ''
        } else {
          this.fgstsqkfl.tssj = this.$formatDate(this.fgstsqkfl.tssj).substring(0,7)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.fgstsqkflExport + '?bm=' + this.fgstsqkfl.bm+'&tssj='+this.fgstsqkfl.tssj)
      },
    },
    mounted () {

    }
  }
</script>

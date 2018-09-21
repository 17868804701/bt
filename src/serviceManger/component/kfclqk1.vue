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
      <Form :model="tsqkfl" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="tsqkfl.tssj"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search1" v-has="'kfclqktj_tsqkflhzb_search'">查询</Button>
          <div class="btn">
            <!--<Button type="primary" icon="android-upload">导入</Button>-->
            <Button type="primary" icon="android-download" @click="daochu1" v-has="'kfclqktj_tsqkflhzb_export'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns11" :data="data11" border height="470" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px">{{nian}}{{yue}}投诉情况分类汇总表</span>
      </div>
    </Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tsqkfl: {
         tssj:''
        },
        nian:'',
        yue:'',
        columns11: [
          {
            title: '单位/项目',
            key: 'bm',
            align: 'center',

          },
          {
            title: '到站不停车',
            key: 'DZBTC',
            align: 'center',
          },  {
            title: '拒载',
            key: 'JZ',
            align: 'center',
          },  {
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
          },{
            title: '项目合计',
            key: 'sumcount',
            align: 'center',
          },
        ],
        data11: [],
      }
    },
    methods: {
        getList:function () {
          this.$fetch(this.$url.tsqkfl, this.tsqkfl)
            .then(res => {
              //console.log(res);
              if(res.success===true){
                  if(res.data.length==0){
                      this.$Message.info('暂无数据');
                      this.data11 = res.data
                  }else {
                      res.sumcount[0].bm = '合计';
                      delete res.sumcount[0].jtzj;
                      let zj = res.sumcount;
                      res.data = res.data.concat(zj)
                      this.data11 = res.data
                  }
              }
            })
        },
      search1:function () {
        if(this.tsqkfl.tssj===''){
          this.tsqkfl.tssj==''
          this.nian = ''
          this.yue  = ''
        }else {
          this.tsqkfl.tssj = this.$formatDate(this.tsqkfl.tssj).substring(0,7);
          this.nian = this.$formatDate(this.tsqkfl.tssj).substring(0,4)
          this.yue  = this.$formatDate(this.tsqkfl.tssj).substring(4,7)
        }
        this.getList();
      },
      daochu1:function () {
        if(this.tsqkfl.tssj===''){
          this.tsqkfl.tssj==''
        }else {
          this.tsqkfl.tssj = this.$formatDate(this.tsqkfl.tssj).substring(0,7);
        }
        this.$getExcel(process.env.BASE_URL + this.$url.tsqkflExport + '?tssj=' + this.tsqkfl.tssj)
      }
    },
    mounted () {

    }
  }
</script>

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
      <Form :model="kfxxtj" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="kfxxtj.time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search3" v-has="'kfclqktj_kfclqkbbtj_search'">查询</Button>
          <div class="btn">
            <!--<Button type="primary" icon="android-upload">导入</Button>-->
            <Button type="primary" icon="android-download" @click="daochu3" v-has="'kfclqktj_kfclqkbbtj_export'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns13" :data="data13" border height="470" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px">{{nian}}{{yue}}客服处理情况报表统计</span>
      </div>
    </Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        kfxxtj:{
            time:''
        },
        nian:'',
        yue:'',
        columns13: [
          {
            title: '单位/项目',
            key: 'bm',
            align: 'center',

          },   {
            title: '转办件数',
            key: 'ybjtshj',
            align: 'center',

          }, {
            title: '分类及所占比例',
            key: 'jz',
            align: 'center',
            children:[
              {
                title: '到站不停车',
                key: 'dzbtcCount',
                align: 'center',
              }, {
                title: '%',
                key: 'dzbtcBfb',
                align: 'center',
              }, {
                title: '大间隔',
                key: 'djgCount',
                align: 'center',
              }, {
                title: '%',
                key: 'djgBfb',
                align: 'center',
              }, {
                title: '拒载',
                key: 'jzCount',
                align: 'center',
              }, {
                title: '%',
                key: 'jzBfb',
                align: 'center',
              }, {
                title: '服务态度差',
                key: 'fwtdcCount',
                align: 'center',
              }, {
                title: '%',
                key: 'fwtdcBfb',
                align: 'center',
              }, {
                title: '其他',
                key: 'qtCount',
                align: 'center',
              }, {
                title: '%',
                key: 'qtBfb',
                align: 'center',
              }, {
                title: '安全方面',
                key: 'aqfmCount',
                align: 'center',
              }, {
                title: '%',
                key: 'aqfmBfb',
                align: 'center',
              },
            ],
          },
          {
            title: '承办情况',
            key: 'qt',
            align: 'center',
            children:[
              {
                title: '已办结',
                key: 'ybjtshj',
                align: 'center',
              },
              {
                title: '未办结',
                key: 'wbjtshj',
                align: 'center',
              },
            ]
          },
        ],
        data13: [],
      }
    },
    methods: {
      getList:function () {
        this.$fetch(this.$url.kfxxtj, this.kfxxtj)
          .then(res => {
              //console.log(res)
            if(res.success===true){
              if(res.data.length==0){
                this.$Message.info('暂无数据');
                this.data13 = res.data
              }else {
                this.data13 = res.data
              }
            }
          })
      },
      search3:function () {
        if(this.kfxxtj.time===''){
          this.kfxxtj.time==''
          this.nian = ''
          this.yue  = ''
        }else {
          this.kfxxtj.time = this.$formatDate(this.kfxxtj.time).substring(0,7);
          this.nian = this.$formatDate(this.kfxxtj.time).substring(0,4)
          this.yue  = this.$formatDate(this.kfxxtj.time).substring(4,7)
        }
        this.getList()
      },
      daochu3:function () {
        if(this.kfxxtj.time===''){
          this.kfxxtj.time==''
        }else {
          this.kfxxtj.time = this.$formatDate(this.kfxxtj.time).substring(0,7);
        }
        this.$getExcel(process.env.BASE_URL + this.$url.kfxxtjExport + '?time=' + this.kfxxtj.time)
      }
    },
    mounted () {

    }
  }
</script>

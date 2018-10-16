<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
      <Form :model="formItem4" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search4" v-has="'jjzbwcqk_bsi_chaxun'">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="daochu4" v-has="'jjzbwcqk_bsi_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.formItem4.nian}}年{{this.formItem4.yue}}月公交合计经济情况汇总
    </div>
    <Table :columns="columns14" :data="data14" border height="500" style="margin-top: 0px;" size="small"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem4: {
          nian: '',
          yue: ''
        },
        time:'',
        columns14: [
          {
            title: '单位/名称',
            key: 'mc',
            align: 'center',
            fixed: 'left',
          },
          {
            title: '计算单位',
            key: 'jldw',
            align: 'center',
            fixed: 'left',
          },
          {
            title: '公交合计',
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jhSum',
                align: 'center',
              }, {
                title: '实际',
                key: 'sjSum',
                align: 'center',
              }, {
                title: '±%',
                key: 'zzlAvg',
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntqSum',
                align: 'center',
              }
            ]
          }
        ],
        data14:[],
      }
    },
    methods: {
      getList:function () {
        this.$fetch(this.$url.gjhjList, this.formItem4)
          .then(res => {
            //console.log(res.data);
            if (res.success === true) {
              this.data14= res.data
            } else {
              this.$Message.error('获取数据失败, 请重试!');
            }
          })
      },
      search4: function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem4.nian = year;
          this.formItem4.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem4.nian = nian
          this.formItem4.yue = yue
        }
        this.getList()
      },
      daochu4:function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem4.nian = year;
          this.formItem4.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem4.nian = nian
          this.formItem4.yue = yue
        }
        this.$getExcel(process.env.BASE_URL+this.$url.gjhjDaochu+'?nian='+this.formItem4.nian+'&yue='+this.formItem4.yue);
      }
    },
    mounted () {
      let date = new Date;
      let year = (date.getFullYear()).toString();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.formItem4.nian = year;
      this.formItem4.yue = month
    }
  }
</script>

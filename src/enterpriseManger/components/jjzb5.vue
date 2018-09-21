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
      <Form :model="formItem5" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search5" v-has="'jjzbwcqk_bwu_chaxun'">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="daochu5" v-has="'jjzbwcqk_bwu_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns15" :data="data15" border height="500" style="margin-top: 10px;" size="small"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem5: {
          nian: '',
          yue: ''
        },
        time:'',
        columns15: [
          {
            title: '名称',
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
            title: '长客总公司',
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh',
                align: 'center',
              }, {
                title: '实际',
                key: 'sj',
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl',
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq',
                align: 'center',
              }
            ]
          }
        ],
        data15: []
      }
    },
    methods: {
      getList:function () {
        this.$fetch(this.$url.ckgsList, this.formItem5)
          .then(res => {
            //console.log(res.data);
            if (res.success === true) {
               this.data15 = res.data
            } else {
              this.$Message.error('获取数据失败, 请重试!');
            }
          })
      },
      search5: function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem5.nian = year;
          this.formItem5.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem5.nian = nian
          this.formItem5.yue = yue
        }
        //console.log(this.formItem5)
        this.getList()
      },
      daochu5:function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem5.nian = year;
          this.formItem5.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem5.nian = nian
          this.formItem5.yue = yue
        }
        //console.log(this.formItem5.nian)
        //console.log(this.formItem5.yue)
        this.$getExcel(process.env.BASE_URL+this.$url.ckgsDaochu+'?nian='+this.formItem5.nian+'&yue='+this.formItem5.yue);
      }
    },
    mounted () {
      let date = new Date;
      let year = (date.getFullYear()).toString();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.formItem5.nian = year;
      this.formItem5.yue = month
    }
  }
</script>

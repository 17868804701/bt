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
      <Form :model="formItem3" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" v-has="'jjzbwcqk_bsan_search'" @click="search3">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" v-has="'jjzbwcqk_bsan_daochu'" @click="daochu3">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns13" :data="data13" border height="500" style="margin-top: 10px;" size="small"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem3:{
            nian:'',
            yue:''
        },
        time:'',
        columns13: [
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            fixed: 'left',
          },
          {
            title: '利润（万元）',
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'krJh',
                align: 'center',
              }, {
                title: '实际',
                key: 'lrSj',
                align: 'center',
              }, {
                title: '±%',
                key: 'lrZzl',
                align: 'center',
              }
            ]
          },
          {
            title: '得分率',
            key: 'mc',
            align: 'center',
            children: [
              {
                title: '本月',
                key: 'dflBy',
                align: 'center',
              },
              {
                title: '月平均得分',
                key: 'ypjdf',
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
        this.$fetch(this.$url.yejikaoheList, this.formItem3)
          .then(res => {
            //console.log(res.data);
            if (res.success === true) {
              this.data13= res.data
            } else {
              this.$Message.error('获取数据失败, 请重试!');
            }
          })
      },
      search3: function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem3.nian = year;
          this.formItem3.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem3.nian = nian
          this.formItem3.yue = yue
        }
        this.getList()
      },
      daochu3:function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem3.nian = year;
          this.formItem3.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem3.nian = nian
          this.formItem3.yue = yue
        }
        this.$getExcel(process.env.BASE_URL+this.$url.yejikaoheDaochu+'?nian='+this.formItem3.nian+'&yue='+this.formItem3.yue);
      },
    },
    mounted () {
      let date = new Date;
      let year = (date.getFullYear()).toString();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.formItem3.nian = year;
      this.formItem3.yue = month
    }
  }
</script>

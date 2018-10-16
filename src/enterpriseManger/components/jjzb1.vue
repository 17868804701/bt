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
      <Form :model="formItem1" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search1" v-has="'jjzbwcqk_by_search'">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="daochu1" v-has="'jjzbwcqk_by_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.formItem1.nian}}年{{this.formItem1.yue}}月各公司经济指标情况
    </div>
    <Table :columns="columns11" :data="data11" border height="500" style="margin-top: 0px;" size="small"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem1: {
          nian: '',
          yue: ''
        },
        time:'',
        columns11: [
          {
            title: '单位/名称',
            key: 'mc',
            width: 150,
            align: 'center',
            fixed: 'left',
          },
          {
            title: '计算单位',
            key: 'jldw',
            width: 90,
            align: 'center',
            fixed: 'left',
          },
          {
            title: '公交一公司',
            width: 150,
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh1',
                width: 100,
                align: 'center',
              }, {
                title: '实际',
                key: 'sj1',
                width: 100,
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl1',
                width: 100,
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq1',
                width: 100,
                align: 'center',
              },
            ]
          },
          {
            title: '公交二公司',
            width: 150,
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh2',
                width: 100,
                align: 'center',
              }, {
                title: '实际',
                key: 'sj2',
                width: 100,
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl2',
                width: 100,
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq2',
                width: 100,
                align: 'center',
              },
            ]
          }
          ,
          {
            title: '公交三公司',
            width: 150,
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh3',
                width: 100,
                align: 'center',
              }, {
                title: '实际',
                key: 'sj3',
                width: 100,
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl3',
                width: 100,
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq3',
                width: 100,
                align: 'center',
              },
            ]
          },
          {
            title: '公交四公司',
            width: 150,
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh4',
                width: 100,
                align: 'center',
              }, {
                title: '实际',
                key: 'sj4',
                width: 100,
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl4',
                width: 100,
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq4',
                width: 100,
                align: 'center',
              },
            ]
          },
          {
            title: '公交五公司',
            width: 150,
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh5',
                width: 100,
                align: 'center',
              }, {
                title: '实际',
                key: 'sj5',
                width: 100,
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl5',
                width: 100,
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq5',
                width: 100,
                align: 'center',
              },
            ]
          },
          {
            title: '公交六公司',
            width: 150,
            align: 'center',
            children: [
              {
                title: '计划',
                key: 'jh6',
                width: 100,
                align: 'center',
              }, {
                title: '实际',
                key: 'sj6',
                width: 100,
                align: 'center',
              }, {
                title: '±%',
                key: 'zzl6',
                width: 100,
                align: 'center',
              }, {
                title: '上年同期',
                key: 'sntq6',
                width: 100,
                align: 'center',
              },
            ]
          }
        ],
        data11: [],
      }
    },
    methods: {
      getList:function () {
        this.$fetch(this.$url.gjfgsList, this.formItem1)
          .then(res => {
            console.log(res.data);
            if (res.success === true) {
              this.data11= res.data
            } else {
              this.$Message.error('获取数据失败, 请重试!');
            }
          })
      },
      search1: function () {
          if(this.time===''){
            let date = new Date;
            let year = (date.getFullYear()).toString();
            let month = (date.getMonth() + 1).toString();
            month = (month < 10 ? "0" + month : month);
            this.formItem1.nian = year;
            this.formItem1.yue = month
          }else {
            let nian = this.$formatDate(this.time).substring(0, 4)
            let yue = this.$formatDate(this.time).substring(5, 7)
            this.formItem1.nian = nian
            this.formItem1.yue = yue
          }

          this.getList()
      },
      daochu1:function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem1.nian = year;
          this.formItem1.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem1.nian = nian
          this.formItem1.yue = yue
        }
        this.$getExcel(process.env.BASE_URL+this.$url.gjfgsDaochu+'?nian='+this.formItem1.nian+'&yue='+this.formItem1.yue);
      },
    },
    mounted () {
      let date = new Date;
      let year = (date.getFullYear()).toString();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.formItem1.nian = year;
      this.formItem1.yue = month
    }
  }
</script>

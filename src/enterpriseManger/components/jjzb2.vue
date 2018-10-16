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
      <Form :model="formItem2" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search2" v-has="'jjzbwcqk_ber_search'">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="daochu2" v-has="'jjzbwcqk_ber_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.formItem2.nian}}年{{this.formItem2.yue}}月修理公司经济指标情况
    </div>
    <Table :columns="columns12" :data="data12" border height="500" style="margin-top: 0px;" size="small"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem2: {
          nian: '',
          yue: ''
        },
        time:'',
        columns12: [
          {
            title: '单位/指标名称',
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
            title: '修理公司',
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
              },
            ]
          }
        ],
        data12: [],
      }
    },
    methods: {
      getList:function () {
        this.$fetch(this.$url.xlgsList, this.formItem2)
          .then(res => {
            //console.log(res.data);
            if (res.success === true) {
              this.data12= res.data
            } else {
              this.$Message.error('获取数据失败, 请重试!');
            }
          })
      },
      search2: function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem2.nian = year;
          this.formItem2.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem2.nian = nian
          this.formItem2.yue = yue
        }
        this.getList()
      },
      daochu2:function () {
        if(this.time===''){
          let date = new Date;
          let year = (date.getFullYear()).toString();
          let month = (date.getMonth() + 1).toString();
          month = (month < 10 ? "0" + month : month);
          this.formItem2.nian = year;
          this.formItem2.yue = month
        }else {
          let nian = this.$formatDate(this.time).substring(0, 4)
          let yue = this.$formatDate(this.time).substring(5, 7)
          this.formItem2.nian = nian
          this.formItem2.yue = yue
        }
        this.$getExcel(process.env.BASE_URL+this.$url.xlgsDaochu+'?nian='+this.formItem2.nian+'&yue='+this.formItem2.yue);
      },
    },
    mounted () {
      let date = new Date;
      let year = (date.getFullYear()).toString();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.formItem2.nian = year;
      this.formItem2.yue = month
    }
  }
</script>

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
          <Button type="primary" icon="plus" class="search_btn" @click="add_jjzb">添加</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" v-has="'jjzbwcqk_bsan_daochu'" @click="daochu3">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.formItem3.nian}}年{{this.formItem3.yue}}月各单位经营业绩星级考核结果
    </div>
    <Table :columns="columns13" :data="data13" border height="500" style="margin-top:0px;" size="small"></Table>

    <Modal
      v-model="add"
      title="添加经济指标"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="save_jjzb">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="单位" prop="dws">
          <CommonSelect type="EJGS" :selectValue="formItem.dws" style="width: 195px;"></CommonSelect>
        </FormItem>
        <FormItem label="年月">
          <DatePicker type="date" placeholder="选择时间" v-model="formItem.time"></DatePicker>
        </FormItem>
        <FormItem label="实际">
          <Input v-model="formItem.sj" placeholder="实际"></Input>
        </FormItem>
        <FormItem label="计划">
          <Input v-model="formItem.jh" placeholder="计划"></Input>
        </FormItem>
      </Form>
    </Modal>


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
        add:false,
        formItem: {
          dw: '',
          dws: '',
          time: '',
          mc: '',
          nd: '',
          yf: '',
          sj: '',
          jh: ''
        },
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
      add_jjzb() {
        this.add = true
      },
      clean(){
        this.formItem.dw = '',
          this.formItem.time = '',
          this.formItem.mc = '',
          this.formItem.nf = '',
          this.formItem.yf = '',
          this.formItem.sj = '',
          this.formItem.jh = ''
      },
      cancel() {
        this.clean()
        this.add = false
        this.getList()
      },
      save_jjzb() {
        console.log(this.formItem)
        this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem.dws];
        this.formItem.nd = this.$formatDate(this.formItem.time).substring(0, 4)
        this.formItem.yf = this.$formatDate(this.formItem.time).substring(5, 7)
        this.$post(this.$url.updateJjzbFgs, this.formItem)
          .then(res => {
            console.log(res);
            if (res.success === true) {
              this.$Message.success('添加成功');
              this.cancel()
            } else {
              this.$Message.error('添加失败');
              this.cancel()
            }
          })
      },
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

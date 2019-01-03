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
          <Button type="primary" icon="plus" class="search_btn" @click="add_jjzb">添加</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="daochu5" v-has="'jjzbwcqk_bwu_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.formItem5.nian}}年{{this.formItem5.yue}}月长客总公司经济指标情况
    </div>
    <Table :columns="columns15" :data="data15" border height="500" style="margin-top: 0px;" size="small"></Table>

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
        <FormItem label="名称">
          <Select v-model="formItem.mc">
            <Option v-for="(item,index) in data15" :value="item.mc" :key="index">{{item.mc}}</Option>
          </Select>
        </FormItem>
        <FormItem label="年月">
          <DatePicker type="month" placeholder="选择时间" v-model="formItem.time"></DatePicker>
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
          dw: '长客公司',
          time: '',
          mc: '',
          nd: '',
          yf: '',
          sj: '',
          jh: ''
        },
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
        this.formItem.nd = this.$formatDate(this.formItem.time).substring(0, 4)
        this.formItem.dw = '长客公司'
        this.formItem.yf = this.$formatDate(this.formItem.time).substring(5, 7)
        this.$post(this.$url.updateJjzbFgs,this.formItem)
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

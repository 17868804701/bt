<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container h2 {
    margin-left: 15px;
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
</style>
<template>
  <div>
    <Card style="padding-left: 15px;">
      <Form :model="formItem" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0 0 0px 0">
            <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="formItem.date"
                        class="text_width"></DatePicker>
          </FormItem>
          <!--<FormItem label="时间范围" style="margin: 0 0 0px 0">-->
          <!--<DatePicker type="daterange" placeholder="选择时间" :transfer="true" v-model="formItem.dateRange"-->
          <!--class="text_width"></DatePicker>-->
          <!--</FormItem>-->
          <FormItem label="车自编号" style="margin: 0 0 0px 0">
            <Input v-model="formItem.zbh" placeholder="车自编号" class="text_width"/>
          </FormItem>
          <FormItem label="车牌号" style="margin: 0 0 0px 0">
            <Input v-model="formItem.cph" placeholder="车牌号" class="text_width"/>
          </FormItem>
        </div>
        <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
          <ButtonGroup>
            <Button type="primary" @click="search_yf" style="margin-right: 3px;">
              <Icon type="search" v-has="'jcfyjs_yjcfy_search'"></Icon>
              搜索
            </Button>
            <Button type="primary" @click="yjcfydc" icon="android-download" v-has="'jcfyjs_yjcfy_daochu'">导出</Button>
          </ButtonGroup>
        </div>
      </Form>
    </Card>
    <Table :columns="columns1" :data="data1" size="small" border style="margin-top: 10px;">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px;">{{time}}检测费用结算</span>
      </div>
    </Table>
    <Page :total="totalCount" show-total style="margin-top: 10px;" @on-change="setpPage"></Page>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  export default {
    data () {
      return {
        modal1: false,
        modal2: false,
        time:'',
        totalCount: 1,
        formItem: {
          dateRange: '',
          cph: '',
          date: '',
          zbh: '',
          currPage: 1,
          pageSize: 10
        },
        columns1: [
          {
            title: '自编号',
            key: 'zbh'
          },
          {
            title: '检测时间',
            key: 'bcjcrq'
          },
          {
            title: '牌照号',
            key: 'cph'
          },
          {
            title: '80L钢瓶支数',
            key: 'bz',
            align: 'center',
            children: [
              {
                title: '支数',
                key: 'count80'
              }, {
                title: '单价',
                key: 'dj80'
              }, {
                title: '金额',
                key: 'amount80'
              },
            ]
          },
          {
            title: '120L钢瓶支数',
            key: 'bz',
            align: 'center',
            children: [
              {
                title: '支数',
                key: 'count120'
              }, {
                title: '单价',
                key: 'dj120'
              }, {
                title: '金额',
                key: 'amount120'
              },
            ]
          },
          {
            title: '合计',
            align: 'center',
            children: [
              {
                title: '总支数',
                key: 'allCount'
              }, {
                title: '金额',
                key: 'allAmount'
              },
            ]
          }
        ],
        data1: [],
      }
    },
    methods: {
//        月检测费用导出
      yjcfydc: function () {
        if(this.formItem.date == '' ){
          this.formItem.date=''
        }else {
          this.formItem.date = this.$formatDate(this.formItem.date).substring(0,7)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.yjcfydc + '?date=' + this.formItem.date + '&cph=' + this.formItem.cph + '&zbh=' + this.formItem.zbh)
      },
      search_yf: function () {
        if(this.formItem.date===''){
              this.time = ''
        }else {
          this.time = this.$formatDate(this.formItem.date).substring(0,7)
        }
        this.getList()
      },
      setpPage: function (current) {
        this.formItem.currPage = current
        this.getList();
      },
      getList: function () {
          if(this.formItem.date == '' ){
              this.formItem.date=''
          }else {
              this.formItem.date = this.$formatDate(this.formItem.date).substring(0,7)
          }
        this.$fetch(this.$url.yfjcfyjs, this.formItem)
          .then(res => {
            console.log(res, '月检测费用结算');
            if (res.msg === 'success') {
              if (res.page.totalCount === 0) {
                this.$Message.info('暂无信息')
                res.page.list.forEach(item => {
                  item.bcjcrq = this.$formatDate(item.bcjcrq).substring(0, 10)
                });
                this.data1 = res.page.list
                this.totalCount = res.page.totalCount
              } else {
                res.page.list.forEach(item => {
                  item.bcjcrq = this.$formatDate(item.bcjcrq).substring(0, 10)
                });
                this.data1 = res.page.list
                this.totalCount = res.page.totalCount
              }
            }
          });
      },
    },
    mounted () {

    }
  }
</script>

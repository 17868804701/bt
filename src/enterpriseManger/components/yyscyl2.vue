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
    width: 100px;
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
            <DatePicker type="year" placeholder="选择时间" :transfer="true" v-model="formItem2.nian"
                        class="text_width" style="width: 170px;"></DatePicker>
          </FormItem>
          <FormItem label="选择季度" style="margin: 0">
            <Select v-model="formItem2.jidu" :transfer="true" style="width: 170px;">
              <Option value="">全部</Option>
              <Option value="1">第一季度</Option>
              <Option value="2">第二季度</Option>
              <Option value="3">第三季度</Option>
              <Option value="4">第四季度</Option>
            </Select>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="getList" v-has="'yyscysyl_kylyzsrhz_search'">查询</Button>
          <Button type="primary" icon="plus" class="search_btn" @click="add_yszl" v-has="'yyscysyl_kylyzsrhz_search'">添加数据</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" v-has="'yyscysyl_kylyzsrhz_daochu'" @click="daochu">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns12" :data="data12" border height="500" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px;">{{nian }}{{jidu}}客运量与总收入季度汇总</span>
      </div>
    </Table>



    <!--添加-->
    <Modal
      v-model="add_ys"
      title="添加数据"
      width="350"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="save_yszl">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="formItem" :label-width="80">
        <FormItem label="单位">
          <Select v-model="formItem.dw" :transfer="true" style="width: 195px;">
            <Option value="公交一公司">公交一公司</Option>
            <Option value="公交二公司">公交二公司</Option>
            <Option value="公交三公司">公交三公司</Option>
            <Option value="公交四公司">公交四公司</Option>
            <Option value="公交五公司">公交五公司</Option>
            <Option value="公交六公司">公交六公司</Option>
          </Select>
        </FormItem>
        <FormItem label="年月">
          <DatePicker type="month" placeholder="选择时间" v-model="formItem.time" style="width: 195px"></DatePicker>
        </FormItem>
        <FormItem label="客运量">
          <Input v-model="formItem.kyl_ttbc" placeholder="团体包车客运量" style="width: 195px"></Input>
        </FormItem>
        <FormItem label="收入">
          <Input v-model="formItem.sr_ttbc" placeholder="团体包车收入" style="width: 195px"></Input>
        </FormItem>
      </Form>
    </Modal>



  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentTab: 'name1',
        add_ys:false,
        nian: '',
        jidu: '',
        formItem: {
          time: '',
          dw:'',
          kyl_ttbc:'',
          sr_ttbc:'',
          nd:'',
          yf:''
        },
        formItem2: {
          nian: '',
          jidu: '',
        },
        columns12: [
          {
            title: '单位',
            key: 'dw',
            width: 150,
            align: 'center',
          },
          {
            title: '客运量（人次）',
            key: 'dw',
            width: 150,
            align: 'center',
            children: [
              {
                title: '投币人次',
                key: 'kylTbrc',
                width: 150,
                align: 'center',
              }, {
                title: '团体包车',
                key: 'zsrTtbcsr',
                width: 150,
                align: 'center',
              }, {
                title: '鹿城通IC卡人次',
                key: 'kylLccick',
                width: 150,
                align: 'center',
              }, {
                title: '员工IC卡人次',
                key: 'kylYgick',
                width: 150,
                align: 'center',
              }, {
                title: '敬老卡人次',
                key: 'kylJlk',
                width: 150,
                align: 'center',
              }, {
                title: '其他IC卡人次',
                key: 'kylQtick',
                width: 150,
                align: 'center',
              }, {
                title: '月票IC卡人次',
                key: 'kylYpick',
                width: 150,
                align: 'center',
              }, {
                title: '乘客人次合计',
                key: 'kylCkrchj',
                width: 150,
                align: 'center',
              },
            ]
          },
          {
            title: '总收入',
            width: 150,
            align: 'center',
            children: [
              {
                title: '投币收入',
                key: 'zsrTbsr',
                width: 150,
                align: 'center',
              }, {
                title: '团体包车收入',
                key: 'zsrTtbcsr',
                width: 150,
                align: 'center',
              }, {
                title: '鹿城通IC卡收入',
                key: 'zsrLcticksr',
                width: 150,
                align: 'center',
              }, {
                title: 'IC卡补贴收入',
                key: 'zsrIckbtsr',
                width: 150,
                align: 'center',
              }, {
                title: '月票IC卡收入小计',
                key: 'zsrSrxj',
                width: 150,
                align: 'center',
              }, {
                title: '收入总计',
                key: 'zsrSrzj',
                width: 150,
                align: 'center',
              },
            ],
          }
        ],
        data12: [],
      }
    },
    methods: {
      add_yszl() {
        this.add_ys = true
      },
      clean(){
          this.formItem.time = '',
          this.formItem.kyl_ttbc = '',
          this.formItem.sr_ttbc = '',
          this.formItem.yf = '',
          this.formItem.dw = '',
          this.formItem.nd = ''
      },
      cancel() {
        this.clean()
        this.add_ys = false
        this.getList()
      },
      save_yszl() {
        this.formItem.nd = this.$formatDate(this.formItem.time).substring(0, 4)
        this.formItem.yf = this.$formatDate(this.formItem.time).substring(5, 7)
        this.$post(`${this.$url.insertTtbc}?dw=${this.formItem.dw}&nd=${this.formItem.nd}&yf=${this.formItem.yf}&kyl_ttbc=${this.formItem.kyl_ttbc}&sr_ttbc=${this.formItem.sr_ttbc}`)
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
      getList() {
        if (this.formItem2.nian === '') {
          this.formItem2.nian = ''
        } else {
          this.formItem2.nian = this.$formatDate(this.formItem2.nian).substring(0, 4)
        }

        this.nian = this.formItem2.nian
        if(this.formItem2.jidu === '1'){
          this.jidu = '年第一季度'
        }else if(this.formItem2.jidu === '2'){
          this.jidu = '年第二季度'
        }else if(this.formItem2.jidu === '3'){
          this.jidu = '年第三季度'
        }else if(this.formItem2.jidu === '4'){
          this.jidu = '年第四季度'
        }else {
          this.jidu = ''
        }

        this.$fetch(this.$url.qygl_yyscyszl_kylyzsr, this.formItem2)
          .then(res => {
            if (res.success === true) {
              if (res.data.length === 0) {
                this.$Message.info('暂无数据')
                console.log(res);
                console.log(res.data);
                this.data12 = res.data
              } else {
                console.log(res);
                console.log(res.data);
                this.data12 = res.data
              }
            } else {
              this.$Message.info('查询失败')
            }
          })
      },
      daochu(){
        if (this.formItem2.nian === '') {
          this.formItem2.nian = ''
        } else {
          this.formItem2.nian = this.$formatDate(this.formItem2.nian).substring(0, 4)
        }
        this.$getExcel(this.$url.qygl_yyscyszl_kylyzsr_export+'?nian='+this.formItem2.nian+'&jidu='+this.formItem2.jidu )
      }
    },
    mounted () {

    }
  }
</script>

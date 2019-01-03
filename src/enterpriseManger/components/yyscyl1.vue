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
      <Form :model="formItem1" :label-width="80">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker
              type="year"
              placeholder="选择时间"
              :transfer="true"
              v-model="formItem1.nian"
              style="width:170px;"
            ></DatePicker>
          </FormItem>
          <FormItem label="选择季度" style="margin: 0">
            <Select v-model="formItem1.jidu" :transfer="true" style="width: 170px;">
              <Option value="">全部</Option>
              <Option value="1">第一季度</Option>
              <Option value="2">第二季度</Option>
              <Option value="3">第三季度</Option>
              <Option value="4">第四季度</Option>
            </Select>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="getList"
                  v-has="'yyscysyl_cclcjdhz_search'">查询
          </Button>
          <Button type="primary" icon="plus" class="search_btn" @click="add_yszl1" v-has="'yyscysyl_cclcjdhz_search'">
            新增数据
          </Button>
          <div class="btn">
            <Button type="primary" icon="android-download" v-has="'yyscysyl_cclcjdhz_daochu'" @click="daochu">导出Excel
            </Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns11" :data="data10" border height="500" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px;">{{nian }}{{jidu}}车次里程耗油季度汇总</span>
      </div>
    </Table>


    <!--添加-->
    <Modal
      v-model="add_ys"
      title="添加数据"
      width="350px"
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
          <DatePicker type="month" placeholder="选择时间" v-model="formItem.time" style="width: 195px;"></DatePicker>
        </FormItem>
        <FormItem label="运营车日">
          <Input v-model="formItem.yycr" placeholder="运营车日" style="width: 195px;"></Input>
        </FormItem>
        <FormItem label="战场车日">
          <Input v-model="formItem.zccr" placeholder="战场车日" style="width: 195px;"></Input>
        </FormItem>
        <FormItem label="定额油耗">
          <Input v-model="formItem.dey" placeholder="定额油耗" style="width: 195px;"></Input>
        </FormItem>
        <FormItem label="实耗油">
          <Input v-model="formItem.shy" placeholder="实耗油" style="width: 195px;"></Input>
        </FormItem>
      </Form>
    </Modal>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        add_ys: false,
        currentTab: 'name1',
        nian: '',
        jidu: '',
        formItem: {
          dw: '',
          time: '',
          yycr: '',
          zccr: '',
          nd: '',
          yf: '',
          dey: '',
          shy: ''
        },
        formItem1: {
          nian: '',
          jidu: '',
        },
        columns11: [
          {
            title: '单位',
            key: 'dw',
            width: 150,
            align: 'center',
          }, {
            title: '运营车数',
            key: 'yycx',
            width: 150,
            align: 'center',
          }, {
            title: '月日历数',
            key: 'yrls',
            width: 150,
            align: 'center',
          }, {
            title: '运营车日',
            key: 'yycr',
            width: 150,
            align: 'center',
          }, {
            title: '占场车日',
            key: 'zccr',
            width: 150,
            align: 'center',
          }, {
            title: '完好车日',
            key: 'whcr',
            width: 150,
            align: 'center',
          }, {
            title: '工作车日',
            key: 'gzcr',
            width: 150,
            align: 'center',
          }, {
            title: '完好车率',
            key: 'whcl',
            width: 150,
            align: 'center',
          }, {
            title: '工作车率',
            key: 'gzcl',
            width: 150,
            align: 'center',
          }, {
            title: '行车次数',
            key: 'xccs',
            width: 150,
            align: 'center',
          }, {
            title: '行驶里程',
            key: 'xclc',
            width: 150,
            align: 'center',
          }, {
            title: '非营业里程',
            key: 'fyylc',
            width: 150,
            align: 'center',
          }, {
            title: '实耗油',
            key: 'shy',
            width: 150,
            align: 'center',
          }, {
            title: '定额油',
            key: 'dey',
            width: 150,
            align: 'center',
          }, {
            title: '较定额节超',
            key: 'zdejc',
            width: 150,
            align: 'center',
          }, {
            title: '百公里实耗',
            key: 'bglsh',
            width: 150,
            align: 'center',
          }
        ],
        data10: [],
      }
    },
    methods: {
      add_yszl1() {
        this.add_ys = true
      },

      clean() {
          this.formItem.time = '',
          this.formItem.yycr = '',
          this.formItem.zccr = '',
          this.formItem.yf = '',
          this.formItem.nd = '',
          this.formItem.dw = '',
          this.formItem.dey = '',
          this.formItem.shy = ''
      },
      cancel() {
        this.clean()
        this.add_ys = false
        this.getList()
      },
      save_yszl() {
        this.formItem.nd = this.$formatDate(this.formItem.time).substring(0, 4)
        this.formItem.yf = this.$formatDate(this.formItem.time).substring(5, 7)
        this.$post(this.$url.insertCclchy1, this.formItem)
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
        if (this.formItem1.nian === '') {
          this.formItem1.nian = ''
        } else {
          this.formItem1.nian = this.$formatDate(this.formItem1.nian).substring(0, 4)
        }

        this.nian = this.formItem1.nian
        if (this.formItem1.jidu === '1') {
          this.jidu = '年第一季度'
        } else if (this.formItem1.jidu === '2') {
          this.jidu = '年第二季度'
        } else if (this.formItem1.jidu === '3') {
          this.jidu = '年第三季度'
        } else if (this.formItem1.jidu === '4') {
          this.jidu = '年第四季度'
        } else {
          this.jidu = ''
        }

        this.$fetch(this.$url.qygl_yyscyszl_cclchyJDFX, this.formItem1)
          .then(res => {
            if (res.success === true) {
              if (res.data.length === 0) {
                this.$Message.info('暂无数据')
                console.log(res);
                console.log(res.data);
                this.data10 = res.data
              } else {
                console.log(res);
                console.log(res.data);
                this.data10 = res.data
              }
            } else {
              this.$Message.info('查询失败')
            }

          })
      },
      daochu() {
        if (this.formItem1.nian === '') {
          this.formItem1.nian = ''
        } else {
          this.formItem1.nian = this.$formatDate(this.formItem1.nian).substring(0, 4)
        }
        this.$getExcel(this.$url.qygl_yyscyszl_cclchyJDFX_export + '?nian=' + this.formItem1.nian + '&jidu=' + this.formItem1.jidu)
      }
    },
    mounted() {

    }
  }
</script>

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
          <div class="btn">
            <Button type="primary" icon="android-download" v-has="'yyscysyl_cclcjdhz_daochu'" @click="daochu">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <Table :columns="columns11" :data="data10" border height="500" style="margin-top: 10px;" size="small">
      <div slot="header" style="text-align: center">
        <span style="font-size: 16px;">{{nian }}{{jidu}}车次里程耗油季度汇总</span>
      </div>
    </Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentTab: 'name1',
        nian: '',
        jidu: '',
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
            key: 'yycxSum',
            width: 150,
            align: 'center',
          }, {
            title: '月日历数',
            key: 'yrlsAvg',
            width: 150,
            align: 'center',
          }, {
            title: '运营车日',
            key: 'yycrSum',
            width: 150,
            align: 'center',
          }, {
            title: '占场车日',
            key: 'zccrSum',
            width: 150,
            align: 'center',
          }, {
            title: '完好车日',
            key: 'whcrSum',
            width: 150,
            align: 'center',
          }, {
            title: '工作车日',
            key: 'gzcrSum',
            width: 150,
            align: 'center',
          }, {
            title: '完好车率',
            key: 'whclAvg',
            width: 150,
            align: 'center',
          }, {
            title: '工作车率',
            key: 'gzclAvg',
            width: 150,
            align: 'center',
          }, {
            title: '行车次数',
            key: 'xccsSum',
            width: 150,
            align: 'center',
          }, {
            title: '行驶里程',
            key: 'xclcSum',
            width: 150,
            align: 'center',
          }, {
            title: '非营业里程',
            key: 'fyylcSum',
            width: 150,
            align: 'center',
          }, {
            title: '实耗油',
            key: 'shySum',
            width: 150,
            align: 'center',
          }, {
            title: '定额油',
            key: 'deySum',
            width: 150,
            align: 'center',
          }, {
            title: '较定额节超',
            key: 'zdejcSum',
            width: 150,
            align: 'center',
          }, {
            title: '百公里实耗',
            key: 'bglshSum',
            width: 150,
            align: 'center',
          }
        ],
        data10: [],
      }
    },
    methods: {
      getList() {
        if (this.formItem1.nian === '') {
          this.formItem1.nian = ''
        } else {
          this.formItem1.nian = this.$formatDate(this.formItem1.nian).substring(0, 4)
        }

        this.nian = this.formItem1.nian
        if(this.formItem1.jidu === '1'){
          this.jidu = '年第一季度'
        }else if(this.formItem1.jidu === '2'){
          this.jidu = '年第二季度'
        }else if(this.formItem1.jidu === '3'){
          this.jidu = '年第三季度'
        }else if(this.formItem1.jidu === '4'){
          this.jidu = '年第四季度'
        }else {
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
      daochu(){
        if (this.formItem1.nian === '') {
          this.formItem1.nian = ''
        } else {
          this.formItem1.nian = this.$formatDate(this.formItem1.nian).substring(0, 4)
        }
        this.$getExcel(this.$url.qygl_yyscyszl_cclchyJDFX_export+'?nian='+this.formItem1.nian+'&jidu='+this.formItem1.jidu )
      }
    },
    mounted () {

    }
  }
</script>

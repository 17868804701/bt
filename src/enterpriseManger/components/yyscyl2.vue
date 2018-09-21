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
          <Button type="primary" icon="ios-search" class="search_btn" @click="getList"
                  v-has="'yyscysyl_kylyzsrhz_search'">查询
          </Button>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentTab: 'name1',
        nian: '',
        jidu: '',
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
                key: 'kylTbrcSum',
                width: 150,
                align: 'center',
              }, {
                title: '团体包车',
                key: 'zsrTtbcsrSum',
                width: 150,
                align: 'center',
              }, {
                title: '鹿城通IC卡人次',
                key: 'kylLccickSum',
                width: 150,
                align: 'center',
              }, {
                title: '员工IC卡人次',
                key: 'kylYgickSum',
                width: 150,
                align: 'center',
              }, {
                title: '敬老卡人次',
                key: 'kylJlkSum',
                width: 150,
                align: 'center',
              }, {
                title: '其他IC卡人次',
                key: 'kylQtickSum',
                width: 150,
                align: 'center',
              }, {
                title: '月票IC卡人次',
                key: 'kylYpickSum',
                width: 150,
                align: 'center',
              }, {
                title: '乘客人次合计',
                key: 'kylCkrchjSum',
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
                key: 'zsrTbsrSum',
                width: 150,
                align: 'center',
              }, {
                title: '团体包车收入',
                key: 'zsrTtbcsrSum',
                width: 150,
                align: 'center',
              }, {
                title: '鹿城通IC卡收入',
                key: 'zsrLcticksr',
                width: 150,
                align: 'center',
              }, {
                title: 'IC卡补贴收入',
                key: 'zsrIckbtsrSum',
                width: 150,
                align: 'center',
              }, {
                title: '月票IC卡收入小计',
                key: 'zsrSrxjSum',
                width: 150,
                align: 'center',
              }, {
                title: '收入总计',
                key: 'zsrSrzjSum',
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

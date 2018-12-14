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
      <Form :model="formItem" :label-width="80">
        <div class="search">
          <FormItem label="选择年份" style="margin: 0">
            <DatePicker type="year" placeholder="选择时间" :transfer="true" v-model="formItem.jtgsDate"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="getList" v-has="'ccxlsrtz_jtgs_search'">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="exportJTGSExcel" v-has="'ccxlsrtz_jtgs_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="display: flex;justify-content: space-between">
      <span style="margin-top: 10px;">指标名称：线路收入、车次（集团公司）</span>
      <span style="margin-top: 10px;">{{jtgsND}}年</span>
    </div>
    <Table :columns="columns1" :data="jtgsTableData" border height="560" style="margin-top: 10px;" size="small"></Table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        jtgsTableData: [],
        jtgsND: '',
        formItem: {
          select: '公交一公司',
          fgsDate: this.initDate(),
          jtgsDate: this.initDate(),
        },
        columns1: [
          {
            title: '项目/月别',
            key: 'title',
            align: 'center',
            fixed: 'left',
          },
          {
            title: '客运量（人次）',
            key: 'jldw',
            align: 'center',
            children:[
              {
                title: '本年普票',
                key: 'ky_bnpp',
                align: 'center',
              },       {
                title: '月票',
                key: 'ky_bnyp',
                align: 'center',
              },       {
                title: '敬老卡人次',
                key: 'ky_bnjlk',
                align: 'center',
              },
              {
                title: '本年IC卡',
                key: 'ky_bnick',
                align: 'center',
              },
              {
                title: '本年小计',
                key: 'ky_bnxj',
                align: 'center',
              },
              {
                title: '上年同期',
                key: 'ky_qn',
                align: 'center',
              },
              {
                title: '±%',
                key: 'ky_zzl',
                align: 'center',
              },
            ]
          },
          {
            title: '普票收入（元）',
            align: 'center',
            children: [
              {
                title: '本年普票',
                key: 'sr_bnpp',
                align: 'center',
              },
              {
                title: '本年IC卡优惠后金额',
                key: 'sr_bnickyh',
                align: 'center',
              },
              {
                title: '本年IC卡补贴',
                key: 'sr_bnickbt',
                align: 'center',
              },
              {
                title: '本年小计',
                key: 'sr_bnxj',
                align: 'center',
              },
              {
                title: '上年同期',
                key: 'sr_qn',
                align: 'center',
              },
              {
                title: '±%',
                key: 'sr_zzl',
                align: 'center',
              },
            ]
          },
          {
            title: '行驶车次（次）',
            align: 'center',
            children: [
              {
                title: '本年',
                key: 'xscc_bn',
                align: 'center',
              },
              {
                title: '上年同期',
                key: 'xscc_qn',
                align: 'center',
              },
              {
                title: '±%',
                key: 'xscc_zzl',
                align: 'center',
              }
            ]
          },
        ],
      }
    },
    methods: {
      initDate() {
        let now = new Date();
        this.jtgsND = now.getFullYear();
        this.fgsND = now.getFullYear();
        return now;
      },
      getList() {
        let params = {};
        if (this.formItem.jtgsDate === null || this.formItem.jtgsDate === '') {
          params.nd = '';
          this.$Message.error('请先选择年份!');
          return;
        }else{
          params.nd = this.formItem.jtgsDate.getFullYear();
        }
        console.log(params);
        this.$fetch(this.$url.qygl_ccxlsrtz_jtgs, params)
        .then(res => {
          console.log(res);
          this.jtgsND = params.nd;
          if (res.success === true) {
            this.jtgsTableData = res.data;
            if (res.data.length > 0) {
              let obj = res.data[0];

            }
          }else{
            this.$Message.error('获取数据失败, 请重试!');
          }
        })
      },
      exportJTGSExcel() {
        if (this.formItem.jtgsDate === null || this.formItem.jtgsDate === '') {
          this.$Message.error('请先选择年份!');
          return;
        }
        let url = this.$url.qygl_ccxlsrtz_jtgs_export + '?nd=' + this.formItem.fgsDate.getFullYear();
        this.$getExcel(url);
      },
    },
    mounted () {
    }
  }
</script>


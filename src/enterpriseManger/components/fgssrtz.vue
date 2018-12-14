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
            <DatePicker type="year" placeholder="选择时间" :transfer="true" v-model="formItem.fgsDate"
                        class="text_width"></DatePicker>
          </FormItem>
          <FormItem label="单位" style="margin: 0" prop="select">
            <!--<Select v-model="formItem.select" style="width: 120px;">-->
              <!--<Option value="公交一公司">公交一公司</Option>-->
              <!--<Option value="公交二公司">公交二公司</Option>-->
              <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--<Option value="公交四公司">公交四公司</Option>-->
            <!--</Select>-->
            <CommonSelect type="EJGS" :selectValue="formItem.select" style="width: 195px;"></CommonSelect>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="getList" v-has="'ccxlsrtz_fgs_search'">查询</Button>
          <div class="btn">
            <Button type="primary" icon="android-download" @click="exportFGSExcel" v-has="'ccxlsrtz_fgs_daochu'">导出Excel</Button>
          </div>
        </div>
      </Form>
    </Card>
    <div style="display: flex;justify-content: space-between">
      <span style="margin-top: 10px;">指标名称：线路收入、车次（{{formItem.select}}）</span>
      <span style="margin-top: 10px;">{{fgsND}}年</span>
    </div>
    <Table :columns="columns2" :data="fgsTableData" border height="560" style="margin-top: 10px;" size="small"></Table>
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
        fgsTableData: [],
        fgsND: '',
        formItem: {
          select: 'YGS',
          fgsDate: this.initDate(),
          jtgsDate: this.initDate(),
        },
        columns2: [
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
              },
              {
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
        let gs = this.$store.state.dictData.parseDict.EJGS[this.formItem.select];
        if (this.formItem.fgsDate === null || this.formItem.fgsDate === '') {
          params.nd = '';
          this.$Message.error('请先选择年份!');
          return;
        }else{
          params.nd = this.formItem.fgsDate.getFullYear();
        }
        params.dw = gs;
        console.log(params);
        this.$fetch(this.$url.qygl_ccxlsrtz_fgs, params)
        .then(res => {
          console.log(res);
          this.fgsND = params.nd;
          if (res.success === true) {
            this.fgsTableData = res.data;
            if (res.data.length > 0) {
              let obj = res.data[0];
            }
          }else{
            this.$Message.error('获取数据失败, 请重试!');
          }
        })
      },
      exportFGSExcel() {
        if (this.formItem.fgsDate === null || this.formItem.fgsDate === '') {
          this.$Message.error('请先选择年份!');
          return;
        }
        let gs = this.$store.state.dictData.parseDict.EJGS[this.formItem.select];
        let url = this.$url.qygl_ccxlsrtz_fgs_export + '?nd=' + this.formItem.fgsDate.getFullYear() + '&dw=' + gs;
        this.$getExcel(url);
      }
    },
    mounted () {
    }
  }
</script>


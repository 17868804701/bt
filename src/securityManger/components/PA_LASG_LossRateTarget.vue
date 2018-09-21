<!--安全生产情况分析-->
<template>
  <div >
    <Card>
      <Form :model="formItem" :label-width="80">
        <div style="display: flex;align-items: center">
          <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end" v-model="formItem.tab6Date"></DatePicker>
          <CheckboxGroup v-model="formItem.tab6Select" style="margin-left: 20px;">
            <Checkbox label="1">第一季度</Checkbox>
            <Checkbox label="2">第二季度</Checkbox>
            <Checkbox label="3">第三季度</Checkbox>
            <Checkbox label="4">第四季度</Checkbox>
          </CheckboxGroup>
          <Button type="primary" icon="ios-search" @click="requestListData" v-has="'aqscqkfx_lasgjslzb_search'">搜索</Button>
          <Button type="primary" icon="android-download" style="position: absolute;right: 10px" @click="exportExcel" v-has="'aqscqkfx_lasgjslzb_export'">导出excel</Button>
        </div>
      </Form>
    </Card>
    <Table border style="margin-top: 10px;" :data="PA_LASG_LossRateTarget_Data" :columns="PA_LASG_LossRateTarget">
      <div slot="header" style="height: 50px;font-size: 18px;text-align: center">
        {{tableTitle}}
      </div>
    </Table>
  </div>
</template>

<script>
  import PATableData from '../views/PATableData.js';
  import QuarterQuery from './QuarterQuery.vue';
  import * as DateTool from '../../../utils/DateTool'
  export default {
    components: {
      QuarterQuery
    },
    data () {
      return {
        exportURL: this.$url.security_AQQKFX_exportExcel,
        formItem: {
          tab6Date: this.initDate(),
          tab6Select: ['1'],
        },
        tableTitle: '',
        PA_LASG_LossRateTarget: [],
        PA_LASG_LossRateTarget_Data: [],
      }
    },
    computed: {
    },
    methods: {
      initDate() {
        let now = new Date();
        return now;
      },
      getTableTitle() {
        let year = this.formItem.tab6Date.getFullYear();
        let jiduArray = [];
        this.formItem.tab6Select.forEach(item => {
          if (item === '1') {
            jiduArray.push('一');
          } else if (item === '2') {
            jiduArray.push('二');
          } else if (item === '3') {
            jiduArray.push('三');
          } else {
            jiduArray.push('四');
          }
        })
        let jiduStr = jiduArray.join('、');
        let title = year+'年第'+jiduStr+'季度立案事故经损率指标完成情况';
        this.tableTitle = title;
      },
      getData () {
          //立案事故经损率指标完成情况
          this.PA_LASG_LossRateTarget = PATableData.PA_LASG_LossRateTarget;
      },
      requestListData() {
        let params = this.getParams();
        params.jidus = params.jidus.join(',');
        this.getTableTitle();
        let that = this;
        let url = this.$url.security_AQSCFGS_list + '?year=' + params.year + '&jidus=' + params.jidus;
        this.$fetch(url)
        .then(res => {
          debugger;
          if (res.success === true) {
            that.PA_LASG_LossRateTarget_Data = res.data;
          }
        });
      },
      exportExcel() {
        console.log('导出数据');
        let params = this.getParams();
        let year = params.year;
        let url = params.exportURL;
        let jidus = params.jidus;
        url = url + '?year=' + year + '&jidus=' + jidus;
        this.$getExcel(url);
      },
      getParams() {
        let params = {
          jidus: '',
          year: '',
          exportURL: ''
        };
        params.jidus = this.formItem.tab6Select;
        params.year = this.formItem.tab6Date.getFullYear();
        this.exportURL = this.$url.security_LASGJSLZB_exportExcel;
        params.exportURL = this.exportURL;
        return params;
      },
    },
    mounted () {
      this.getTableTitle();
    },
    created () {
      this.getData();
    }
  }
</script>









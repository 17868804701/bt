<!--安全生产情况分析-->
<template>
  <div >
    <Card>
      <Form :model="formItem" :label-width="80">
        <div style="display: flex;align-items: center">
          <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end" v-model="formItem.tab8Date"></DatePicker>
          <CheckboxGroup v-model="formItem.tab8Select" style="margin-left: 20px;">
            <Checkbox label="1">第一季度</Checkbox>
            <Checkbox label="2">第二季度</Checkbox>
            <Checkbox label="3">第三季度</Checkbox>
            <Checkbox label="4">第四季度</Checkbox>
          </CheckboxGroup>
          <Button type="primary" icon="ios-search" @click="requestListData" v-has="'aqscqkfx_dwtbjqxjpfqk_search'">搜索</Button>
          <Button type="primary" icon="plus" style="position: absolute;right: 100px;" @click="addModal = true" >新增</Button>
          <Button type="primary" icon="android-download" style="position: absolute;right: 10px" @click="exportExcel" v-has="'aqscqkfx_dwtbjqxjpfqk_export'">导出</Button>
        </div>
      </Form>
    </Card>
    <Table border style="margin-top: 10px;" :data="PA_Insure_Paid_Data" :columns="PA_Insure_Paid">
      <div slot="header" style="height: 50px;font-size: 18px;text-align: center">
        {{tableTitle}}
      </div>
    </Table>
    <Modal
      v-model="addModal"
      title="新增对外投保及赔付情况"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="saveDWTB('addItem')">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="addModal = false">取消</Button>
      </div>
      <div style="padding: 0px; height: 100%;">
        <Form :model="addItem" ref="addItem" :rules="ruleValidate" :label-width="100">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="单位:" style="margin-bottom: 0px" prop="dw">
              <CommonSelect type="EJGS" :selectValue="addItem.dw" style="width: 135px;"></CommonSelect>
            </FormItem>
            <FormItem prop="date" label="年份月份:" style="margin-top: 0px;">
              <DatePicker
                style="width: 140px;"
                type="month"
                placeholder="选择时间"
                :transfer="true"
                placement="bottom-end"
                v-model="addItem.date">
              </DatePicker>
            </FormItem>
            <FormItem label="对外投保事件:">
              <InputNumber v-model="addItem.dwtbSj" style="width: 135px;"></InputNumber>
            </FormItem>
            <FormItem label="对外投保回赔额:">
              <InputNumber v-model="addItem.dwtbHpe" style="width: 135px;"></InputNumber>
            </FormItem>
            <FormItem label="车辆保险及安检回赔额:">
              <InputNumber v-model="addItem.clbxHpe" style="width: 135px;"></InputNumber>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
  import PATableData from '../views/PATableData.js';
  import QuarterQuery from './QuarterQuery.vue';
  import * as DateTool from '../../../utils/DateTool'
  import CommonSelect from '../../components/common/CommonSelect.vue'

  export default {
    components: {
      QuarterQuery,
      CommonSelect
    },
    data () {
      return {
        exportURL: this.$url.security_AQQKFX_exportExcel,
        formItem: {
          tab8Date: this.initDate(),
          tab8Select: ['1'],
        },
        tableTitle: '',
        PA_Insure_Paid: [],
        PA_Insure_Paid_Data: [],
        addItem: {
          dw: '',
          date: '',
          clbxHpe: 0,
          dwtbHpe: 0,
          dwtbSj: 0,
        },
        addModal: false,
        ruleValidate: {
          dw: [
            { required: true, message: '此项不能为空', trigger: 'blur' }
          ],
          date: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ]
        }
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
        let year = this.formItem.tab8Date.getFullYear();
        let jiduArray = [];
        this.formItem.tab8Select.forEach(item => {
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
        let title = year+'年第'+jiduStr+'季度对外投保交强险及赔付情况';
        this.tableTitle = title;
      },
      getData () {
          //对外投保交强险及赔付情况
          this.PA_Insure_Paid = PATableData.PA_Insure_Paid;
      },
      requestListData() {
        let params = this.getParams();
        params.jidus = params.jidus.join(',');
        this.getTableTitle();
        let allDict = this.$store.state.dictData.parseDict;
        let that = this;
        let url = this.$url.security_AQSCFGS_list + '?year=' + params.year + '&jidus=' + params.jidus;
        this.$fetch(url)
        .then(res => {
          if (res.success === true) {
//          	debugger
//            res.data.forEach(item => {
//              item.dw = allDict.EJGS[item.dw];
//            })
            that.PA_Insure_Paid_Data = res.data
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
        params.jidus = this.formItem.tab8Select;
        params.year = this.formItem.tab8Date.getFullYear();
        this.exportURL = this.$url.security_DWTBJQXJPF_exportExcel;
        params.exportURL = this.exportURL;
        return params;
      },
      saveDWTB(name) {
        this.$refs[name].validate(valid=>{
          if (valid) {
            this.requestDWTB();
          }else{
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      requestDWTB() {
        let params = {
          clbxHpe: this.addItem.ajBhg,
          dwtbHpe: this.addItem.ajJctc,
          dwtbSj: this.addItem.dwtbSj,
          dw: this.addItem.dw,
          nf: this.addItem.date.getFullYear(),
          yf: this.addItem.date.getMonth()+1,
        };

        this.$post(this.$url.security_SCQKFX_add, params)
        .then(res => {
          if (res.success === true) {
          	this.addModal = false;
            this.addItem = {
                dw: '',
                date: '',
                clbxHpe: 0,
                dwtbHpe: 0,
                dwtbSj: 0,
            }
          }else{
          	this.$Message.error('添加出错!');
          }
        })
      }
    },
    mounted () {
      this.getTableTitle();
    },
    created () {
      this.getData();
    }
  }
</script>






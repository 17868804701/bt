<!--添加立案事故登记-->
<template>
  <div style="height:auto">
    <Form ref="addAccident" :model="formValidate" :rules="ruleValidate" :label-width="150">

      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <FormItem label="事故性质">
          <div style="width: 120px">{{SGXZ}}</div>
        </FormItem>
        <FormItem label="事故总损失(元)">
          <div style="width: 120px">{{SGZSS}}</div>
        </FormItem>
        <FormItem label="公积金定损金额合计(元)">
          <div style="width: 120px">{{GJJHJ}}</div>
        </FormItem>
        <FormItem prop="sgsx" label="事故属性">
          <CommonSelect iviewType="checkbox" type="SGSX" :selectValue="formValidate.sgsx" ></CommonSelect>
        </FormItem>
        <FormItem prop="xczrsgfl" label="行车责任">
          <CommonSelect type="XCSGZRFL" :selectValue="formValidate.xczrsgfl" style="width: 120px;"></CommonSelect>
        </FormItem>
        <FormItem prop="jafy" label="结案费用">
          <Input v-model="formValidate.jafy" placeholder="结案费用..." style="width: 120px"></Input>
        </FormItem>
      </div>

      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <FormItem prop="lasj" label="立案时间">
          <DatePicker v-model="formValidate.lasj" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
        </FormItem>
        <FormItem prop="larq" label="立案日期">
          <DatePicker v-model="formValidate.larq" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
        </FormItem>
        <FormItem prop="dw" label="登记单位">
          <CommonSelect type="EJGS" :selectValue="formValidate.dw" style="width: 120px;" @selectChange="selectDwChange"></CommonSelect>
        </FormItem>
        <FormItem prop="zbh" label="自编号">
          <Select v-model="formValidate.zbh" filterable @on-change="selectCLItem" style="width: 120px;" placeholder="请选择">
            <Option v-for="(item, index) in dwCLArray" :value="item.zbh" :key="index">{{ item.zbh }}</Option>
          </Select>
        </FormItem>
        <FormItem label="牌照">
          <div style="width: 120px">
            {{formValidate.pz}}
          </div>
        </FormItem>
        <FormItem label="路别">
          <div style="width: 120px">
            {{formValidate.lb}}
          </div>
        </FormItem>
        <FormItem prop="jsyxm" label="驾驶员姓名">
          <Input v-model="formValidate.jsyxm" placeholder="驾驶员姓名..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="dd" label="地点">
          <Input v-model="formValidate.dd" placeholder="地点..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="lalx" label="立案状态">
          <div style="width: 120px">{{formValidate.lalx}}</div>
        </FormItem>
        <FormItem prop="bar" label="报案人">
          <Input v-model="formValidate.bar" placeholder="报案人..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="kcr" label="勘察人">
          <Input v-model="formValidate.kcr" placeholder="勘察人..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="qsrs" label="轻伤人数">
          <Input v-model="formValidate.qsrs" placeholder="轻伤人数..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="zsrs" label="重伤人数">
          <Input v-model="formValidate.zsrs" placeholder="重伤人数..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="swrs" label="死亡人数">
          <Input v-model="formValidate.swrs" placeholder="死亡人数..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="kf" label="扣分">
          <Input v-model="formValidate.kf" placeholder="扣分..." style="width: 120px"></Input>
        </FormItem>
      </div>

      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <FormItem prop="gjjcs" label="公积金车损">
          <Input v-model="formValidate.gjjcs" placeholder="公积金车损..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="gjjcn" label="公积金车内">
          <Input v-model="formValidate.gjjcn" placeholder="公积金车内..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="gjjsz" label="公积金三者">
          <Input v-model="formValidate.gjjsz" placeholder="公积金三者..." style="width: 120px"></Input>
        </FormItem>
        <FormItem prop="jqxss" label="交强险损失">
          <Input v-model="formValidate.jqxss" placeholder="交强险损失..." style="width: 120px"></Input>
        </FormItem>
      </div>

      <FormItem prop="bz" label="备注">
        <Input style="width: 50%" v-model="formValidate.bz" type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入说明备注..."></Input>
      </FormItem>

    </Form>
  </div>
</template>

<script>
  import CommonSelect from '../../components/common/CommonSelect.vue';
  export default {
    name: 'AddAccidentDiv',
    props: {
      formValidate: {
        lasj: String,
        larq: String,
        dw: String,
        pz: String,
        dd: String,
        lalx: String,
        zbh: String,
        jsyxm: String,
        lb: String,
        bar: String,
        kcr: String,
        sgsx: Array,
        sgxz: String,
        kf: String,
        bz: String,
        qsrs: String,
        zsrs: String,
        ssrs: String,
        gjjcs: String,
        gjjcn: String,
        gjjsz: String,
        gjjhj: String,
        jqxss: String,
        sgzss: String,
        zr: String,
        jafy: String,
        xczrsgfl: String,
      },
    },
    components: {
      CommonSelect,
    },
    data () {
      return {
        ruleValidate: {
          dw: [
            {required: true, message: '此项不能为空', trigger: 'change'},
          ],
          xczrsgfl: [
            { required: true, message: '此项不能为空', trigger: 'blur' }
          ],
          pz: [
            { required: true, message: '此项不能为空', trigger: 'blur' },
          ],
          dd: [
            { required: true, message: '此项不能为空', trigger: 'blur' },
          ],
          lb: [
            { required: true, message: '此项不能为空', trigger: 'blur' }
          ],
          zbh: [
            { required: true, message: '此项不能为空', trigger: 'blur' }
          ],
          lasj: [
            { required: true, message: '此项不能为空', trigger: 'blur',type: 'date' }
          ],
          larq: [
            { required: true, message: '此项不能为空', trigger: 'blur',type: 'date' }
          ],
          jsyxm: [
            { required: true, message: '此项不能为空', trigger: 'blur' }
          ],
          sgsx: [
            { required: true, type: 'array', min: 1, message: '请至少选择一个', trigger: 'change' },
          ],
          zr: [
            { required: true, message: '此项不能为空', trigger: 'blur', }
          ]
        },
        dwCLArray: [],
      }
    },
    methods: {
      checkSGSX() {
        console.log('选择了事故属性');
      },
      selectCLItem(value) {
        let cl = this.$store.state.dictData.CLDict[value];
        this.$emit('selectCL', cl);
      },
      selectDwChange() {
        let params = {
          dw: this.formValidate.dw
        };
        this.$store.state.dictData.allDict.EJGS.forEach(item => {
        	if (item.code === this.formValidate.dw) {
            params.dw = item.groupname;
          }
        })
        let that = this;
        this.$fetch(this.$url.getZbhByDw, params)
        .then(res => {
          if (res.success === true) {
          	that.dwCLArray = [];
          	res.data.forEach(item => {
          		that.dwCLArray.push(item);
            })
          }
        })
      }
//      validateDW(rule, value, callback) {
//        debugger;
//
//        callback(new Error('自定义验证规则'));
//      },
    },
    computed: {
      GJJHJ() {
        return Number(this.formValidate.gjjcs)+Number(this.formValidate.gjjcn)+Number(this.formValidate.gjjsz);
      },
      SGZSS() {
        return Number(this.formValidate.gjjcs)+Number(this.formValidate.gjjcn)+Number(this.formValidate.gjjsz)+Number(this.formValidate.jqxss);
      },
      SGXZ() {
        let qsrs = Number(this.formValidate.qsrs);
        let zsrs = Number(this.formValidate.zsrs);
        let swrs = Number(this.formValidate.swrs);
        let sgzss = Number(this.formValidate.gjjcs)+Number(this.formValidate.gjjcn)+Number(this.formValidate.gjjsz)+Number(this.formValidate.jqxss);
        let result = '';

        if (sgzss >= 10000 && sgzss < 50000 && qsrs > 0 && qsrs <= 3) {
          result = '三级轻微事故';
        }

        if (sgzss >= 50000 && sgzss < 300000 && qsrs > 3 && qsrs <= 10) {
          result = '二级轻微事故';
        }

        if (sgzss >= 300000 && sgzss < 500000 && qsrs > 10 && qsrs <= 50) {
          result = '三级轻微事故';
        }

        if ((zsrs > 0 && zsrs <= 10) || (swrs > 0 && swrs <= 3) || (sgzss >= 500000 && sgzss <10000000)) {
          result = '一般事故';
        }

        if ((zsrs > 10 && zsrs <= 50) || (swrs > 3 && swrs <= 10) || (sgzss >= 10000000 && sgzss <50000000)) {
          result = '较大事故';
        }

        if ((zsrs > 50 && zsrs <= 100) || (swrs > 10 && swrs <= 30) || (sgzss >= 50000000 && sgzss <100000000)) {
          result = '重大事故';
        }

        if (zsrs > 100 || swrs > 30 || sgzss >= 100000000) {
          result = '特别重大事故';
        }

        console.log(result);
        return result;
      },

    },
    mounted () {

    }
  }
</script>

<style>
</style>

<!--单位、牌照、自编号、路别、立案时间（年月日）、地点、驾驶员姓名、报案人、事故属性（分为交强、车损、车内、三者）、事故性质（分为特大事故、重大事故、较大事故、一般事故、一级轻微、二级轻微、三极轻微）、立案日期、勘查人、立案（分为立案、私了、销案）、估损（包括公积金车损、公积金车内、公积金三者、公积金定损金额合计、交强险损失、事故总损失）、责任、备注-->
<!--单位、牌照、自编号、路别、时间、地点、姓名、报案人、事故属性、事故性质、立案日期、勘查人、立案、估损、责任、备注-->
<template>
  <div style="padding: 20px; height: 100%;">
    <h2>
      事故详情
      <router-link to="/ARList">
        <Button type="primary" size="small" style="margin-right: 10px;"><<返回列表页</Button>
      </router-link>
    </h2>

    <Card style="margin-top: 20px;">
      <p slot="title" >
        车辆事故基本信息
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" @click="changeType">{{editText}}</Button>
      <Button v-if="isEdit" slot="extra" type="success" size="small" style="margin-right: 10px;" icon="checkmark" @click="updateData">保存</Button>

      <Form ref="updateDiv" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
          <FormItem prop="larq" label="立案日期:">
            <div style="width: 120px">{{formValidate.larq}}</div>
          </FormItem>

          <FormItem prop="lasj" label="立案时间:">
            <div style="width: 120px">{{formValidate.lasj}}</div>
          </FormItem>

          <FormItem label="事故性质:">
            <div style="width: 120px">{{SGXZTitle}}</div>
          </FormItem>

          <FormItem label="事故总损失(元):">
            <div style="width: 120px">{{formValidate.sgzss}}</div>
          </FormItem>

          <FormItem label="公积金定损金额合计(元):">
            <div style="width: 120px">{{formValidate.gjjhj}}</div>
          </FormItem>

          <FormItem prop="sgsx" label="事故属性:">
            <CommonSelect v-if="isEdit" iviewType="checkbox" type="SGSX" :selectValue="formValidate.sgsx"></CommonSelect>
            <div style="width: 120px;" v-else>{{sgsxString}}</div>
          </FormItem>

          <FormItem prop="xczrsgfl" label="行车责任:">
            <CommonSelect v-if="isEdit" type="XCSGZRFL" :selectValue="formValidate.xczrsgfl"></CommonSelect>
            <div style="width: 120px;" v-else>{{xcsgzrflString}}</div>
          </FormItem>

          <FormItem prop="jafy" label="结案费用:">
            <Input v-if="isEdit" v-model="formValidate.jafy" placeholder="结案费用..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.jafy}}</div>
          </FormItem>

        </div>

        <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">

          <FormItem prop="dw" label="登记单位:">
            <CommonSelect v-if="isEdit" type="EJGS" :selectValue="formValidate.dw"></CommonSelect>
            <div style="width: 120px;" v-else>{{dwString}}</div>
          </FormItem>

          <FormItem prop="zbh" label="自编号:">
            <!--<Input v-if="isEdit" v-model="formValidate.zbh" placeholder="请输入车辆自编号..." style="width: 120px"></Input>-->
            <div style="width: 120px;">{{formValidate.zbh}}</div>
          </FormItem>

          <FormItem prop="pz" label="牌照:">
            <!--<Input v-if="isEdit" v-model="formValidate.pz" placeholder="请输入牌照..." style="width: 120px"></Input>-->
            <div style="width: 120px;">{{formValidate.pz}}</div>
          </FormItem>

          <FormItem prop="lb" label="路别:">
            <!--<Input v-if="isEdit" v-model="formValidate.lb" placeholder="请输入路别..." style="width: 120px"></Input>-->
            <div style="width: 120px;">{{formValidate.lb}}</div>
          </FormItem>

          <FormItem prop="jsyxm" label="驾驶员姓名:">
            <Input v-if="isEdit" v-model="formValidate.jsyxm" placeholder="驾驶员姓名..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.jsyxm}}</div>
          </FormItem>

          <FormItem prop="dd" label="地点:">
            <Input v-if="isEdit" v-model="formValidate.dd" placeholder="地点..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.dd}}</div>
          </FormItem>

          <FormItem prop="lalx" label="立案状态:">
            <CommonSelect v-if="isEdit" type="LALX" :selectValue="formValidate.lalx"></CommonSelect>
            <div style="width: 120px;" v-else>{{lalxString}}</div>
          </FormItem>

          <FormItem prop="bar" label="报案人:">
            <Input v-if="isEdit" v-model="formValidate.bar" placeholder="报案人..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.bar}}</div>
          </FormItem>

          <FormItem prop="kcr" label="勘察人:">
            <Input v-if="isEdit" v-model="formValidate.kcr" placeholder="勘察人..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.kcr}}</div>
          </FormItem>

          <FormItem prop="ssrs" label="轻伤人数:">
            <Input v-if="isEdit" v-model="formValidate.qsrs" placeholder="轻伤人数..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.qsrs}}</div>
          </FormItem>

          <FormItem prop="ssrs" label="重伤人数:">
            <Input v-if="isEdit" v-model="formValidate.zsrs" placeholder="重伤人数..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.zsrs}}</div>
          </FormItem>

          <FormItem prop="swrs" label="死亡人数:">
            <Input v-if="isEdit" v-model="formValidate.swrs" placeholder="死亡人数..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.swrs}}</div>
          </FormItem>

          <FormItem prop="kf" label="扣分:">
            <Input v-if="isEdit" v-model="formValidate.kf" placeholder="扣分..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.kf}}</div>
          </FormItem>

        </div>

        <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">

          <FormItem prop="gjjcs" label="公积金车损:">
            <Input v-if="isEdit" v-model="formValidate.gjjcs" placeholder="公积金车损..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.gjjcs}}</div>
          </FormItem>

          <FormItem prop="gjjcn" label="公积金车内:">
            <Input v-if="isEdit" v-model="formValidate.gjjcn" placeholder="公积金车内..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.gjjcn}}</div>
          </FormItem>

          <FormItem prop="gjjsz" label="公积金三者:">
            <Input v-if="isEdit" v-model="formValidate.gjjsz" placeholder="公积金三者..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.gjjsz}}</div>
          </FormItem>

          <FormItem prop="jqxss" label="交强险损失:">
            <Input v-if="isEdit" v-model="formValidate.jqxss" placeholder="交强险损失..." style="width: 120px"></Input>
            <div style="width: 120px;" v-else>{{formValidate.jqxss}}</div>
          </FormItem>

        </div>

        <FormItem prop="bz" label="备注:">
          <Input v-if="isEdit" style="width: 50%" v-model="formValidate.bz" type="textarea" :autosize="{minRows: 2,maxRows: 4}" placeholder="请输入说明备注..."></Input>
          <div style="width: 120px;" v-else>{{formValidate.bz}}</div>
        </FormItem>

      </Form>
    </Card>
    <ARAddLossList :tableData="lossListData" @update="updateLASGZJSHGList"/>
  </div>
</template>

<script>
  import * as DateTool from '../../../utils/DateTool';
  import ARAddLossList from '../components/ARAddLossList.vue';
  import CommonSelect from '../../components/common/CommonSelect.vue';
  export default {
    components: {
      ARAddLossList,
      CommonSelect,
    },
    data () {
      return {
        isEdit: false,
        formValidate: {
          dw: '',
          dd: '',
          pz: '',
          zbh: '',
          jsyxm: '',
          lb: '',
          lalx: '',
          bar: '',
          kcr: '',
          sgsx: [],
          sgxz: '',
          kf: '',
          bz: '',
          qsrs: 0,
          zsrs: 0,
          swrs: 0,
          gjjcs: 0,
          gjjcn: 0,
          gjjsz: 0,
          gjjhj: 0,
          jqxss: 0,
          sgzss: 0,
          zr: '责任',
          jafy: 0,
          xczrsgfl: '',
        },
        ruleValidate: {
          dw: [
            {required: true, message: '此项不能为空', trigger: 'change'}
          ],
          xczrsgfl: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          pz: [
            {required: true, message: '此项不能为空', trigger: 'blur'},
          ],
          dd: [
            {required: true, message: '此项不能为空', trigger: 'blur'},
          ],
          lalx: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          lb: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          zbh: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          jsyxm: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ],
          sgsx: [
            {required: true, type: 'array', min: 1, message: '请至少选择一个', trigger: 'change',},
          ],
          zr: [
            {required: true, message: '此项不能为空', trigger: 'blur'}
          ]
        },
        lossListData: [],
      }
    },
    methods: {
      initialData() {
        var params = {};
        for (let attr in this.$route.query.rowData) {
          params[attr] = this.$route.query.rowData[attr];
        }
        params.lasj = DateTool.timesToDate(params.lasj);
        params.larq = DateTool.timesToDate(params.larq);
        this.formValidate = params;
      },
      changeType() {
        if (this.isEdit) {
          this.initialData();
        }else{
          this.formValidate.sgsx = this.formValidate.sgsx.split('、');
        }
        this.isEdit = !this.isEdit;
      },
      // ********** network ********** //
      requestLASGZJSGListData() { // 立案事故追加信息列表
        let that = this;
        this.$fetch(this.$url.security_LASG_lossList, {ajid: this.$route.query.rowData.id})
        .then(res=>{
          if (res.success === true) {
            res.data.records.forEach(item => {
              item.zjgs = that.$store.state.dictData.parseDict.EJGS[item.zjgs];
            })
            this.lossListData = res.data.records;
          }
        })
      },
      updateLASGZJSHGList() {
        this.requestLASGZJSGListData();
      },
      updateData() {
        // 更新立案事故信息
        let params = {};
        for (let attr in this.formValidate) {
          params[attr] = this.formValidate[attr];
        }
        delete params._index;
        delete params._rowKey;
        params.sgsx = params.sgsx.join('、');
        params.sgxz = this.SGXZCode;
//        console.log(params);
        let that = this;
        this.$refs['updateDiv'].validate(valid=>{
          if (valid) {
            this.$post(this.$url.security_LASG_update, params)
            .then(res=>{
              if (res.success === true) {
                that.$Message.success('修改成功!');
                that.formValidate.sgsx = that.formValidate.sgsx.join('、');
                that.formValidate.sgxz = this.SGXZCode;
                that.isEdit = false;
              }else{
                that.$Message.error('修改失败, 请重试!');
              }
            })
          }else{
            that.$Message.error('请按照规则来修改更新信息!');
          }
        })
      },
    },
    computed: {
      sgsxString() {
        if (this.formValidate.sgsx.length > 0) {
//          debugger;
          let sgsxArray = this.formValidate.sgsx.split('、');
          let sgsxStrArray = [];
          let allDict = this.$store.state.dictData.parseDict;
          sgsxArray.forEach(item => {
            sgsxStrArray.push(allDict.SGSX[item]);
          })
          return sgsxStrArray.join('、');
        }else{
          return '';
        }
      },
      dwString() {
        let allDict = this.$store.state.dictData.parseDict;
        return (this.formValidate.dw.length > 0) ? allDict.EJGS[this.formValidate.dw] : '';
      },
      xcsgzrflString() {
        let allDict = this.$store.state.dictData.parseDict;
        return (this.formValidate.xczrsgfl.length > 0) ? allDict.XCSGZRFL[this.formValidate.xczrsgfl] : '';
      },
      lalxString() {
        let allDict = this.$store.state.dictData.parseDict;
        return (this.formValidate.lalx.length > 0) ? allDict.LALX[this.formValidate.lalx] : '';
      },
      editText() {
        if (!this.isEdit) {
          return '编辑';
        }else{
          return '取消';
        }
      },
      editIcon() {
        if (!this.isEdit) {
          return 'edit';
        }else{
          return 'close';
        }
      },
      SGXZTitle() {
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
        return result;
      },
      SGXZCode() {
        let qsrs = Number(this.formValidate.qsrs);
        let zsrs = Number(this.formValidate.zsrs);
        let swrs = Number(this.formValidate.swrs);
        let sgzss = Number(this.formValidate.gjjcs)+Number(this.formValidate.gjjcn)+Number(this.formValidate.gjjsz)+Number(this.formValidate.jqxss);
        let result = '';

        if (sgzss >= 10000 && sgzss < 50000 && qsrs > 0 && qsrs <= 3) {
          result = 'SJQW';
        }

        if (sgzss >= 50000 && sgzss < 300000 && qsrs > 3 && qsrs <= 10) {
          result = 'EJQW';
        }

        if (sgzss >= 300000 && sgzss < 500000 && qsrs > 10 && qsrs <= 50) {
          result = 'YJQW';
        }

        if ((zsrs > 0 && zsrs <= 10) || (swrs > 0 && swrs <= 3) || (sgzss >= 500000 && sgzss <10000000)) {
          result = 'YBSG';
        }

        if ((zsrs > 10 && zsrs <= 50) || (swrs > 3 && swrs <= 10) || (sgzss >= 10000000 && sgzss <50000000)) {
          result = 'JDSG';
        }

        if ((zsrs > 50 && zsrs <= 100) || (swrs > 10 && swrs <= 30) || (sgzss >= 50000000 && sgzss <100000000)) {
          result = 'ZDSG';
        }

        if (zsrs > 100 || swrs > 30 || sgzss >= 100000000) {
          result = 'TDSG';
        }
        return result;
      }
    },
    mounted () {
      this.initialData();
      this.requestLASGZJSGListData();
    }
  }
</script>

<style>
  .back {
    color: blue;
    position: absolute;
    margin-top: 4px;
    margin-left: 5px;
    cursor: pointer;
  }
</style>

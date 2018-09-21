<template>
  <div style="margin-top: 40px;">

    <!-- 发动机出厂技术记录 -->
    <Card  style="margin-top: 20px;">
      <p slot="title" >
        发动机出厂技术记录
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" :icon="fdjEditIcon" @click="editBtnClick">{{fdjEditText}}</Button>
      <Button v-if="fdjDataIsEdit" slot="extra" type="success" size="small" style="margin-right: 10px;" icon="checkmark" @click="saveFDJData">保存</Button>
      <div>
        <Form v-model="fdjccData" :label-width="150">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="发动机型号:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjccData.fdjxh" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjccData.fdjxh}}</div>
            </FormItem>
            <FormItem label="冷磨时间:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjccData.lmsj" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjccData.lmsj}}</div>
            </FormItem>
            <FormItem label="试热时间:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjccData.srsj" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjccData.srsj}}</div>
            </FormItem>
            <FormItem label="承修人:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjccData.cxr"></Input>
              <div v-else>{{fdjccData.cxr}}</div>
            </FormItem>
          </div>
        </Form>
        <Form v-model="fdjccData" :label-width="150">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="机油压力(怠速150r/min):" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjccData.jyds" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjccData.jyds}}MPa</div>
            </FormItem>
            <FormItem label="机油压力(中速2500r/min):" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjccData.jyzs" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjccData.jyzs}}MPa</div>
            </FormItem>
          </div>
        </Form>
      </div>
      <hr style="height:1px;border:none;border-top:1px solid lightgrey;margin-bottom: 5px; margin-top: 10px"/>
      <div style="margin-bottom: 50px;">
        <Button type="primary" size="small" icon="plus" @click="fdjqgModal=true">添加气缸压力数据</Button>
        <Table border style="margin-top: 10px;" :data="fdjqgylList" :columns="fdjqgylColumns"></Table>
      </div>
    </Card>
    <!--新增气缸压力-->
    <Modal
      v-model="fdjqgModal"
      title="气缸压力检测数据"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="addFDJ_QGYL_Data">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="canceAddFDJ_QGYL_Data">取消</Button>
      </div>
      <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
        <Form v-model="fdjqgylData" :label-width="150">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="气缸压力(怠速150r/min):" style="margin-top: 0px;">
              <Input v-model="fdjqgylData.qgyl_ds" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="气缸压力(中速2500r/min):" style="margin-top: 0px;">
              <Input v-model="fdjqgylData.qgyl_zs" style="width:120px;"></Input>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>

    <!-- 出厂合格证 -->
    <Card style="margin-top: 20px;">
      <p slot="title" >
        出厂合格登记
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" :icon="editIcon" @click="clickEditCCInfo">{{editText}}</Button>
      <Button v-if="ccDataIsEdit" slot="extra" type="success" size="small" style="margin-right: 10px;" icon="checkmark" @click="saveCCData">保存</Button>
      <Form v-model="ccData" :label-width="100">
        <div style="display: flex;flex-wrap: wrap;">
          <FormItem label="车辆自编号:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.clzbh" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.clzbh}}</div>
          </FormItem>
          <FormItem label="车型:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.cx" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.cx}}</div>
          </FormItem>
          <FormItem label="送修人:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.sxr" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.sxr}}</div>
          </FormItem>
          <FormItem label="检验员:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.jyy" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.jyy}}</div>
          </FormItem>
          <FormItem label="修别:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.xb" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.xb}}</div>
          </FormItem>
          <FormItem label="发动机:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.fdjdx" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.fdjdx}}</div>
          </FormItem>
          <FormItem label="承修公司:" style="margin-top: 0px;">
            <Input v-if="ccDataIsEdit" v-model="ccData.cxgs" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{ccData.cxgs}}</div>
          </FormItem>
          <FormItem label="出厂日期:" style="margin-top: 0px;">
            <DatePicker type="date" placeholder="选择月份"  :transfer="true" placement="bottom-end" v-if="ccDataIsEdit" v-model="ccData.ccrq"></DatePicker>
            <div style="width: 120px;" v-else>{{ccData.ccrq}}</div>
          </FormItem>
        </div>
      </Form>
      <Form v-model="ccData" :label-width="100">
        <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
          <FormItem label="出厂说明:" style="margin-top: 0px;">
            <Input style="width:300px;" v-if="ccDataIsEdit" v-model="ccData.ccsm" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入出厂说明..."></Input>
            <div style="width: 120px;" v-else>{{ccData.ccsm}}</div>
          </FormItem>
        </div>
      </Form>
    </Card>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  export default {
    name: 'AddMMStepThree',
    components: {
    },
    props: {
      sourceData: Object,
    },
    data () {
      return {
        isHaveFDJCC: false,
        fdjDataIsEdit: false,
        fdjccData: {
          id: "",
          byid: "",
          fdjxh: "", //发动机型号
          lmsj: "",  //冷磨时间
          srsj: "",  //试热时间
          cxr: "",   //承修人
          jyds: "0",  //机油压力 怠速
          jyzs: "0",  //机油压力 中速
          qgds: "",  //气缸压力 怠速
          qgzs: "",  //气缸压力 中速
          zhpd: ""   //综合评定
        },
        fdjqgylColumns: [
          {
            title: '气缸压力',
            align: 'center',
            children: [
              {
                title: '序号',
                type: 'index',
                align: 'center',
              },
              {
                title: '怠速150r/min',
                align: 'center',
                key: 'qgyl_ds',
              },
              {
                title: '中速2500r/min',
                align: 'center',
                key: 'qgyl_zs',
              },
            ]
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params, index) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteQGYL(params.index);
                    }
                  },
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    }
                  }, '删除')
                ])
              ]);
            }
          }
        ],
        fdjqgylList: [],
        fdjqgylData:{
          qgyl_ds: '',
          qgyl_zs: '',
        },
        fdjqgModal: false,

        ccData: {
          id: "82de0dcd408d486f8d3f16c338b736cf",
          clzbh: "",
          cx: "",
          sxr: "",
          jyy: "",
          xb: '',
          fdjdx: '',
          cxgs: '',
          ccrq: '',
          ccsm: '',
        },
        ccDataColumns: [
          {
            nameCode: 'ch',
            nameText: '车号:',
            value: '1-2188'
          },
          {
            nameCode: 'cx',
            nameText: '车型:',
            value: '中型客车'
          },
          {
            nameCode: 'xb',
            nameText: '修别:',
            value: '三养'
          },
          {
            nameCode: 'fdjdx',
            nameText: '发动机大修:',
            value: '是'
          },
          {
            nameCode: 'cxdw',
            nameText: '承修单位:',
            value: '修理公司'
          },
          {
            nameCode: 'ccrq',
            nameText: '出厂日期:',
            value: '2019-09-09'
          },
          {
            nameCode: 'jyy',
            nameText: '检验员:',
            value: '小黄'
          },
        ],
        ccDataIsEdit: false,
      }
    },
    computed: {
      editText() {
        if (!this.ccDataIsEdit) {
          return '编辑';
        }else{
          return '取消';
        }
      },
      editIcon() {
        if (!this.ccDataIsEdit) {
          return 'edit';
        }else{
          return 'close';
        }
      },
      formatCCRQ() {
        if (typeof this.ccData.ccrq === 'date'){
          return DateTool.yyyymmddFormatDate(this.ccData.ccrq);
        }else{
          return this.ccData.ccrq;
        }
      },
      fdjEditText() {
        if (!this.fdjDataIsEdit) {
          return '编辑';
        }else{
          return '取消';
        }
      },
      fdjEditIcon() {
        if (!this.fdjDataIsEdit) {
          return 'edit';
        }else{
          return 'close';
        }
      },
    },
    methods: {

      // *********  出厂合格证   ********** //
      clickEditCCInfo() { // 编辑出厂合格证
        console.log('点击了取消或者编辑');
        // 点击取消后还原数据
        if (this.ccDataIsEdit === true) {
          let clbyBasicData = this.sourceData.clby;
          for (let attr in clbyBasicData) {
            this.ccData[attr] = clbyBasicData[attr];
          }
          this.ccData.ccrq = DateTool.timesToDate(this.ccData.ccrq);
        }
        this.ccDataIsEdit = !this.ccDataIsEdit;

      },
      saveCCData() { // 保存修改出厂合格证
        console.log('保存信息');
        this.$post(this.$url.maintain_BYGL_CLBY_updateRecord, this.ccData)
        .then(res => {
          if (res.code === 0) {
            this.ccDataIsEdit = false;
            this.$Message.success('更新成功!');
            this.$emit('updateInfo');
          }else{
            this.$Message.error('更新失败, 请重试!');
          }
        })
      },
      // *********  出厂合格证   ********** //


      // *********  发动机出厂技术记录   ********** //
      editBtnClick() {
        if (!this.fdjDataIsEdit) {
          console.log('点击了编辑按钮');
        }else{
          console.log('点击了取消按钮');
          // 点击了取消, 即使修改了, 也需要把 双向绑定的数据 为初始的数据.
          let clbyFdjccData = this.sourceData.clbyFdjcc;
          for (let attr in this.fdjccData) {
            this.fdjccData[attr] = clbyFdjccData[attr];
          }
        }
        this.fdjDataIsEdit = !this.fdjDataIsEdit;
      },
      saveFDJData() { // 修改保存 发动机基本信息
        this.fdjDataIsEdit = false;
//        debugger;
        this.updateFDJCC_QGYL(this.fdjccData);
      },

      configureFDJ_QGYL_Data(data) {  // 根据源数据转换成json字符串
        let stringData = JSON.stringify(data);
        let params = {};
        for (let attr in this.fdjccData) {
          params[attr] = this.fdjccData[attr];
        }
        params.qgds = stringData;
        params.byid = this.sourceData.clby.id;
        return params;
      },
      deleteQGYL(index) {
        console.log(index);
        // 深拷贝数组
        let deepCopyData = JSON.parse(JSON.stringify(this.fdjqgylList));
        deepCopyData.splice(index, 1);
        let params = this.configureFDJ_QGYL_Data(deepCopyData);
        this.updateFDJCC_QGYL(params);
      },
      addFDJ_QGYL_Data() {
        // 深拷贝数据
        let deepCopyData = [];
        if (this.fdjqgylList !== null && this.fdjqgylList.length > 0) {
          deepCopyData = JSON.parse(JSON.stringify(this.fdjqgylList));
        }
        deepCopyData.push(this.fdjqgylData);
        let params = this.configureFDJ_QGYL_Data(deepCopyData);
        this.updateFDJCC_QGYL(params);
      },
      // 拿到修改后的参数去更新
      updateFDJCC_QGYL(params) {
        this.$post(this.$url.maintain_BYGL_CLBY_FDJCC_saveOrUpdate, params)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.fdjqgModal = false;
            this.fdjqgylData = {
              qgyl_ds: '',
              qgyl_zs: '',
            };
          }else{
            this.$Message.erro('保存失败, 请重试!');
          }
          this.$emit('updateInfo');
        })
      },
      canceAddFDJ_QGYL_Data() {
        this.fdjqgModal = false;
        this.fdjqgylData = {
          qgyl_ds: '',
          qgyl_zs: '',
        }
      },
      // *********  发动机出厂技术记录   ********** //


      // *********  初始化数据   ********** //
      configureData() {
        console.log(this.sourceData);
        let clbyFdjjcData = this.sourceData.clbyFdjjc;  // 发动机进场记录
        let clbyFdjccData = this.sourceData.clbyFdjcc;  // 发动机出场记录
        let clbyBasicData = this.sourceData.clby;       // 出厂合格证


        for (let attr in clbyBasicData) {
          this.ccData[attr] = clbyBasicData[attr];
        }
        this.ccData.ccrq = DateTool.timesToDate(this.ccData.ccrq);


        // 处理发动机出场技术记录数据   根据是否有发动进场的逻辑来判断是否有发动机出厂
        let tmpfdjData = {}; // 用来判断是否有发动机进场记录的object
        for (let attr in clbyFdjjcData) {
          tmpfdjData[attr] = clbyFdjjcData[attr];
        }
        for (let attr in clbyFdjccData) {
          this.fdjccData[attr] = clbyFdjccData[attr];
        }
        delete tmpfdjData['byid'];
        delete tmpfdjData['id'];
        delete tmpfdjData['jcsj'];

        for (let attr in tmpfdjData) {
          if(tmpfdjData[attr] !== null && tmpfdjData[attr] !== '') {
            this.isHaveFDJCC = true;
          }
        }

        if (this.isHaveFDJCC === true) {
          let fdjccqgylTmpData = this.fdjccData.qgds;
          let tmpArray = JSON.parse(fdjccqgylTmpData);
          this.fdjqgylList = JSON.parse(JSON.stringify(tmpArray));
          if (this.fdjqgylList === null || this.fdjqgylList.length <= 0) {
            this.fdjqgylList = [];
          }
        }

      }
      // *********  初始化数据   ********** //
    },
    mounted () {

    },
    watch: {
      sourceData(newData) {
        if (typeof newData.code !== undefined) {
          //          console.log('监听到数据发生改变并且有值, 处理数据!');
          this.configureData();
        }
      }
    }
  }
</script>

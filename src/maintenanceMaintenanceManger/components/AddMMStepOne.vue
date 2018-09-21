<!-- 进厂登记阶段-->
<template>
  <div>

    <!--发动机基本信息-->
    <Card style="margin-top: 20px;">
      <p slot="title" >
        车辆保养基本信息
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" :icon="editIcon" @click="clickEditBasicData">{{editText}}</Button>
      <Button v-if="basicDataIsEdit" slot="extra" type="success" size="small" style="margin-right: 10px;" icon="checkmark" @click="saveBasicData">保存</Button>
      <Form :model="basicData" :label-width="100">
        <div style="display: flex;flex-wrap: wrap;">
          <FormItem label="登记编号:" style="margin-top: 0px;">
            <Input v-if="basicDataIsEdit" v-model="basicData.djbh" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{basicData.djbh}}</div>
          </FormItem>
          <FormItem label="车辆自编号:" style="margin-top: 0px;">
            <Select v-if="basicDataIsEdit" v-model="basicData.clzbh" filterable @on-change="selectCLItem" style="width: 140px;" placeholder="请选择">
              <Option v-for="(item, index) in $store.state.dictData.CLArray" :value="item" :key="index">{{ item }}</Option>
            </Select>
            <div style="width: 120px;" v-else>{{basicData.clzbh}}</div>
          </FormItem>

          <FormItem label="车牌号:" style="margin-top: 0px;">
            <!--<Input v-if="basicDataIsEdit" v-model="basicData.cph" style="width:120px;"></Input>-->
            <div style="width: 120px;">{{basicData.cph}}</div>
          </FormItem>
          <FormItem label="车型:" style="margin-top: 0px;">
            <!--<Input v-if="basicDataIsEdit" v-model="basicData.cx" style="width:120px;"></Input>-->
            <div style="width: 120px;">{{basicData.cx}}</div>
          </FormItem>
          <FormItem label="线路:" style="margin-top: 0px;">
            <!--<Input v-if="basicDataIsEdit" v-model="basicData.xl" style="width:120px;"></Input>-->
            <div style="width: 120px;">{{basicData.xl}}</div>
          </FormItem>
          <FormItem label="分公司:" style="margin-top: 0px;">
            <!--<Input v-if="basicDataIsEdit" v-model="basicData.fgs" style="width:120px;"></Input>-->
            <div style="width: 120px;">{{basicData.fgs}}</div>
          </FormItem>
          <FormItem label="进厂时间:" style="margin-top: 0px;">
            <Input v-if="basicDataIsEdit" v-model="basicData.jcsj" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{basicData.jcsj}}</div>
          </FormItem>
          <FormItem label="送修人:" style="margin-top: 0px;">
            <Input v-if="basicDataIsEdit" v-model="basicData.sxr" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{basicData.sxr}}</div>
          </FormItem>
          <FormItem label="检验员:" style="margin-top: 0px;">
            <Input v-if="basicDataIsEdit" v-model="basicData.jyy" style="width:120px;"></Input>
            <div style="width: 120px;" v-else>{{basicData.jyy}}</div>
          </FormItem>
          <FormItem prop="bylb" label="保养类别:" style="margin-top: 0px;">
            <!--<Input v-if="basicDataIsEdit" v-model="basicData.bylb" style="width:120px;"></Input>-->
            <CommonSelect v-if="basicDataIsEdit" type="BYLB" iviewType="checkbox" :selectValue="basicData.bylb"></CommonSelect>
            <div style="width: 120px;" v-else>{{BYLBString}}</div>
          </FormItem>
        </div>

        <div style="display: flex;flex-wrap: wrap;">
          <FormItem label="是否有丢失件:" style="margin-top: 0px;" >
            <i-switch v-if="basicDataIsEdit" v-model="basicData.dsjSwitchValue">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            <div v-else>
              {{this.isHaveDSJ}}
            </div>
          </FormItem>
          <FormItem label="是否维修发动机:" style="margin-top: 0px;margin-left: 75px;" >
            <i-switch v-if="basicDataIsEdit" v-model="basicData.fdjSwitchValue">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            <div v-else>
              {{this.isHaveFDJ}}
            </div>
          </FormItem>
          <FormItem label="是否超养:" style="margin-top: 0px;margin-left: 75px;" >
            <i-switch v-if="basicDataIsEdit" v-model="basicData.cySwitchValue">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            <div v-else>
              {{this.isHaveCY}}
            </div>
          </FormItem>
        </div>
      </Form>
    </Card>

    <!--丢失件修配记录-->
    <Card v-if="basicData.dsjSwitchValue" style="margin-top: 20px;">
      <p slot="title" >
        丢失件修配记录
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" icon="plus" @click="dsjModal = true;">添加</Button>
      <Row align="middle" style="flex-wrap: wrap">
        <can-edit-table style="margin-top: 10px;" v-model="dsjList" :columnsList="dsjColumns">
        </can-edit-table>
      </Row>
    </Card>
    <Modal
      v-model="dsjModal"
      title="丢失件修配记录"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="addDSJ">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancleAddDSJ">取消</Button>
      </div>
      <div style="padding: 0px; height: 100%;">
        <Form v-model="dsj" :label-width="80">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="商品编号:">
              <Input v-model="dsj.spbh" placeholder="商品编号..." style="width: 100px"></Input>
            </FormItem>
            <FormItem label="名称:">
              <Input v-model="dsj.name" placeholder="名称..." style="width: 100px"></Input>
            </FormItem>
            <FormItem label="数量:">
              <Input  v-model="dsj.sl" placeholder="数量..." style="width: 100px"></Input>
            </FormItem>
            <FormItem label="修配结果:">
              <Input v-model="dsj.content" placeholder="修配结果..." style="width: 100px"></Input>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>

    <!--超养作业记录-->
    <Card v-if="basicData.cySwitchValue" style="margin-top: 20px;">
      <p slot="title" >
        超养作业记录
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" icon="plus" @click="cyModal=true">添加</Button>
      <Row align="middle" style="flex-wrap: wrap">
        <can-edit-table
          style="margin-top: 10px;"
          v-model="cyList"
          :columnsList="cyColumns">
        </can-edit-table>
      </Row>
    </Card>
    <Modal
      v-model="cyModal"
      title="超养作业记录"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="addCYZY">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancleAddCYZY">取消</Button>
      </div>
      <div>
        <Form v-model="cyItem" :label-width="80">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="商品编号">
              <Input v-model="cyItem.spbh" placeholder="商品编号..." style="width: 100px"></Input>
            </FormItem>
            <FormItem label="项目">
              <Input v-model="cyItem.name" placeholder="项目..." style="width: 100px"></Input>
            </FormItem>
            <FormItem label="数量">
              <Input v-model="cyItem.sl" placeholder="数量..." style="width: 100px"></Input>
            </FormItem>
            <FormItem label="修复方法">
              <Input v-model="cyItem.content" placeholder="修复方法..." style="width: 100px"></Input>
            </FormItem>
          </div>
        </Form>
      </div>
    </Modal>

    <!--发动机进厂技术记录-->
    <Card v-if="basicData.fdjSwitchValue" style="margin-top: 20px;">
      <p slot="title" >
        发动机进厂技术记录
      </p>
      <Button slot="extra" type="primary" size="small" style="margin-right: 10px;" :icon="fdjEditIcon" @click="editBtnClick">{{fdjEditText}}</Button>
      <Button v-if="fdjDataIsEdit" slot="extra" type="success" size="small" style="margin-right: 10px;" icon="checkmark" @click="saveFDJData">保存</Button>
        <Form v-model="fdjData" :label-width="70">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="发动机号:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjData.fdjh" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjData.fdjh}}</div>
            </FormItem>
            <FormItem label="进场时间:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjData.jcsj" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjData.jcsj}}</div>
            </FormItem>
            <FormItem label="是否镶接:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjData.sfqj" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjData.sfqj}}</div>
            </FormItem>
            <FormItem label="承修人:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjData.cxr" style="width:120px;"></Input>
              <div style="width: 120px;" v-else>{{fdjData.cxr}}</div>
            </FormItem>
            <FormItem label="修理记录:" style="margin-top: 0px;">
              <Input v-if="fdjDataIsEdit" v-model="fdjData.xljl" placeholder="请输入说明备注..."></Input>
              <div v-else>{{fdjData.xljl}}</div>
            </FormItem>
          </div>
        </Form>

      <hr style="height:1px;border:none;border-top:1px solid lightgrey;margin-bottom: 5px; margin-top: 10px"/>
      <div style="margin-bottom: 50px;">
        <Button type="primary" size="small" icon="plus" @click="fdjQGModal=true">添加气缸凸轮轴活塞检验数据</Button>
        <Table border style="margin-top: 10px;" :data="FDJ_QG_DATA" :columns="FDJ_QG_COLUMNS"></Table>
      </div>

      <hr style="height:1px;border:none;border-top:1px solid lightgrey;margin-bottom: 5px; margin-top: 10px"/>
      <div>
        <Button type="primary" size="small" icon="plus" @click="fdjQZModal=true">添加曲轴检验数据</Button>
        <Table border style="margin-top: 10px;" :data="FDJ_QZ_DATA" :columns="FDJ_QZ_COLUMNS"></Table>
      </div>
    </Card>
    <!--新增气缸凸轮轴-->
    <Modal
      v-model="fdjQGModal"
      title="新增气缸凸轮轴检测数据"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="addFDJ_QG_NewData">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancleAddFDJQGData">取消</Button>
      </div>
      <AddFDJQGView :qgData="fdjQGData"/>
    </Modal>
    <!--新增曲轴-->
    <Modal
      v-model="fdjQZModal"
      title="新增曲轴检测数据"
      width="50%"
      :mask-closable="false"
      :closable="false">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="addFDJ_QZ_NewData">保存</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancleAddFDJQZData">取消</Button>
      </div>
      <AddFDJQZView :qzData="fdjQZData"/>
    </Modal>

  </div>
</template>
<script>
  import canEditTable from '../../components/common/canEditTable.vue';
  import CommonSelect from  '../../components/common/CommonSelect.vue';
  import FDJData from './StepOneTableData';
  import AddFDJQZView from './AddFDJQZView.vue';
  import AddFDJQGView from './AddFDJQGView.vue';
  import * as DateTool from '../../../utils/DateTool';
  export default {
    name: 'AddMMStepOne',
    components: {
      canEditTable,
      AddFDJQZView,
      AddFDJQGView,
      CommonSelect
    },
    props: {
      sourceData: Object,
    },
    data () {
      return {
        // **************** 车辆基本数据 ************** //
        basicData: {
          id: '',
          djbh: '',
          clzbh: '',
          cph: '',
          cx: '',
          xl: '',
          fgs: '',
          jcsj: '',
          sxr: '',
          jyy: '',
          bylb: '',
          fdjSwitchValue: true,
          dsjSwitchValue: false,
          cySwitchValue: false,
        },
        dsjModal: false,
        cyModal: false,
        basicDataIsEdit: false,

        // **************** 发动机数据 ************** //
        FDJ_QG_COLUMNS: [
          {
            title: '部位',
            align: 'center',
            type: 'index'
          },
          {
            title: '气缸',
            align: 'center',
            children: [
              {
                title: '上部',
                align: 'center',
                children: [
                  {
                    title: '前后',
                    key: 'qg_sb_qh',
                    align: 'center',
                  },
                  {
                    title: '左右',
                    key: 'qg_sb_zy',
                    align: 'center',
                  },
                ]
              },
              {
                title: '中部',
                align: 'center',
                children: [
                  {
                    title: '前后',
                    key: 'qg_zb_qh',
                    align: 'center',
                  },
                  {
                    title: '左右',
                    key: 'qg_zb_zy',
                    align: 'center',
                  },
                ]
              },
              {
                title: '下部',
                align: 'center',
                children: [
                  {
                    title: '前后',
                    key: 'qg_xb_qh',
                    align: 'center',
                  },
                  {
                    title: '左右',
                    key: 'qg_xb_zy',
                    align: 'center',
                  },
                ]
              },
            ],
          },
          {
            title: '活塞尺寸',
            align: 'center',
            key: 'hscc',
          },
          {
            title: '凸轮轴',
            align: 'center',
            children: [
              {
                title: '升程',
                align: 'center',
                children: [
                  {
                    title: '进气',
                    key: 'tlz_jq',
                    align: 'center'
                  },
                  {
                    title: '排气',
                    key: 'tlz_pq',
                    align: 'center'
                  },
                ]
              }
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
                      this.deleteFDJ_QG_Data(params.index);
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
        FDJ_QG_DATA: [],
        FDJ_QZ_COLUMNS: [
          {
            title: '曲轴',
            align:'center',
            children: [
              {
                title: '曲轴径',
                align: 'center',
                children: [
                  {
                    title: '直径',
                    key: 'qz_qzj_zj',
                    align: 'center'
                  },
                  {
                    title: '圆度',
                    key: 'qz_qzj_yd',
                    align: 'center'
                  },
                  {
                    title: '圆柱度',
                    key: 'qz_qzj_yzd',
                    align: 'center'
                  }
                ]
              },
              {
                title: '连杆颈',
                align: 'center',
                children: [
                  {
                    title: '直径',
                    key: 'qz_lgj_zj',
                    align: 'center'
                  },
                  {
                    title: '圆度',
                    key: 'qz_lgj_yd',
                    align: 'center'
                  },
                  {
                    title: '圆柱度',
                    key: 'qz_lgj_yzd',
                    align: 'center'
                  }
                ]
              },
            ],
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
                      this.deleteFDJ_QZ_Data(params.index);
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
        FDJ_QZ_DATA: [],

        fdjData: {
          byid: '',
          id: '',
          fdjh: '559',
          jcsj: '2017-04-17',
          sfqj: "下套+0.00",
          cxr: '李光',
          xljl: "修理记录4",
          fy: '',
          tlz: '',
          qg: '',
          qz: '',
          hs: '',
        },
        fdjQGData: {
          qg_sb_qh: '101.67',
          qg_sb_zy: '101.68',
          qg_zb_qh: '101.68',
          qg_zb_zy: '101.67',
          qg_xb_qh: '101.68',
          qg_xb_zy: '101.68',
          hscc: '101.59',
          tlz_jq: '7.24',
          tlz_pq: '7.23',
        },
        fdjQZData: {
          qz_qzj_zj: '74.991111111',
          qz_qzj_yd: '0.01',
          qz_qzj_yzd: '-',

          qz_lgj_zj: '61.99',
          qz_lgj_yd: '0.01',
          qz_lgj_yzd: '-',
        },
        fdjDataIsEdit: false,
        fdjQZModal: false,
        fdjQGModal: false,

        // **************** 丢失件修配数据 ************** //
        dsjColumns: [
          {
            key: 'spbh',
            title: '商品编号',
          },
          {
            key: 'name',
            title: '名称',
          },
          {
            key: 'sl',
            title: '数量',
          },
          {
            key: 'content',
            title: '修配结果',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (h, params, index) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      for (let attr in this.dsj) {
                        this.dsj[attr] = params.row[attr];
                      }
                      this.dsjModal = true;
                    }
                  }
                }, '修改'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteDSJOrCY(params.row);
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
        dsjList: [],
        dsj: {
          spbh: '',
          name: '',
          sl: '',
          content: '',
          id: '',
          byid: '',
        },

        // **************** 超养作业记录数据 ************** //
        cyColumns: [
          {
            key: 'spbh',
            title: '商品编号',
          },
          {
            key: 'name',
            title: '项目',
          },
          {
            key: 'sl',
            title: '数量',
          },
          {
            key: 'content',
            title: '修复方法',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (h, params, index) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      for (let attr in this.cyItem) {
                        this.cyItem[attr] = params.row[attr];
                      }
                      this.cyModal = true;
                    }
                  }
                }, '修改'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteDSJOrCY(params.row);
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
        cyList: [],
        cyItem: {
          spbh: '',
          name: '',
          sl: '',
          content: '',
          id: '',
          byid: '',
        },
      }
    },
    computed: {
      editText() {
        if (!this.basicDataIsEdit) {
          return '编辑';
        }else{
          return '取消';
        }
      },
      editIcon() {
        if (!this.basicDataIsEdit) {
          return 'edit';
        }else{
          return 'close';
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
      isHaveDSJ() {
        return this.basicData.dsjSwitchValue ? '是' : '否';
      },
      isHaveFDJ() {
        return this.basicData.fdjSwitchValue ? '是' : '否';
      },
      isHaveCY() {
        return this.basicData.cySwitchValue ? '是' : '否';
      },
      BYLBString() {
        let clbyBasicData = this.sourceData.clby;
//        debugger
        if (typeof clbyBasicData !== 'undefined' && typeof clbyBasicData.bylb !== 'undefined') {
          let allDict = this.$store.state.dictData.parseDict;
          let array = (clbyBasicData.bylb !== null && clbyBasicData.bylb.length > 0) ? clbyBasicData.bylb.split("、") : [];
          let stringArray = [];
          array.forEach(bylbItem => {
            stringArray.push(allDict.BYLB[bylbItem]);
          })

          let bylbString = stringArray.join("、");
          return bylbString;
        }else{
          return '';
        }
      }
    },
    methods: {
      selectCLItem(value) {
        this.selectCL = this.$store.state.dictData.CLDict[value];
        this.basicData.clzbh = this.selectCL.selfNum;
        this.basicData.cph = this.selectCL.busNum;
        this.basicData.cx = this.selectCL.busModelName;
        this.basicData.xl = this.selectCL.lineName;
        this.basicData.fgs = this.selectCL.orgName;
      },
      clickEditBasicData() { // 编辑车辆基本信息
        // 点击取消后还原数据
        if (this.basicDataIsEdit === true) {
          this.configureData();
        }
        this.basicDataIsEdit = !this.basicDataIsEdit;

      },
      saveBasicData() { // 保存修改车辆基本信息
        let params = {};
        for (let attr in this.basicData) {
          params[attr] = this.basicData[attr];
        }
        let fgsDict = this.$store.state.dictData.parseDict.EJGS;
        for (let attr in fgsDict) {
          if (fgsDict[attr] === params.fgs) {
            params.fgs = attr;
          }
        }
        params.bylb = params.bylb.join('、');
        debugger
        this.$post(this.$url.maintain_BYGL_CLBY_updateRecord, params)
        .then(res => {
          if (res.code === 0) {
            this.basicDataIsEdit = false;
            this.$Message.success('更新成功!');
            this.$emit('updateInfo');
          }else{
            this.$Message.error('更新失败, 请重试!');
          }
        })
      },

      addDSJ() { // 添加或更新丢失件修配记录
        this.dsj.byid = this.sourceData.clby.id;
        this.$post(this.$url.maintain_BYGL_CLBY_DSJ_saveUpdate, this.dsj)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('保存成功!');
            this.dsjModal = false;
            this.$emit('updateInfo');
            this.dsj = {
              spbh: '',
              name: '',
              sl: '',
              content: '',
              id: '',
              byid: '',
            };
          }else{
            this.$Message.error('添加失败, 请重试!');
          }
        })
      },
      deleteDSJOrCY(DSJData) { // 删除丢失件修配记录或者超养作业记录
        let params = {id: DSJData.id};
        this.$fetch(this.$url.maintain_BYGL_CLBY_DJSORCY_delete, params)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('删除成功!');
            this.$emit('updateInfo');
          }else{
            this.$Message.error('删除失败, 请重试!');
          }
        })
      },
      cancleAddDSJ() { // 取消添加丢失件修配记录
        this.dsjModal = false;
        this.dsj = {
          spbh: '',
          name: '',
          sl: '',
          content: '',
          id: '',
          byid: '',
        };
      },

      addCYZY() { // 添加超养记录
        this.cyItem.byid = this.sourceData.clby.id;
        this.$post(this.$url.maintain_BYGL_CLBY_CY_saveUpdate, this.cyItem)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('保存成功!');
            this.cyModal = false;
            this.$emit('updateInfo');
            this.cyItem = {
              spbh: '',
              name: '',
              sl: '',
              content: '',
              id: '',
              byid: '',
            }
          }else{
            this.$Message.error('添加失败, 请重试!');
          }
        })
      },
      cancleAddCYZY() {
        this.cyModal = false;
        this.cyItem = {
          spbh: '',
          name: '',
          sl: '',
          content: '',
          id: '',
          byid: '',
        }
      },

      editBtnClick() {
        if (!this.fdjDataIsEdit) {
          console.log('点击了编辑按钮');
        }else{
          console.log('点击了取消按钮');
          // 点击了取消, 即使修改了, 也需要把 双向绑定的数据 为初始的数据.
          for (let attr in this.sourceData.clbyFdjjc) {
            this.fdjData[attr] = this.sourceData.clbyFdjjc[attr];
          }
        }
        this.fdjDataIsEdit = !this.fdjDataIsEdit;
      },
      saveFDJData() { // 修改保存 发动机基本信息
        let params = {};
        // 拷贝所有发动机所有的原始数据
        // 更新所有的基本信息
        for (let attr in this.fdjData) {
          params[attr] = this.fdjData[attr];
        }
        this.updateFDJ(params);
      },
      updateFDJ(params) { // 更新发动机   字段为json字符串, 不论是添加还是修改, 都调用更新对应字段的接口
        this.$post(this.$url.maintain_BYGL_CLBY_FDJ_saveOrUpdate, params)
        .then(res => {
          if (res.code === 0) {
            this.$Message.success('操作成功!');
            this.fdjQGModal = false;
            this.fdjQZModal = false;
            this.fdjDataIsEdit = false;
            this.$emit('updateInfo');
            this.fdjQGData = {
              qg_sb_qh: '',
              qg_sb_zy: '',
              qg_zb_qh: '',
              qg_zb_zy: '',
              qg_xb_qh: '',
              qg_xb_zy: '',
              hscc: '',
              tlz_jq: '',
              tlz_pq: '',
            };
            this.fdjQZData = {
              qz_qzj_zj: '',
              qz_qzj_yd: '',
              qz_qzj_yzd: '',

              qz_lgj_zj: '',
              qz_lgj_yd: '',
              qz_lgj_yzd: '',
            };
          }else{
            this.$Message.error('保存失败, 请重试!');
          }
        })
      },

      // *************** 发动机中list数据配置方法 ***************** //
      configureFDJQG_QZ_NetworkData(deepCopyArray) { // 把气缸-活塞-凸轮轴 或 曲轴的list数据转成json字符串数组
        let stringArray = '';
        deepCopyArray.forEach(item => {
          let stringObj = JSON.stringify(item);
          stringObj += '&';
          stringArray = stringArray + stringObj;
        })
        stringArray = stringArray.substring(0, stringArray.length-1);
        return stringArray;
      },
      // *************** 发动机中list数据配置方法 ***************** //

      // *************** 气缸 - 活塞 - 凸轮轴 ***************** //
      addFDJ_QG_NewData() {
        // 深拷贝数组
        let deepCopyArray = JSON.parse(JSON.stringify(this.FDJ_QG_DATA));
        deepCopyArray.push(this.fdjQGData);
        let qgString = this.configureFDJQG_QZ_NetworkData(deepCopyArray);
        // 深拷贝发动机对象
        let params = {};
        for (let attr in this.sourceData.clbyFdjjc) {
          params[attr] = this.sourceData.clbyFdjjc[attr];
        }
        // 修改气缸json数据
        params.qg = qgString;
        this.updateFDJ(params);
      },
      deleteFDJ_QG_Data(index) {
        console.log(index);
        // 深拷贝数组
        let deepCopyArray = JSON.parse(JSON.stringify(this.FDJ_QG_DATA));
        deepCopyArray.splice(index, 1);
        let qgString = this.configureFDJQG_QZ_NetworkData(deepCopyArray);
        // 深拷贝发动机对象
        let params = {};
        for (let attr in this.sourceData.clbyFdjjc) {
          params[attr] = this.sourceData.clbyFdjjc[attr];
        }
        // 修改气缸json数据
        params.qg = qgString;
        this.updateFDJ(params);
      },
      cancleAddFDJQGData() {
        this.fdjQGModal = false;
        this.fdjQGData = {
          qg_sb_qh: '',
          qg_sb_zy: '',
          qg_zb_qh: '',
          qg_zb_zy: '',
          qg_xb_qh: '',
          qg_xb_zy: '',
          hscc: '',
          tlz_jq: '',
          tlz_pq: '',
        };
      },
      // *************** 气缸 - 活塞 - 凸轮轴 ***************** //


      // *************** 曲轴 ***************** //
      addFDJ_QZ_NewData() {
        // 深拷贝数组
        let deepCopyArray = JSON.parse(JSON.stringify(this.FDJ_QZ_DATA));
        deepCopyArray.push(this.fdjQZData);
        let qzString = this.configureFDJQG_QZ_NetworkData(deepCopyArray);
        // 深拷贝发动机对象
        let params = {};
        for (let attr in this.sourceData.clbyFdjjc) {
          params[attr] = this.sourceData.clbyFdjjc[attr];
        }
        // 修改曲轴json数据
        params.qz = qzString;
        this.updateFDJ(params);
      },
      deleteFDJ_QZ_Data(index) {
        // 深拷贝数组
        let deepCopyArray = JSON.parse(JSON.stringify(this.FDJ_QZ_DATA));
        deepCopyArray.splice(index, 1);
        let qzString = this.configureFDJQG_QZ_NetworkData(deepCopyArray);
        // 深拷贝发动机对象
        let params = {};
        for (let attr in this.sourceData.clbyFdjjc) {
          params[attr] = this.sourceData.clbyFdjjc[attr];
        }
        // 修改曲轴json数据
        params.qz = qzString;
        this.updateFDJ(params);
      },
      cancleAddFDJQZData() {
        this.fdjQZModal = false;
        this.fdjQZData = {
          qz_qzj_zj: '',
          qz_qzj_yd: '',
          qz_qzj_yzd: '',

          qz_lgj_zj: '',
          qz_lgj_yd: '',
          qz_lgj_yzd: '',
        };
      },
      // *************** 曲轴 ***************** //


      getListData(item) {
        let dataArray = [];
        for (let i = 0; i < 6; i++) {
          dataArray.push(item);
        }
        return dataArray;
      },
      configureData() {
        // step 1
        let clbyBasicData = this.sourceData.clby;       // 车辆保养基本信息
        let clbyFdjjcData = this.sourceData.clbyFdjjc;  // 发动机进场记录
        let clbyDspjData = this.sourceData.clbyDspj;    // 丢失配件记录
        let clbyCyData = this.sourceData.clbyCy;        // 超养作业记录

//        debugger;

        let allDict = this.$store.state.dictData.parseDict;

        // 处理车辆保养基本信息
        for (let attr in clbyBasicData) {
          this.basicData[attr] = clbyBasicData[attr];
        }
        this.basicData.jcsj = DateTool.timesToDate(this.basicData.jcsj);
        let fgsDict = this.$store.state.dictData.parseDict.EJGS;
        this.basicData.fgs = fgsDict[this.basicData.fgs];

        let array = (clbyBasicData.bylb !== null && clbyBasicData.bylb.length > 0) ? clbyBasicData.bylb.split("、") : [];
        this.basicData.bylb = array;

        // 处理发动机进场记录
        let tmpfdjData = {}; // 用来判断是否有发动机进场记录的object
        for (let attr in clbyFdjjcData) {
          this.fdjData[attr] = clbyFdjjcData[attr];
          tmpfdjData[attr] = clbyFdjjcData[attr];
        }
        this.fdjData.jcsj = DateTool.timesToDate(this.fdjData.jcsj);
        let isHaveFDJData = false;
        delete tmpfdjData['byid'];
        delete tmpfdjData['id'];
        delete tmpfdjData['jcsj'];
        delete tmpfdjData['fdjh'];
        for (let attr in tmpfdjData) {
          if(tmpfdjData[attr] !== null && tmpfdjData[attr] !== '') {
            isHaveFDJData = true;
          }
        }
        this.basicData.fdjSwitchValue = isHaveFDJData;
        // 处理成json
//        console.log('======== 气缸数据 - 活塞数 - 凸轮轴数据 ==========');
        if (this.fdjData.qg !== null && this.fdjData.qg.length > 0) { // 气缸数据 - 活塞数 - 凸轮轴数据   注意: 由于页面问题,为了方便解析,前面三个数据均在qg字段中存储,格式为json字符串, 用&分割
          let qgStringArray = this.fdjData.qg.split('&');
          let qgArray = [];
          qgStringArray.forEach(item => {
            let obj = JSON.parse(item);
            qgArray.push(obj);
          })
          this.FDJ_QG_DATA = qgArray;
//          console.log('========= 气缸数据 - 活塞数 - 凸轮轴数据 =========');
        }

        if (this.fdjData.qz !== null && this.fdjData.qz.length > 0) { // 曲轴
//          console.log('========= 曲轴 =========');
          let qzStringArray = this.fdjData.qz.split('&');
          let qzArray = [];
          qzStringArray.forEach(item => {
            let obj = JSON.parse(item);
            qzArray.push(obj);
          })
          this.FDJ_QZ_DATA = qzArray;
//          console.log('========= 曲轴 =========');
        }

        // 处理丢失件列表
        if (clbyDspjData !== null) {
          this.basicData.dsjSwitchValue = (clbyDspjData.length > 0) ? true : false;
          this.dsjList = clbyDspjData;
        }
        // 处理超养记录
        if (clbyCyData !== null) {
          this.basicData.cySwitchValue = (clbyCyData.length > 0) ? true : false;
          this.cyList = clbyCyData;
        }
      }
    },
    mounted () {
    },
    created () {
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


<!--

bylb:"三养级别"
bz:null
clzbh:"A9999"
cph:"蒙A888888"
cx:"大车"
djbh:"9999"
fgs:"公交一公司"
id:"b93062ad09c64d9c96b81906cd1f853b"
jcsj:1533686400000
jyy:"毛良伟"
sxr:"谢忠华"
sl: '706'
-->

<!-- 丢失件修配记录 -->
<!--
{
      "id": "3e53df02a2a54d56bf378429599c8c40",
      "byid": "75125377398f4fbd9ec1bd47cb4e7c35",
      "name": "测试",
      "sl": 100,
      "content": "丢失件修配记录内容",
      "lx": 1,
      "type": "1"
}
-->


<!--发动机进场记录-->
<!--
byid:"6a2819c555a443cb863237d4d4f4eb2f"
cxr:"大黄3"
fdjh:"0003"
fy:1489.9
hs:null
id:"16fda8efccf54746b05df3840da0251f"
jcsj:1533037603000
qg:null
qz:null
sfqj:"是"
tlz:null
xljl:"修理记录4"
-->

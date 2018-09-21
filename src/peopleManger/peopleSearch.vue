<style>
  .select_name {
    width: 180px;
    border: 1px solid #dddee1;
    border-radius: 5px;
    height: 32px;
    padding-left: 7px;
  }

  .select_name::-webkit-input-placeholder {
    color: #bbbec4;
  }

  #letter {
    margin-right: 10px;
    width: 50px;
    margin-bottom: 10px;
  }
</style>
<template>
  <div style="height: 100%">
    <Modal
      v-model="modal2"
      width="550"
      style="height: auto"
      :mask-closable="false"
      title="选择要显示的列字段">
      <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
        <Checkbox label="cym">曾用名</Checkbox>
        <Checkbox label="xb">性别</Checkbox>
        <Checkbox label="mz">民族</Checkbox>
        <Checkbox label="xmdx">姓名首字母</Checkbox>
        <Checkbox label="csny">出生年月</Checkbox>
        <Checkbox label="jg">籍贯</Checkbox>
        <Checkbox label="zzmm">政治面貌</Checkbox>
        <Checkbox label="gh">工号</Checkbox>
        <Checkbox label="rybh">人员编号</Checkbox>
        <Checkbox label="sfzh">身份证号</Checkbox>
        <Checkbox label="bxdh">保险档号</Checkbox>
        <Checkbox label="bm">部门</Checkbox>
        <Checkbox label="gjjzh">公积金账号</Checkbox>
        <Checkbox label="gjjdh">公积金档号</Checkbox>
        <Checkbox label="gjjzt">公积金状态</Checkbox>
        <Checkbox label="gjjjcbz">公积金缴存情况备注</Checkbox>
        <Checkbox label="gjjkhsj">公积金开户时间</Checkbox>
        <Checkbox label="ylbx">医疗保险</Checkbox>
        <Checkbox label="ylzh">养老证号</Checkbox>
        <Checkbox label="fby">服兵役</Checkbox>
        <Checkbox label="rdsj">入党时间</Checkbox>
        <Checkbox label="gzsj">工作时间</Checkbox>
        <Checkbox label="bdwgzsj">本单位工作时间</Checkbox>
        <Checkbox label="txsj">退休时间</Checkbox>
        <Checkbox label="txdz">通讯地址</Checkbox>
        <Checkbox label="lxdh">联系电话</Checkbox>
        <Checkbox label="dw">单位</Checkbox>
        <Checkbox label="bm">部门</Checkbox>
        <Checkbox label="zyjszc">专业技术职称</Checkbox>
        <Checkbox label="qdsj">取得时间</Checkbox>
        <Checkbox label="xl">学历</Checkbox>
        <Checkbox label="byyx">毕业院校</Checkbox>
        <Checkbox label="sxzy">所学专业</Checkbox>
        <Checkbox label="zc">职称</Checkbox>
        <Checkbox label="txlb">退休类别</Checkbox>
        <Checkbox label="gzzw">公种职务</Checkbox>
        <Checkbox label="gzzh">工作证号</Checkbox>
        <Checkbox label="zyzgjn">职业资格技能</Checkbox>
        <Checkbox label="jkzk">健康状况</Checkbox>
        <Checkbox label="gsbx">工伤保险</Checkbox>
        <Checkbox label="gwzt">岗位状态</Checkbox>
        <Checkbox label="rybgqk">人员变更情况</Checkbox>
        <Checkbox label="zgsf">职工身份</Checkbox>
        <Checkbox label="poqk">配偶情况</Checkbox>
        <Checkbox label="htkssj">合同开始时间</Checkbox>
        <Checkbox label="htjssj">合同结束时间</Checkbox>
        <Checkbox label="lrsj">录入时间</Checkbox>
        <Checkbox label="bz">备注</Checkbox>
        <Checkbox label="ld">路队</Checkbox>
        <Checkbox label="zzqk">在职情况</Checkbox>
        <Checkbox label="sscj">所属车间</Checkbox>
        <Checkbox label="wxbz">维修班组</Checkbox>
      </Checkbox-group>
    </Modal>
    <Modal
      v-model="modal1"
      width="300"
      @on-ok="ok"
      :mask-closable="false"
      title="选择姓名首字母" style="text-align: center">
      <Button type="primary" size="small" v-for="(item,index) in letterArray" :key="item+index"
              id="letter"
              @click="getLetter(item)">{{item}}
      </Button>
    </Modal>
    <!--报表导入-->
    <Modal
      v-model="exports"
      title="导入计划表"
      width="400"
      :mask-closable="false"
      style="height:auto;">
      <Steps :current="0" direction="vertical">
        <Step title="第一步" content="下载导入报表模板"></Step>
        <Step title="第二步" content="上传报表"></Step>
        <Step title="第三部" content="系统自动导入"></Step>
      </Steps>
      <div style="display: flex;flex-direction: column;position: absolute;top:90px;margin-left: 240px;">
        <Button type="dashed" icon="android-download"
                style="margin-bottom: 10px;margin-top: -15px;width: 110px;">下载
        </Button>
        <Upload :headers="header" :action='uploadFile' :on-success="handleSuccess" :show-upload-list="false">
          <Button type="primary" icon="ios-cloud-upload-outline" style="width: 110px;margin-top: 17px;">上传
          </Button>
        </Upload>
      </div>
    </Modal>
    <Card style="width:100%">
      <p slot="title">员工列表查询</p>
      <Button slot="extra" type="primary" size="default" style="float: right;margin-right: 10px;"
              @click="addPerson" v-has="'people_add'">
        <Icon type="plus"></Icon>
        新建
      </Button>
      <Button type="primary" size="default" slot="extra" @click="modal2 = true" style="margin-right: 10px;">列表字段扩展
      </Button>
      <div>
        <div>
          <Form :model="cxItem" :label-width="120">
            <div style="display: flex;flex-wrap: wrap">
              <FormItem label="首字母查询" style="margin-left: -50px;">
                <input v-model="cxItem.xmszm" type="text" @focus="focusChoose" placeholder="按照姓名首字母查询"
                       class="select_name">
              </FormItem>
              <FormItem label="在职情况" style="margin-left: 10px;" prop="zzqk">
                <!--<Select v-model="cxItem.zzqk" style="width:180px">-->
                  <!--<Option value="">全部</Option>-->
                  <!--<Option value="在职">在职</Option>-->
                  <!--<Option value="离职">离职</Option>-->
                  <!--<Option value="正式">正式</Option>-->
                  <!--<Option value="实习">实习</Option>-->
                  <!--<Option value="退休">退休</Option>-->
                <!--</Select>-->
                <CommonSelect type="RYXX_ZZQK"  :selectValue="cxItem.zzqk" style="width: 180px;"></CommonSelect>
              </FormItem>
            </div>
            <div style="display: flex;flex-wrap: wrap">
              <FormItem label="合同自起" style="margin-left: -50px;">
                <DatePicker style="width: 180px;" v-model="cxItem.htkssj" type="date"
                            placeholder="请选择合同自起时间"></DatePicker>
              </FormItem>
              <FormItem label="合同终止" style="margin-left: 10px;">
                <DatePicker style="width: 180px;" v-model="cxItem.htjssj" type="date"
                            placeholder="请选择合同终止时间"></DatePicker>
              </FormItem>
            </div>
            <FormItem label="岗位状态" style="margin-left: -50px;" prop="gwzt" >
              <CommonSelect type="RYXX_GWZT" iviewType="checkbox" :selectValue="cxItem.gwzt"></CommonSelect>
            </FormItem>
            <FormItem prop="dw" label="按单位查询" style="margin-left: -50px;">
              <CommonSelect type="EJGS" iviewType="checkbox" :selectValue="cxItem.dw"></CommonSelect>
            </FormItem>
          </Form>
        </div>
        <!--筛选结果-->
        <div style="width: 100%; text-align: center;">
          <ButtonGroup>
            <Button type="primary" @click="search" v-has="'person_people_menu1_search'">
              <Icon type="search"></Icon>
              搜索
            </Button>
            <Button type="primary" size="default" @click="daochu" style="margin-right: 3px;margin-left: 3px;" v-has="	'person_people_menu1_exportExcel'">
              <Icon type="android-download"></Icon>
              导出
            </Button>
            <Button type="primary" size="default"
                    @click="exports=true" v-has="'person_people_menu1_daoru'">
              <Icon type="android-upload"></Icon>
              导入
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Card>
    <Table style="margin-top: 10px;" size="small" :data="tableData2" :columns="tableColumns2" border></Table>
    <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
  </div>
</template>
<script>
  import UserStatistics from './UserStatistics.vue'
  import VueCookie from 'vue-cookie'
  import CommonSelect from '../components/common/CommonSelect.vue'
  export default {
    components: {
      UserStatistics,
      CommonSelect,
    },
    data () {
      return {
//          查询区域
        exports: false,
        modal1: false,
        uploadFile: process.env.BASE_URL + "/person/userInfo/importExcel",  //文件上传的接口地址
        postList: ['全部', '公司领导', '二级', '三级', '主任科员', '一般管理', '辅助', '司机', '修理', '其他在岗', '内退', '病假', '产假', '女工长假', '下岗', '工伤', '待岗', '停薪', '外借', '其他不在岗',],
        getLetters: [],
        letterArray: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '清除'],
        cxItem: {
          xmszm: '',
          zzqk: '',
          htkssj: '',
          htjssj: '',
          gwzt: [],
          dw: [],
          current: 1,
          size: 10
        },
        header: {
          'Authorization': 'bearer ' + VueCookie.get('access_token')
        },
//        主内容
        tableData2: [],
        totalPage: 0,
        tableColumns2: [],
        tableColumnsChecked: [
          'sfzh',
          'bxdh',
          'gjjzh',
          'gjjdh',
          'gjjzt',
          'gjjjcbz',
          'gjjkhsj',
          'ylzh',
          'fby',
          'xmdx',
          'xm',
          'cym',
          'xb',
          'mz',
          'csny',
          'jg',
          'zzmm',
          'rdsj',
          'gzsj',
          'bdwgzsj',
          'txsj',
          'lxdh',
          'dw',
          'bm',
          'zyjszc',
          'xl',
          'byyx',
          'sxzy',
          'txlb',
          'gzzw',
          'gzzh',
          'zyzgjn',
          'jkzk',
          'gsbx',
          'zgsf',
          'htkssj',
          'htjssj',
          'lrsj',
          'bz',
          'ld',
          'gh',
          'rybh',
          'qdsj',
          'zc',
          'gwzt',
          'rybgqk',
          'poqk',
          'ylbx',
          'txdz',
          'zzqk',
          'sscj',
          'cz',
          'wxbz'
        ],
        modal2: false,
        tabValue: 0
      }
    },
    methods: {
//      人员信息导入
      handleSuccess: function (res) {
        console.log(res)
        if (res.success === true) {
          console.log(res.path)
          this.$fetch(this.$url.userManager_importExcel, this.cxItem)
            .then(res => {

            })
        } else {

        }
      },
      getTable2Columns () {
        const table2ColumnList = {
          rybh: {
            title: '人员编号',
            key: 'rybh',
            width: 150,
            align:'center'
          },
          sfzh: {
            title: '身份证号',
            key: 'sfzh',
            width: 150,
            align:'center'
          },
          bxdh: {
            title: '保险档号',
            key: 'bxdh',
            width: 150,
            align:'center'
          },
          gjjzh: {
            title: '公积金账号',
            key: 'gjjzh',
            width: 150,
            align:'center'
          },
          gjjdh: {
            title: '公积金档号',
            key: 'gjjdh',
            width: 150,
            align:'center'
          },
          gjjzt: {
            title: '公积金状态',
            key: 'gjjzt',
            width: 150,
            align:'center'
          },
          gjjjcbz: {
            title: '公积金缴存情况备注',
            key: 'gjjjcbz',
            width: 150,
            align:'center'
          },
          gjjkhsj: {
            title: '公积金开户时间',
            key: 'gjjkhsj',
            width: 150,
            align:'center'
          },
          ylzh: {
            title: '养老证号',
            key: 'ylzh',
            width: 150,
            align:'center'
          },
          fby: {
            title: '兵役状况',
            key: 'fby',
            width: 150,
            align:'center'
          },
          xmdx: {
            title: '姓名首字母',
            key: 'xmszm',
            width: 150,
            align:'center'
          },
          xm: {
            title: '姓名',
            key: 'xm',
            width: 100,
          },
          cym: {
            title: '曾用名',
            key: 'cym',
            width: 150,
            align:'center'
          },
          xb: {
            title: '性别',
            key: 'xb',
            width: 150,
            align:'center'
          },
          mz: {
            title: '民族',
            key: 'mz',
            width: 150,
            align:'center'
          },
          csny: {
            title: '出生年月',
            key: 'csny',
            width: 150,
            align:'center'
          },
          jg: {
            title: '籍贯',
            key: 'jg',
            width: 150,
            align:'center'
          },
          zzmm: {
            title: '政治面貌',
            key: 'zzmm',
            width: 150,
            align:'center'
          },
          rdsj: {
            title: '入党时间',
            key: 'rdsj',
            width: 150,
            align:'center'
          },
          gzsj: {
            title: '工作时间',
            key: 'gzsj',
            width: 150,
            align:'center'
          },
          bdwgzsj: {
            title: '本单位工作时间',
            key: 'gzsj',
            width: 150,
            align:'center'
          },
          txsj: {
            title: '退休时间',
            key: 'txsj',
            width: 150,
            align:'center'
          },
          lxdh: {
            title: '联系电话',
            key: 'lxdh',
            width: 150,
            align:'center'
          },
          dw: {
            title: '单位',
            key: 'dw',
            width: 150,
            align:'center'
          },
          bm: {
            title: '部门',
            key: 'bm',
            width: 150,
            align:'center'
          },
          zyjszc: {
            title: '专业技术职称',
            key: 'zyjszc',
            width: 150,
            align:'center'
          },
          xl: {
            title: '学历',
            key: 'xl',
            width: 150,
            align:'center'
          },
          byyx: {
            title: '毕业院校',
            key: 'byyx',
            width: 150,
            align:'center'
          },
          sxzy: {
            title: '所学专业',
            key: 'sxzy',
            width: 150,
            align:'center'
          },
          txlb: {
            title: '退离类别',
            key: 'txlb',
            width: 150,
            align:'center'
          },
          gzzw: {
            title: '工种职务',
            key: 'gzzw',
            width: 150,
            align:'center'
          },
          gzzh: {
            title: '工作证号',
            key: 'gzzh',
            width: 150,
            align:'center'
          },
          zyzgjn: {
            title: '职业资格技能',
            key: 'zyzgjn',
            width: 150,
            align:'center'
          },
          jkzk: {
            title: '健康状况',
            key: 'jkzk',
            width: 150,
            align:'center'
          },
          gsbx: {
            title: '工伤保险',
            key: 'gsbx',
            width: 150,
            align:'center'
          },
          zgsf: {
            title: '职工身份',
            key: 'zgsf',
            width: 150,
            align:'center'
          },
          htkssj: {
            title: '合同开始时间',
            key: 'htkssj',
            width: 150,
            align:'center'
          },
          htjssj: {
            title: '合同结束时间',
            key: 'htjssj',
            width: 150,
            align:'center'
          },
          lrsj: {
            title: '录入时间',
            key: 'lrsj',
            width: 150,
            align:'center'
          },
          bz: {
            title: '备注',
            key: 'bz',
            width: 150,
            align:'center'
          },
          ld: {
            title: '路队',
            key: 'ld',
            width: 150,
            align:'center'
          },


          zzqk: {
            title: '在职情况',
            key: 'zzqk',
            width: 150,
            align:'center'
          },
          sscj: {
            title: '所属车间',
            key: 'sscj',
            width: 150,
            align:'center'
          },
          wxbz: {
            title: '维修班组',
            key: 'wxbz',
            width: 150,
            align:'center'
          },
          qdsj: {
            title: '取得时间',
            key: 'qdsj',
            width: 150,
            align:'center'
          },
          zc: {
            title: '职称',
            key: 'zc',
            width: 150,
            align:'center'
          },
          gh: {
            title: '工号',
            key: 'gh',
            width: 150,
            align:'center'
          },
          ylbx: {
            title: '医疗保险',
            key: 'ylbx',
            width: 150,
            align:'center'
          },

          txdz: {
            title: '通讯地址',
            key: 'txdz',
            width: 150,
            align:'center'
          },
          gwzt: {
            title: '岗位状态',
            key: 'gwzt',
            width: 150,
            align:'center'
          },
          rybgqk: {
            title: '人员变更情况',
            key: 'rybgqk',
            width: 150,
            align:'center'
          },
          poqk: {
            title: '配偶情况',
            key: 'poqk',
            width: 150,
            align:'center'
          },
          cz: {
            title: '操作',
            key: 'month20',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
//                      params.row.ygfz = process.env.upload_BASE_URL+params.row.ygfz;
//                      params.row.zpdz = process.env.upload_BASE_URL+params.row.zpdz;
                      console.log(params.row.ygfz);
                      this.$router.push({
                        path: '/ListInfo',
                        query: {row: params.row}
                      })
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'people_info',
                    }
                  ],
                }, '详情'),
              ]);
            }
          }
        };
        let data = [table2ColumnList.rybh];
        this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));
        return data;
      },
      changeTableColumns () {
        this.tableColumns2 = this.getTable2Columns();
      },
      tj() {
        this.$router.push({
          path: '/UserStatistics'
        })
      },
      setPage: function (current) {
        this.cxItem.current = current;
        this.getList();
      },
//      获取列表
      getList: function () {
        this.$fetch(this.$url.userManager_userList, this.cxItem)
          .then(res => {
              console.log(res)
            if (res.data.total === 0) {
              this.$Message.info('暂无数据');
              this.totalPage = res.data.total;
              this.tableData2 = res.data.records;
            } else {
              res.data.records.forEach(item => {
                item.gzsj = this.$formatDate(item.gzsj).substring(0, 10);
                item.lrsj = this.$formatDate(item.lrsj).substring(0, 10);
                item.rdsj = this.$formatDate(item.rdsj).substring(0, 10);
                item.gjjkhsj = this.$formatDate(item.gjjkhsj).substring(0, 10);
                item.qdsj = this.$formatDate(item.qdsj).substring(0, 10);
                item.bdwgzsj = this.$formatDate(item.bdwgzsj).substring(0, 10);
                item.txsj = this.$formatDate(item.txsj).substring(0, 10);
                item.htkssj = this.$formatDate(item.htkssj).substring(0, 10);
                item.htjssj = this.$formatDate(item.htjssj).substring(0, 10);
                item.csny = this.$formatDate(item.csny).substring(0, 10);
              });
              this.totalPage = res.data.total;
              this.tableData2 = res.data.records;
            }
          })
      },
      focusChoose: function () {
        this.cxItem.xmszm = ''
        this.getLetters = []
        this.modal1 = true
      },
//      查询区域
      addPerson: function () {
        this.$router.push({path: '/ListInfo', query: {tip: 'add'}});
      },
      getLetter: function (item) {
        if (item === '清除') {
          this.cxItem.xmszm = '';
          this.getLetters = []
        } else {
          this.getLetters.push(item);
          let letter = this.getLetters.toString().replace(/,/g, '');
          this.cxItem.xmszm = letter;
        }
      },
      ok() {

      },
      search() {
        let newDw = [];
        let newGwzt = [];
        let zzqk = '';
        this.cxItem.dw.forEach(item => {
          let itemTitle = this.$store.state.dictData.parseDict.EJGS[item];
          newDw.push(itemTitle);
        })
        this.cxItem.gwzt.forEach(item => {
          let itemTitle1 = this.$store.state.dictData.parseDict.RYXX.RYXX_GWZT[item];
          newGwzt.push(itemTitle1);
        });
        zzqk = this.$store.state.dictData.parseDict.RYXX.RYXX_ZZQK[ this.cxItem.zzqk];

        this.$formatDate(this.cxItem.htkssj).substring(0,10)
        this.$formatDate(this.cxItem.htjssj).substring(0,10)

        if(this.cxItem.htkssj===''){
          this.cxItem.htkssj = ''
        }else {
          this.cxItem.htkssj = this.$formatDate(this.cxItem.htkssj).substring(0,10)
        }

        if(this.cxItem.htjssj===''){
          this.cxItem.htjssj=''
        }else {
          this.cxItem.htjssj = this.$formatDate(this.cxItem.htjssj).substring(0,10)
        }
        this.$fetch(this.$url.userManager_userList, {
          xmszm: this.cxItem.xmszm,
          zzqk: zzqk,
          htkssj: this.cxItem.htkssj,
          htjssj: this.cxItem.htjssj,
          gwzt:newGwzt.toString(),
          dw: newDw.toString(),
          current: 1,
          size: 10
        })
          .then(res => {
            if (res.data.total === 0) {
              this.$Message.info('暂无数据');
              this.totalPage = res.data.total;
              this.tableData2 = res.data.records;
            } else {
              res.data.records.forEach(item => {
                item.gzsj = item.gzsj===null?item.gzsj='':this.$formatDate(item.gzsj).substring(0, 10);
                item.lrsj = item.lrsj===null?item.lrsj='':this.$formatDate(item.lrsj).substring(0, 10);
                item.rdsj = item.rdsj===null?item.rdsj='':this.$formatDate(item.rdsj).substring(0, 10);
                item.gjjkhsj = item.gjjkhsj===null?item.gjjkhsj='':this.$formatDate(item.gjjkhsj).substring(0, 10);
                item.qdsj = item.qdsj===null?item.qdsj='':this.$formatDate(item.qdsj).substring(0, 10);
                item.bdwgzsj = item.bdwgzsj===null?item.bdwgzsj='':this.$formatDate(item.bdwgzsj).substring(0, 10);
                item.txsj = item.txsj===null?item.txsj='':this.$formatDate(item.txsj).substring(0, 10);
                item.htkssj = item.htkssj==null?item.htkssj='':this.$formatDate(item.htkssj).substring(0, 10);
                item.htjssj = item.htjssj===null?item.htjssj='':this.$formatDate(item.htjssj).substring(0, 10);
                item.csny = item.csny===null?item.csny='':this.$formatDate(item.csny).substring(0, 10);
              });
              this.totalPage = res.data.total;
              this.tableData2 = res.data.records;
            }
          })
      },
//      导出报表
      daochu: function () {
        this.$getExcel(process.env.BASE_URL + this.$url.userManager_exportExcel + '?xmszm=' + this.cxItem.xmszm + '&&dw=' + this.cxItem.dw + '&&gwzt=' + this.cxItem.gwzt + '&&zzqk=' + this.cxItem.zzqk + '&&htkssj=' + this.cxItem.htkssj + '&&htjssj=' + this.cxItem.htjssj);
      }
    },
    mounted () {
      this.changeTableColumns();
    }
  }
</script>

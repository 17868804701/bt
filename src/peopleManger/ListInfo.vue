<template>
  <div class="main">
    <Button type="primary" icon="paper-airplane" size="small">人员详细信息</Button>
    <router-link to="/userinfo">
      <span class="back">返回列表页>></span>
    </router-link>
    <Form :model="formItem" :label-width="80" style="margin-top:10px;">
      <Card class="card_file">
        <p slot="title">人员基本信息</p>
        <div slot="extra">
          <Button type="primary" size="small" v-show="this.$route.query.tip!='add'"
                  :icon="this.isEdit_jbxx==false?'checkmark-circled':'edit'" @click="jbxx">
            {{this.isEdit_jbxx == false ? '保存' : '修改'}}
          </Button>
        </div>
        <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="80" style="margin-top:10px;">
          <div style="display: flex">
            <div class="jbxx_left">
              <FormItem :label-width="120" label="姓名" prop="xm">
                <Input v-model="formItem.xm" :disabled="isEdit_jbxx" placeholder="姓名" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="曾用名">
                <Input :disabled="isEdit_jbxx" v-model="formItem.cym" placeholder="曾用名" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="工号">
                <Input :disabled="isEdit_jbxx" v-model="formItem.gh" placeholder="工号" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="工作证号">
                <Input :disabled="isEdit_jbxx" v-model="formItem.gzzh" placeholder="工作证号" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="人员编号">
                <Input :disabled="isEdit_jbxx" v-model="formItem.rybh" placeholder="人员编号" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="性别">
                <RadioGroup v-model="formItem.xb" :disabled="isEdit_jbxx" style="width: 170px;">
                  <Radio label="男">男</Radio>
                  <Radio label="女">女</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem :label-width="120" label="民族">
                <Select v-model="formItem.mz" :disabled="isEdit_jbxx" style="width: 170px;">
                  <Option v-for="(item,index) in nations" :key="item+index" :value="item">{{item}}</Option>
                </Select>
              </FormItem>
              <FormItem :label-width="120" label="出生年月">
                <DatePicker type="date" style="width: 170px;" :disabled="isEdit_jbxx" placeholder="出生年月"
                            v-model="formItem.csny"></DatePicker>
              </FormItem>
              <FormItem :label-width="120" label="籍贯">
                <Input :disabled="isEdit_jbxx" v-model="formItem.jg" placeholder="籍贯" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="姓名首字母">
                <Input :disabled="isEdit_jbxx" v-model="formItem.xmszm" placeholder="姓名首字母" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="联系电话">
                <Input :disabled="isEdit_jbxx" v-model="formItem.lxdh" placeholder="联系电话" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="政治面貌">
                <Select v-model="formItem.zzmm" :disabled="isEdit_jbxx" style="width: 170px;">
                  <Option value="共青团员">共青团员</Option>
                  <Option value="中共党员">中共党员</Option>
                  <Option value="群众">群众</Option>
                </Select>
              </FormItem>
              <FormItem :label-width="120" label="学历" prop="xl">
                <Input v-show="isEdit_jbxx" :disabled="isEdit_jbxx" v-model="formItem.xl" placeholder="学历" class="input_item"/>
                <CommonSelect type="RYXX_XLDM"  v-show="!isEdit_jbxx" :aria-disabled="true" :selectValue="formItem.xl"  class="input_item"></CommonSelect>
              </FormItem>
              <FormItem :label-width="120" label="毕业院校">
                <Input :disabled="isEdit_jbxx" v-model="formItem.byyx" placeholder="毕业院校" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="所学专业">
                <Input :disabled="isEdit_jbxx" v-model="formItem.sxzy" placeholder="所学专业" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="职称">
                <Input :disabled="isEdit_jbxx" v-model="formItem.zc" placeholder="职称" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="职业资格技能">
                <Input :disabled="isEdit_jbxx" v-model="formItem.zyzgjn" placeholder="职业资格技能" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="录入时间">
                <DatePicker type="date" style="width: 170px;" :disabled="isEdit_jbxx" placeholder="录入时间"
                            v-model="formItem.lrsj"></DatePicker>
              </FormItem>
              <FormItem :label-width="120" label="配偶情况">
                <Input :disabled="isEdit_jbxx" v-model="formItem.poqk" placeholder="配偶情况" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="身份证号">
                <Input :disabled="isEdit_jbxx" v-model="formItem.sfzh" placeholder="身份证号" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="健康状况">
                <Input :disabled="isEdit_jbxx" v-model="formItem.jkzk" placeholder="健康状况" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="服兵役">
                <Input :disabled="isEdit_jbxx" v-model="formItem.fby" placeholder="服兵役" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="通讯地址">
                <Input :disabled="isEdit_jbxx" v-model="formItem.txdz" placeholder="通讯地址" class="input_item"/>
              </FormItem>
              <FormItem :label-width="120" label="入党时间">
                <DatePicker type="date" :disabled="isEdit_jbxx" style="width: 170px;" placeholder="入党时间"
                            v-model="formItem.rdsj"></DatePicker>
              </FormItem>
              <FormItem :label-width="120" label="备注">
                <Input :disabled="isEdit_jbxx" v-model="formItem.bz" placeholder="备注" class="input_item"/>
              </FormItem>
            </div>
            <div class="head jbxx_right">
              <img class="head_img"
                   :src="'http://192.168.17.106:8080/'+formItem.zpdz"
                   alt="" style="border: 1px solid #eae9ec">
              <Upload :headers="header" :action='uploadFile' :on-success="handleSuccess" :show-upload-list="false">
                <Button type="primary" icon="ios-cloud-upload-outline">上传头像</Button>
              </Upload>
            </div>
          </div>
        </Form>
      </Card>
      <Card class="card_file" style="margin-top: 10px;">
        <p slot="title">附件查看</p>
        <Icon type="document-text" class="file" v-show="this.$route.query.tip!=='add'"></Icon>
        <span class="a_pdf" @click="showPDF" v-show="this.$route.query.tip!=='add'">附件：点击查看个人资料.pdf</span><br>
        <span v-show="this.$route.query.tip==='add'" style="position: absolute;margin-top: -20px;margin-left: 5px;">请上传个人资料</span>
        <Upload :headers="header" :action='uploadFile' :on-success="handleSuccessPdf" :show-upload-list="false">
          <Button type="primary" icon="ios-cloud-upload-outline" style="margin-top: 10px;">上传资料PDF</Button>
        </Upload>
      </Card>
      <!--<Button type="primary" icon="paper-airplane" size="small" style="margin-top:10px;">公积金基本信息</Button>-->
      <Card class="card_file" style="margin-top: 10px">
        <p slot="title">公积金基本信息</p>
        <div slot="extra">
          <Button type="primary" size="small" v-show="this.$route.query.tip!='add'"
                  :icon="this.isEdit_gjj==false?'checkmark-circled':'edit'" @click="gjj">
            {{this.isEdit_gjj == false ? '保存' : '修改'}}
          </Button>
        </div>
        <div style="display: flex;flex-wrap: wrap">
          <!--<FormItem :label-width="160" label="公积金账号">-->
            <!--<Input :disabled="isEdit_gjj" v-model="formItem.gjjzh" placeholder="公积金账号" class="input_item"/>-->
          <!--</FormItem>-->
          <FormItem :label-width="160" label="社保个人账号">
            <Input :disabled="isEdit_gjj" v-model="formItem.sbgrzh" placeholder="社保个人账号" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="社保参保时间">
            <DatePicker :disabled="isEdit_gjj" type="date" style="width: 170px;" placeholder="社保参保时间"
                        v-model="formItem.sbcbsj"></DatePicker>
          </FormItem>
          <FormItem :label-width="160" label="社保缴费基数">
            <Input :disabled="isEdit_gjj" v-model="formItem.sbjfjs" placeholder="社保缴费基数" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="社保缴费状态">
            <Input :disabled="isEdit_gjj" v-model="formItem.sbjfzt" placeholder="社保缴费状态" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="社保缴存备注">
            <Input :disabled="isEdit_gjj" v-model="formItem.sbjcbz" placeholder="社保缴存备注" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="住房公积金账号">
            <Input :disabled="isEdit_gjj" v-model="formItem.zfgjjzh" placeholder="住房公积金账号" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="公积金开户时间">
            <DatePicker :disabled="isEdit_gjj" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.gjjkhsj"></DatePicker>
          </FormItem>
          <FormItem :label-width="160" label="公积金缴存情况备注">
            <Input :disabled="isEdit_gjj" v-model="formItem.gjjjcbz" placeholder="公积金缴存情况备注" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="公积金缴存基数">
            <Input :disabled="isEdit_gjj" v-model="formItem.gjjjcjs" placeholder="公积金缴存基数" class="input_item"/>
          </FormItem>
          <FormItem :label-width="160" label="公积金缴存状态">
            <Input :disabled="isEdit_gjj" v-model="formItem.gjjjczt" placeholder="公积金缴存状态" class="input_item"/>
          </FormItem>
<!--          <FormItem :label-width="160" label="公积金档号">
            <Input :disabled="isEdit_gjj" v-model="formItem.gjjdh" placeholder="公积金档号" class="input_item"/>
          </FormItem>-->
        </div>
      </Card>
      <!--<Button type="primary" icon="paper-airplane" size="small" style="margin-top:10px;">单位基本信息</Button>-->
      <Card class="card_file" style="margin-top: 10px;">
        <p slot="title">单位基本信息</p>
        <div slot="extra">
          <Button type="primary" v-show="this.$route.query.tip!='add'" size="small"
                  :icon="this.isEdit_dwxx==false?'checkmark-circled':'edit'" @click="dwxx">
            {{this.isEdit_dwxx == false ? '保存' : '修改'}}
          </Button>
        </div>
        <div style="display: flex;flex-wrap: wrap">
          <FormItem :label-width="120" label="单位" prop="dw">
            <Input v-show="isEdit_dwxx" :disabled="isEdit_dwxx" v-model="formItem.dw" placeholder="单位" class="input_item"/>

            <Select :disabled="isEdit_dwxx" v-model="formItem.dw" style="width: 170px;" @on-change="dw_change" v-show="!isEdit_dwxx">
                <Option v-for="(item,index) in zzjgList" :value="item.groupname+'-'+item.groupid" v-show="item.grouptype=='EJGS'||item.grouptype=='JTGS'" :key="index">{{item.groupname}}</Option>
            </Select>
            <!--<CommonSelect type="EJGS"  v-show="!isEdit_dwxx" :aria-disabled="true" :selectValue="formItem.dw"  class="input_item"></CommonSelect>-->
          </FormItem>
          <FormItem :label-width="120" label="部门" prop="bm">
            <Input v-show="isEdit_dwxx" :disabled="isEdit_dwxx" v-model="formItem.bm" placeholder="部门" class="input_item"/>

            <Select :disabled="isEdit_dwxx" v-model="formItem.bm" style="width: 170px;" v-show="!isEdit_dwxx">
              <Option v-for="(item,index) in bmArray" :value="item.groupname" :key="index">{{item.groupname}}</Option>
            </Select>

          </FormItem>
          <FormItem :label-width="120" label="路队" prop="ld">
            <Input :disabled="isEdit_dwxx" v-model="formItem.ld" placeholder="路队" class="input_item" v-show="isEdit_dwxx"/>
            <CommonSelect type="LB"  v-show="!isEdit_dwxx" :aria-disabled="true" :selectValue="formItem.ld"  class="input_item"></CommonSelect>
          </FormItem>
          <FormItem :label-width="120" label="岗位状态" prop="gwzt">
            <!--<Select :disabled="isEdit_dwxx" v-model="formItem.gwzt" style="width: 170px;">-->
            <!--<Option value="二级">二级</Option>-->
            <!--<Option value="三级">三级</Option>-->
            <!--<Option value="司机">司机</Option>-->
            <!--<Option value="修理">修理</Option>-->
            <!--</Select>-->
            <Input v-show="isEdit_dwxx" :disabled="isEdit_dwxx" v-model="formItem.gwzt" placeholder="岗位状态" class="input_item"/>
            <CommonSelect type="RYXX_GWZT"  v-show="!isEdit_dwxx" :aria-disabled="true" :selectValue="formItem.gwzt"  class="input_item"></CommonSelect>
          </FormItem>
          <FormItem :label-width="120" label="工种职务">
            <Input :disabled="isEdit_dwxx" v-model="formItem.gzzw" placeholder="工种职务" class="input_item"/>
          </FormItem>

          <FormItem :label-width="120" label="工作时间">
            <DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.gzsj"></DatePicker>
          </FormItem>
          <FormItem :label-width="120" label="本单位工作时间">
            <DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.bdwgzsj"></DatePicker>
          </FormItem>
          <FormItem :label-width="120" label="合同形式">
            <Input :disabled="isEdit_dwxx" v-model="formItem.ldhtxs" placeholder="合同形式" class="input_item"/>
          </FormItem>

          <FormItem :label-width="120" label="合同自起">
            <DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.htkssj"></DatePicker>
          </FormItem>
          <FormItem :label-width="120" label="合同止">
            <DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.htjssj"></DatePicker>
          </FormItem>
          <FormItem :label-width="120" label="在职情况" prop="zzqk">
            <!--<Select :disabled="isEdit_dwxx" v-model="formItem.zzqk" style="width: 170px;">-->
            <!--<Option value="正式">正式</Option>-->
            <!--<Option value="试用">试用</Option>-->
            <!--<Option value="退休">退休</Option>-->
            <!--<Option value="离职">离职</Option>-->
            <!--</Select>-->
            <Input v-show="isEdit_dwxx" :disabled="isEdit_dwxx" v-model="formItem.zzqk" placeholder="在职情况" class="input_item"/>
            <CommonSelect type="RYXX_ZZQK"  v-show="!isEdit_dwxx" :aria-disabled="true" :selectValue="formItem.zzqk"  class="input_item"></CommonSelect>
          </FormItem>
          <FormItem :label-width="120" label="在职情况变更时间">
            <DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.zzqkbgsj"></DatePicker>
          </FormItem>

          <FormItem :label-width="120" label="在职情况变更原因">
            <Input :disabled="isEdit_dwxx" v-model="formItem.zzqkbgyy" placeholder="在职情况变更原因" class="input_item"/>
          </FormItem>
          <FormItem :label-width="120" label="退离类别">
            <Input :disabled="isEdit_dwxx" v-model="formItem.txlb" placeholder="退离类别" class="input_item"/>
          </FormItem>
          <FormItem :label-width="120" label="退离时间">
            <DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"
                        v-model="formItem.tlsj"></DatePicker>
          </FormItem>
          <!--<FormItem :label-width="120" label="专业技术职称">-->
            <!--<Input :disabled="isEdit_dwxx" v-model="formItem.ztjszc" placeholder="专业技术职称" class="input_item"/>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="120" label="取得时间">-->
            <!--<DatePicker :disabled="isEdit_dwxx" type="date" style="width: 170px;" placeholder="选择时间"-->
                        <!--v-model="formItem.qdsj"></DatePicker>-->
          <!--</FormItem>-->



          <!--<FormItem :label-width="120" label="工伤保险">-->
            <!--<Input :disabled="isEdit_dwxx" v-model="formItem.gsbx" placeholder="工伤保险" class="input_item"/>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="120" label="所属车间" prop="sscj">-->
            <!--&lt;!&ndash;<Select :disabled="isEdit_dwxx" v-model="formItem.sscj" style="width: 170px;">&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="第一车间">第一车间</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="第二车间">第二车间</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="第三车间">第三车间</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="第四车间">第四车间</Option>&ndash;&gt;-->
            <!--&lt;!&ndash;</Select>&ndash;&gt;-->
            <!--<Input v-show="isEdit_dwxx" :disabled="isEdit_dwxx" v-model="formItem.sscj" placeholder="所属车间" class="input_item"/>-->
            <!--<CommonSelect type="CJXX"  v-show="!isEdit_dwxx" :aria-disabled="true" :selectValue="formItem.sscj"  class="input_item"></CommonSelect>-->
          <!--</FormItem>-->


          <!--<FormItem :label-width="120" label="维修班组" prop="wxbz">-->
            <!--&lt;!&ndash;<Select :disabled="isEdit_dwxx" v-model="formItem.wxbz" style="width: 170px;">&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="一组">一组</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="二组">二组</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="三组">三组</Option>&ndash;&gt;-->
              <!--&lt;!&ndash;<Option value="四组">四组</Option>&ndash;&gt;-->
            <!--&lt;!&ndash;</Select>&ndash;&gt;-->
            <!--<Input v-show="isEdit_dwxx" :disabled="isEdit_dwxx" v-model="formItem.wxbz" placeholder="维修班组" class="input_item"/>-->
            <!--<CommonSelect type="WXBZ"  v-show="!isEdit_dwxx" :aria-disabled="true" :selectValue="formItem.wxbz"  class="input_item"></CommonSelect>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="120" label="职工身份">-->
            <!--<Input :disabled="isEdit_dwxx" v-model="formItem.zgsf" placeholder="职工身份" class="input_item"/>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="120" label="保险档号">-->
            <!--<Input :disabled="isEdit_dwxx" v-model="formItem.bxdh" placeholder="保险档号" class="input_item"/>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="120" label="医疗保险">-->
            <!--<Input :disabled="isEdit_dwxx" v-model="formItem.ylbx" placeholder="医疗保险" class="input_item"/>-->
          <!--</FormItem>-->
          <!--<FormItem :label-width="120" label="养老证号">-->
            <!--<Input :disabled="isEdit_dwxx" v-model="formItem.ylzh" placeholder="养老证号" class="input_item"/>-->
          <!--</FormItem>-->



        </div>
      </Card>
      <!--<Button type="primary" icon="paper-airplane" size="small" style="margin-top:10px;">其他信息</Button>-->
      <Card class="card_file" style="margin-top: 10px;">
        <p slot="title">人员变更记录</p>
        <div>
          <Table :columns="columns1" :data="data" :border="true"></Table>
        </div>
      </Card>
      <div style="width: 100%;text-align: center;padding: 20px;">
        <Button type="primary" icon="checkmark-circled" @click="save('formItem')" v-show="this.$route.query.tip=='add'">
          提交保存
        </Button>
      </div>
      <Modal
        v-model="modalPdf"
        width="70%"
        title="查看pdf">
        <vuePdfjs
          :url="this.$route.query.tip == 'add' ? ' ':'http://192.168.17.106:8080/'+this.$route.query.row.ygfz"
          :type="0"></vuePdfjs>000
      </Modal>
      <!--填写变更原因-->
      <Modal
        v-model="bgyy1"
        title="填写变更原因"
        @on-ok="ok"
        @on-cancel="cancel"
      >
        <Form :model="formItem" :label-width="80">
          <FormItem label="变更原因">
            <Input v-model="bgyy" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="填写变更原因，70字以内"></Input>
          </FormItem>
        </Form>
      </Modal>
    </Form>
  </div>
</template>
<script>
  import CommonSelect from '../components/common/CommonSelect.vue'
  import vuePdfjs from 'vue-pdfjs'
  import VueCookie from 'vue-cookie'
  export default {
    components: {
      CommonSelect,
      vuePdfjs
    },
    data () {
      return {
        gpId:'',
        bmArray:[],
        nations: ["汉族", "蒙古族", "回族", "藏族", "维吾尔族", "苗族", "彝族", "壮族", "布依族", "朝鲜族", "满族", "侗族", "瑶族", "白族", "土家族",
          "哈尼族", "哈萨克族", "傣族", "黎族", "傈僳族", "佤族", "畲族", "高山族", "拉祜族", "水族", "东乡族", "纳西族", "景颇族", "柯尔克孜族",
          "土族", "达斡尔族", "仫佬族", "羌族", "布朗族", "撒拉族", "毛南族", "仡佬族", "锡伯族", "阿昌族", "普米族", "塔吉克族", "怒族", "乌孜别克族",
          "俄罗斯族", "鄂温克族", "德昂族", "保安族", "裕固族", "京族", "塔塔尔族", "独龙族", "鄂伦春族", "赫哲族", "门巴族", "珞巴族", "基诺族"],
        isEdit_jbxx: true,
        isEdit_dwxx: true,
        isEdit_gjj: true,
        zzjgList:[],
        imgUrl: '',
        personId: '',
        uploadFile: process.env.upload_BASE_URL + "file/upload",  //文件上传的接口地址
        bgyy1: false,
        bgyy: '',
        ruleValidate: {
          xm: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ],
        },
        formItem: {
          bdwgzsj: "",
          bm: "",
          byyx: "",
          bz: "",
          csny: "",
          cym: "",
          dw: "",
          fby: "",
          gh: "",
          gjjjcbz: "",
          gjjjcjs: '',
          gjjjczt: '',
          gjjkhsj: "",
          gwzt: "",
          gzsj: "",
          gzzh: "",
          gzzw: "",
          htjssj: "",
          htkssj: "",
          id: "",
          jg: "",
          jkzk: "",
          ld: "",
          ldhtxs: '',
          lrsj: "",
          lxdh: "",
          mz: "",
          poqk: "",
          qdsj: "",
          rdsj: "",
          rybgqk: '',
          rybh: "",
          sbcbsj: '',
          sbgrzh: '',
          sbjcbz: '',
          sbjfjs: '',
          sbjfzt: '',
          sfzh: "",
          sxzy: "",
          tlsj: '',
          txdz: "",
          txlb: "",
          txsj: "",
          xb: "",
          xl: "",
          xm: "",
          xmszm: "",
          ygfz: "",
          zc: "",
          zfgjjzh: '',
          zpdz: "",
          zyzgjn: "",
          zzmm: "",
          zzqk: "",
          zzqkbgsj: '',
          zzqkbgyy: '',
        },
        columns1: [
          {
            title: '时间',
            key: 'bgsj'
          },
          {
            title: '变更原因',
            key: 'bgyy'
          }
        ],
        data: [],
        modalPdf: false,
        isshowpdf: false,
        value: '1',
        header: {
          'Authorization': 'bearer ' + VueCookie.get('access_token')
        },
      }
    },
    methods: {
      getZzjg(){
        this.$fetch(this.$url.zzjg)
          .then(res => {
            this.zzjgList = res.data
          })
      },
      handleSuccess: function (res) {
        let that = this
        if (res.success === true) {
            this.$Message.info('上传成功')
          if (this.isEdit_jbxx === false) {
            this.formItem.zpdz = res.path;
          } else {
            this.formItem.zpdz = res.path;
            this.bgyy = '上传了照片';
            this.update();
          }
        } else {
          this.$Message.error('修改失败');
        }
      },
      handleSuccessPdf: function (res) {
        if (res.success === true) {
          this.$Message.info('上传成功')
          if (this.isEdit_jbxx === false) {
            this.formItem.ygfz = res.path;
          } else {
            this.formItem.ygfz = res.path;
            this.bgyy = '上传了附件'
            this.update();
          }
        } else {
          this.$Message.error('修改失败');
        }
      },
      formatDate: function (now) {
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
      },
      closepdf(){
        this.isshowpdf = false;
      },
      showPDF(){
        if (this.$route.query.row.ygfz === null) {
          this.$Message.info('你还没有上传资料，请上传后查看')
        } else {
          this.modalPdf = true
        }
      },
      gjj: function () {
        this.isEdit_gjj = !this.isEdit_gjj;
        if (this.isEdit_gjj === true) {
          this.bgyy1 = true
        }

      },
      jbxx: function () {
        this.isEdit_jbxx = !this.isEdit_jbxx;
        if (this.isEdit_jbxx === true) {
          this.bgyy1 = true
        }
      },
      dwxx: function () {
        this.isEdit_dwxx = !this.isEdit_dwxx;
        if (this.isEdit_dwxx === true) {
          this.bgyy1 = true
        }
      },
      save: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            //console.log('结果', this.formItem);
            this.formItem.dw = this.formItem.dw .split('-')[0];
            this.formItem.xl = this.$store.state.dictData.parseDict.RYXX.RYXX_XLDM[this.formItem.xl];
            this.formItem.ld = this.$store.state.dictData.parseDict.LB[this.formItem.ld];//暂时屏蔽
            // this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem.dw];
            this.formItem.sscj = this.$store.state.dictData.parseDict.CJXX[this.formItem.sscj];
            this.formItem.zzqk = this.$store.state.dictData.parseDict.RYXX.RYXX_ZZQK[this.formItem.zzqk];
            this.formItem.gwzt = this.$store.state.dictData.parseDict.RYXX.RYXX_GWZT[this.formItem.gwzt];
            this.formItem.wxbz = this.$store.state.dictData.parseDict.WXBZ[this.formItem.wxbz];
            console.log(this.formItem);
            this.$post(this.$url.userManager_saveUserInfo, this.formItem)
              .then(res => {
                if (res.code === 'OK') {
                  this.$Message.info('添加成功');
                  this.$router.push({path: '/userinfo'});
                } else {
                  this.$Message.error('添加失败')
                }
              });
          } else {
            this.$Message.error('必要字段必须填写');
          }
        })
      },
      cancel: function () {
      },
      ok: function () {
        this.update();
      },
      update: function () {
        let url = this.$url.userManager_updateUserInfo + '?bgyy=' + this.bgyy;
        this.formItem.dw = this.formItem.dw .split('-')[0];
        this.formItem.xl = this.$store.state.dictData.parseDict.RYXX.RYXX_XLDM[this.formItem.xl];
        this.formItem.ld = this.$store.state.dictData.parseDict.LB[this.formItem.ld];//暂时屏蔽
        this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem.dw];
        // this.formItem.bm = this.$store.state.dictData.parseDict.EJBM[this.formItem.bm];
        this.formItem.sscj = this.$store.state.dictData.parseDict.CJXX[this.formItem.sscj];
        this.formItem.zzqk = this.$store.state.dictData.parseDict.RYXX.RYXX_ZZQK[this.formItem.zzqk];
        this.formItem.gwzt = this.$store.state.dictData.parseDict.RYXX.RYXX_GWZT[this.formItem.gwzt];
        this.formItem.wxbz = this.$store.state.dictData.parseDict.WXBZ[this.formItem.wxbz];
        console.log(this.formItem);
        this.$post(url, this.formItem)
          .then(res => {
            if (res.success === true) {
              this.$Message.info('修改成功');
              this.$router.push({path: '/userinfo'});
            } else {
              this.$Message.error('修改失败')
              this.formItem = this.$route.query.row || {};
            }
          })
      },
      getLog: function () {
        this.$fetch(this.$url.userManager_userChangeList, {id: this.$route.query.row.id})
          .then(res => {
            if (res.success === true) {
              res.data.records.forEach(item => {
                item.bgsj = this.$formatDate(item.bgsj).substring(0, 10);
              });
              this.data = res.data.records;
            } else {

            }
          })
      },
      dw_change:function (item) {
        this.gpId = item.split('-')[1];
        let tempArr = [];
        this.bmArray = [];
        for(let i in this.zzjgList){
          if(this.zzjgList[i].grouptype==='EJGS'){
            continue;
          }else {
            if(this.zzjgList[i].pid == this.gpId){
              tempArr.push(this.zzjgList[i])
            }
          }
        }
        this.bmArray.push(...tempArr);
      }
    },
    mounted () {
      this.getZzjg()
      this.imgUrl = process.env.upload_BASE_URL;
      let tip = this.$route.query.tip;
      if (tip === 'add') {
          this.isEdit_jbxx = false,
          this.isEdit_dwxx = false,
          this.isEdit_gjj = false
      } else {
        this.formItem = this.$route.query.row;
        this.personId = this.$route.query.row.id || '';
        this.getLog();
        // this.formItem.gzsj = this.formatDate(new Date(new Date(this.$route.query.row.gzsj).getTime()));
        // this.formItem.lrsj = this.formatDate(new Date(new Date(this.$route.query.row.lrsj).getTime()));
        // this.formItem.rdsj = this.formatDate(new Date(new Date(this.$route.query.row.rdsj).getTime()));
        // this.formItem.gjjkhsj = this.formatDate(new Date(new Date(this.$route.query.row.gjjkhsj).getTime()));
        // this.formItem.qdsj = this.formatDate(new Date(new Date(this.$route.query.row.qdsj).getTime()));
        // this.formItem.bdwgzsj = this.formatDate(new Date(new Date(this.$route.query.row.bdwgzsj).getTime()));
        // this.formItem.txsj = this.formatDate(new Date(new Date(this.$route.query.row.txsj).getTime()));
        // this.formItem.htkssj = this.formatDate(new Date(new Date(this.$route.query.row.htkssj).getTime()));
        // this.formItem.htjssj = this.formatDate(new Date(new Date(this.$route.query.row.htjssj).getTime()));
        // this.formItem.csny = this.formatDate(new Date(new Date(this.$route.query.row.csny).getTime()));
      }
    }
  }
</script>
<style>
  .main {
    padding: 20px;
  }

  .card_file {
    width: 99%;
  }

  .input_item {
    width: 170px !important;
  }

  .a_pdf {
    text-decoration: underline;
    margin-top: 7px;
    margin-left: 2px;
    position: absolute;
    color: blue;
    cursor: pointer;
  }

  .back {
    color: blue;
    position: absolute;
    margin-top: 4px;
    margin-left: 5px;
    cursor: pointer;
  }

  .file {
    font-size: 30px;
    color: #ed3f14;
    margin-left: 2px;
  }

  .jbxx_left {
    width: 85%;
    display: flex;
    flex-wrap: wrap;
  }

  .jbxx_right {
    height: 300px;
    width: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column
  }

  .head_img {
    width: 150px;
    height: 200px
  }
</style>


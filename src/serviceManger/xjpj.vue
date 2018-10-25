<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
  .container {
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid #eae9ec;
    width: 98%;
    margin-left: 1%;
  }

  .container h2 {
    margin-left: 15px;
  }

  td {
    text-align: center;
    width: 120px;
    height: 30px;
  }
</style>
<template>
  <div>
    <div class="container">
      <h2>星级评价</h2>
    </div>
    <div v-if="$showMenu('星级评价')">
      <Card style="margin-top: 10px;width: 98%;margin-left: 1%">
        <p slot="title">导出表格</p>
        <Form :model="formItem" :label-width="110">
          <div style="display: flex;flex-wrap: wrap">
            <FormItem label="请选择报表" style="margin: 0">
              <Select v-model="formItem.table_title" style="width:250px;">
                <Option v-for="(item, index) in allReportTitle" :key="item+index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem label="请选择时间" style="margin: 0">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" v-model="formItem.time"
                          class="text_width"></DatePicker>
            </FormItem>
            <Modal
              v-model="modal1"
              width="700"
              @on-ok="ok"
              title="预览表单">
              <div slot="footer" style="height: 30px;">
                <Button type="primary" style="float: right;margin-right: 10px" @click="ok">导出</Button>
                <Button type="primary" style="float: right;margin-right: 10px" @click="quxiao">取消</Button>
              </div>
              <div id="pdfDom">
                <TPL1 v-show="this.formItem.table_title.indexOf('票款')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL1>
                <TPL2 v-show="this.formItem.table_title.indexOf('公交')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL2>
                <TPL3 v-show="this.formItem.table_title.indexOf('站务管理')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL3>
                <TPL4 v-show="this.formItem.table_title.indexOf('职工培训')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL4>
                <TPL5 v-show="this.formItem.table_title.indexOf('修理公司')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL5>
                <TPL6 v-show="this.formItem.table_title.indexOf('稽查大队')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL6>
                <TPL7 v-show="this.formItem.table_title.indexOf('吉运')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL7>
                <TPL8 v-show="this.formItem.table_title.indexOf('长客')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL8>
                <TPL9 v-show="this.formItem.table_title.indexOf('大自然')==0" :titles="this.title" :xjgzList="this.xjgzList"
                      :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL9>
                <TPL10 v-show="this.formItem.table_title.indexOf('机关部室')==0" :titles="this.title" :xjgzList="this.xjgzList"
                       :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL10>
                <TPL11 v-show="this.formItem.table_title.indexOf('经营业绩')==0" :titles="this.title" :xjgzList="this.xjgzList"
                       :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL11>
                <TPL12 v-show="this.formItem.table_title.indexOf('各二级')==0" :titles="this.title" :xjgzList="this.xjgzList"
                       :scoreList="this.scoreList" :kfsmList="this.kfsmList " :month="this.showMonth" :year="this.showYear"></TPL12>
              </div>
            </Modal>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 15px;">
            <ButtonGroup>
              <Button type="primary" icon="eye" @click="requestReportData" v-has="'xjpj_xjpj_view'">预览导出</Button>
              <!--<Button type="primary" style="margin-left:1px;" icon="android-download" v-has="'xjpj_xjpj_export'">导出表格</Button>-->
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <span style="font-size: 12px;color: red;margin-left: 20px;display: inline-block;margin-top: 20px;">*打分说明:在当前月7号之前(不包括7号)打分的默认是给上个月打分，7号之后打分的是给当前月打分</span>
      <Collapse style="width: 98%;margin-left: 1%;margin-top: 20px;">
        <Panel v-for="(item, index) in userPJList" :name="item+index" :key="item+index">
          {{item.tableTitle}}
          <table slot="content">
            <tr>
              <td style="width: 120px;">序号</td>
              <td style="width: 120px;">考核指标</td>
              <td style="width: 120px;">实际得分</td>
              <td style="width: 120px;">描述</td>
              <td style="width: 120px;">最高分值</td>
            </tr>
            <tr v-for="(subOption, subOptionIndex) in item.options.subOptions" :key="subOption+subOptionIndex">
              <td>{{subOptionIndex + 1}}</td>
              <td>{{subOption.subOptionName}}</td>
              <td>
                <InputNumber v-model="subOption.score" :max="subOption.maxScore" :min="0"
                             style="width: 50px"></InputNumber>&nbsp;&nbsp;分
              </td>
              <td>
                <Input v-model="subOption.kfsm" placeholder="说明扣分原因" style="width: 300px"/>
              </td>
              <td>{{subOption.maxScore}}分</td>
            </tr>
            <tr>
              <td>
                <Button type="primary" icon="checkmark-circled" style="margin-left: 40px;"
                        @click="commitPJWithReportIndex(index)">提交
                </Button>
              </td>
            </tr>
          </table>
        </Panel>
      </Collapse>
    </div>

  </div>
</template>
<script>
  import XJPJData from './XJPJData.js';
  import TPL1 from './table/tableTemp1.vue';
  import TPL2 from './table/tableTemp2.vue';
  import TPL3 from './table/tableTemp3.vue';
  import TPL4 from './table/tableTemp4.vue';
  import TPL5 from './table/tableTemp5.vue';
  import TPL6 from './table/tableTemp6.vue';
  import TPL7 from './table/tableTemp7.vue';
  import TPL8 from './table/tableTemp8.vue';
  import TPL9 from './table/tableTemp9.vue';
  import TPL10 from './table/tableTemp10.vue';
  import TPL11 from './table/tableTemp11.vue';
  import TPL12 from './table/tableTemp12.vue';
  import axios from 'axios';
  import * as DateTool from '../../utils/DateTool';
  export default {
    components: {
      TPL1, //票款结算中心
      TPL2,//1-6公司
      TPL3,//站务管理中心
      TPL4,//职工培训中心
      TPL5,//修理公司
      TPL6,//稽查大队
      TPL7,//吉运汽车租赁服务有限公司
      TPL8,//长客总公司
      TPL9,//大自然旅游务有限责任公司
      TPL10,//机关部室
      TPL11,//经营业绩星级考核得分情况表
      TPL12,//各二级单位领导2018年4月月新表
    },
    data () {
      return {
        xjgzList:{},
        modal1: false,
        value1: 1,
        scoreList: '',
        kfsmList:'',
        formItem: {
          table_title: '',
          time: ''
        },
        title: '',
        showMonth: '',
        showYear: '',
        userPJList: [], // 用户打分的所有选项
        allReportTitle: [], // 所有报表名称
        TPLData: [], // 预览报表的数据
      }
    },
    methods: {
      // 提交分数
      commitPJWithReportIndex(index) {
        let date = new Date;
        let year = (date.getFullYear()).toString();
        let month = (date.getMonth() + 1).toString();
//        let month = '12';
        let day = (date.getDate()).toString();
        month = (month < 10 ? "0" + month : month);
        if (day > 7 || day === '7') {
          if (day > 7 && month === '12') {
            month = 1;
            year = (parseInt(year) + 1).toString();
          } else {
            month = parseInt(month).toString();
          }
        } else {
          month = (parseInt(month) - 1).toString();
        }
        ;
        let report = this.userPJList[index];
        let subOptionsArray = report.options.subOptions;
        let requestArray = [];
        subOptionsArray.forEach(subOption => {
          let params = {
            khMonth: month,
            khYear: year,
            score: subOption.score,
            kfsm: subOption.kfsm,
            xmid: subOption.subOptionID,
          };
          console.log(params);
          let request = this.$post(this.$url.commitPFWithID, params);
          requestArray.push(request);
        });
        let that = this;
        axios.all(requestArray)
          .then(axios.spread(function (...res) {
            console.log(...res);
            let statusArray = [];
            statusArray.push(...res);
            let status = true;
            statusArray.forEach(item => {
              if (item.success === false) {
                status = false;
                that.$Message.error('提交失败!');
                return;
              }
            })
            that.$Message.success('提交成功!');
            // 重新加载模板
            that.requestBaseData();
          }));
      },

      // 请求一张表的所有分值
      requestReportData() {
        console.log(this.formItem.table_title);
        console.log(this.formItem.table_title.indexOf('票款'));
        if (typeof this.formItem.time === 'date' || this.formItem.time === null || this.formItem.time === '') {
          this.$Message.error('请先选择时间, 再进行操作!');
          return;
        }
        if (this.formItem.table_title === '' || this.formItem.table_title.length <= 0) {
          this.$Message.error('请选择要操作的报表!');
          return;
        }
        let year = this.formItem.time.getFullYear();
        let month = this.formItem.time.getMonth() + 1;
        let params = {
          tableTitle: this.formItem.table_title,
          khYear: year,
          khMonth: month,
        };
        this.showMonth = this.formItem.time.getMonth() + 1;
        this.showYear = this.formItem.time.getFullYear();
        this.title = this.formItem.table_title;

        if(this.formItem.table_title==='各二级单位领导月薪表'){
          this.$getExcel(process.env.BASE_URL+this.$url.gejdwyxb+'?khYear='+year + '&khMonth='+month)
        }else if(this.formItem.table_title==='机关部室星级考核表'){
          this.$getExcel(process.env.BASE_URL+this.$url.jggbskhb+'?khYear='+year + '&khMonth='+month)
        }else {
          this.$fetch(this.$url.getReportData, params)
            .then(res => {
              console.log(res,'********************************************');
              if (res.success === true) {
                this.TPLData = res.data;
                let arr = {};
                let arr1 = {};
                res.data.forEach(item => {
                  arr[item['subOptionName']] = item['score']
                  arr1[item['subOptionName']] = item['kfsm']
                });
                console.log(arr);
                console.log(arr1)
                this.xjgzList = res.data1
                this.scoreList = arr;
                this.kfsmList = arr1;
                this.modal1 = true;
                console.log(this.xjgzList)
                console.log(this.kfsmList)
              } else {
                this.$Message.error('获取数据失败, 请重试!');
              }
            })
        }
      },

      // 请求当前用户的所有报表的打分选项
      requestBaseData() {
        let that = this;
        this.$fetch(this.$url.getUserPFList)
          .then(res => {
            if (res.success === true) {
              console.log(res,'********************************************88')
              let dataArray = res.data;
              dataArray.forEach(item => {
                that.allReportTitle.push(item.tableTitle);
                item.options.subOptions.forEach(subOptions => {
                  subOptions.score = 0; // 给每条数据增加一个用来双向绑定的分值
                })
              });
              that.userPJList = dataArray;
              console.log(dataArray);
            } else {
              this.$Message.error('加载配置数据失败!');
            }
          })
      },
      ok(){
        this.getPdf()
        this.modal1 = false
      },

      quxiao(){
        this.modal1 = false
      },
    },
    mounted() {
      this.requestBaseData();
    }
  }
</script>

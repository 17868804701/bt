<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 10px;
  }

  .container h2 {
    margin-left: 15px;
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

</style>
<template>
  <div>
    <div style="border-bottom: 1px solid #eae9ec;padding-bottom: 10px;padding-top: 20px;">
      <h2><span v-if="this.tip=='edit'">修改客服信息</span> <span v-else>添加客服信息</span>
        <router-link to="/kfxxList">
          <!--icon="chevron-left" -->
          <Button type="primary" size="small"><
            <返回列表
          </Button>
        </router-link>
      </h2>
    </div>

    <Card style="padding-left: 15px;margin-top: 20px;">
      <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="100">
        <div class="search">
          <FormItem label="线路" style="margin-bottom: 25px">
            <Select v-model="xl" filterable style="width: 195px;" @on-change="chooseLb">
              <Option v-for="item in cityList" :value="item.lineAlias" :key="item.lineAlias">{{ item.lineAlias }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="自编号" style="margin-bottom: 25px">
            <Select v-model="formItem.zbh" filterable style="width: 195px;" @on-change="chooseZbh">
              <Option v-for="item in chList" :value="item.zbh" :key="item.zbh">{{ item.zbh }}</Option>
            </Select>
          </FormItem>
          <FormItem label="车牌号" style="margin-bottom: 25px">
            <Select v-model="formItem.cph" filterable style="width: 195px;" @on-change="chooseZbh">
              <Option v-for="item in chList" :value="item.cph" :key="item.cph">{{ item.cph }}</Option>
            </Select>
          </FormItem>

          <FormItem label="单位" style="margin-bottom: 25px" prop="bm">
            <Input v-model="formItem.bm" placeholder="单位" class="text_width" :disabled="true"/>
          </FormItem>
          <FormItem label="投诉人" style="margin-bottom: 25px" prop="tsr">
            <Select v-model="formItem.tsr" :transfer="true" style="width: 195px;">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
          <FormItem label="电话" style="margin-bottom: 25px" prop="lxdh">
            <Input v-model="formItem.lxdh" placeholder="电话" class="text_width"/>
          </FormItem>
          <FormItem label="记录部门" style="margin-bottom: 25px" prop="jlbm">
            <Select v-model="formItem.jlbm" :transfer="true" style="width: 195px;" @on-change="jlBM">
              <Option value="运营部">运营部</Option>
              <Option value="客服中心">客服中心</Option>
            </Select>
          </FormItem>
          <FormItem label="来电/来访" style="margin-bottom: 25px">
            <Select v-model="formItem.lfxs" :transfer="true" style="width: 195px;" :disabled="true">
              <Option value="">无</Option>
              <Option value="来电">来电</Option>
              <Option value="来访">来访</Option>
            </Select>
          </FormItem>
          <FormItem label="记录人" style="margin-bottom: 25px" prop="jlr">
            <Input v-model="formItem.jlr" placeholder="记录人" class="text_width"/>
          </FormItem>


          <FormItem label="事件类别" style="margin-bottom: 25px">
            <Select v-model="formItem.sjlb" :transfer="true" style="width: 195px;" @on-change="sjlb">
              <Option value="问询">问询</Option>
              <Option value="导乘">导乘</Option>
              <Option value="寻物">寻物</Option>
              <Option value="投诉">投诉</Option>
              <Option value="建议">建议</Option>
              <Option value="表扬">表扬</Option>
              <Option value="反映情况">反映情况</Option>
            </Select>
          </FormItem>


          <FormItem label="投诉类别" style="margin-bottom: 25px" v-show="formItem.sjlb=='投诉'">
            <Select v-model="formItem.tslb" :transfer="true" style="width: 195px;">
              <Option value="DZBTC">到站不停车</Option>
              <Option value="JZ">拒载</Option>
              <Option value="DJG">大间隔</Option>
              <Option value="FWTDC">服务态度差</Option>
              <Option value="TXYY">脱线运营</Option>
              <Option value="SJSG">摔夹事故</Option>
              <Option value="ICKFM">刷IC卡方面</Option>
              <Option value="QT">其他</Option>
            </Select>
          </FormItem>


          <FormItem label="状态" style="margin-bottom: 25px">
            <Select v-model="formItem.clzt" :transfer="true" style="width: 195px;" :disabled="true">
              <Option value="1">处理中</Option>
              <Option value="0">不处理</Option>
              <Option value="2">处理完成</Option>
            </Select>
          </FormItem>
          <!--<FormItem label="事件状态" style="margin-bottom: 25px">-->
            <!--<Select v-model="formItem.sjzt" :transfer="true" style="width: 195px;">-->
              <!--<Option value="1">在诉</Option>-->
              <!--<Option value="0">不投诉</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <FormItem label="备注" style="margin-bottom: 25px">
            <Input v-model="formItem.bz" placeholder="备注" class="text_width" style="width: 490px;"/>
          </FormItem>
          <FormItem label="事由" style="margin-bottom: 25px" prop="sy">
            <Input v-model="formItem.sy" placeholder="事由" style="width: 490px;"/>
          </FormItem>
          <FormItem label="回访情况" style="margin-bottom: 25px" v-show="this.tip=='edit'">
            <Select v-model="hfqk_old" :transfer="true" style="width: 195px;" @on-change="hfqk">
              <Option value="满意">满意</Option>
              <Option value="不满意">不满意</Option>
              <Option value="其他">其他</Option>
            </Select>
            <Input v-model="hfqks" placeholder="回访情况" style="width: 490px;" v-show="isShow===true"/>
          </FormItem>
          <FormItem label="回访时间" style="margin-bottom: 25px" v-show="this.tip=='edit'">
            <DatePicker type="date" placeholder="处理时间" :transfer="true" v-model="formItem.fksj"
                        class="text_width"></DatePicker>
          </FormItem>
          <FormItem label="处理结果" v-show="formItem.sjlb!=='投诉'">
            <Input style="width: 490px;" v-model="formItem.cljg" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="处理结果"></Input>
          </FormItem>
        </div>
      </Form>
    </Card>
    <div style="margin: 20px;">
      <Button type="primary" @click="update" v-if="this.tip=='edit'">修改</Button>
      <Button type="primary" @click="save('formItem')" v-else="">提交</Button>
      <router-link to="/kfxxList">
        <Button type="ghost" style="margin-left: 8px">返回</Button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import CommonSelect from '../components/common/CommonSelect.vue'

  export default {
    components: {
      CommonSelect,
    },
    data() {
      return {
        hfqks:'',
        hfqk_old:'',
        isShow:false,
        cityList: [],
        chList: [],
        bmList: [],
        xl: '',
//          注意：这块要根据选择的事件类型不同去判断所填的项目
        formItem: {
          bm: "",
          bz: "",
          cljg: "",
          fksj: "",
          sjzt:'',
          jlbm: "",
          jlr: "",
          lfxs: "",
          lxdh: "",
          sjlb: "",
          sy: "",
          tslb: "",
          tsr: "",
          xl: "",
          clzt: "",
          hfqk:''
        },
        tip: '',
        ruleValidate: {
          jlr: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], xl: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], jlbm: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], ch: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], tsr: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], lxdh: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], sy: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], tslb: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ], lfxs: [
            {required: true, message: '必填项不能为空', trigger: 'change'}
          ],fksj: [
            {required: true, type: 'date', message: '必填项不能为空', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      chooseLb(val) {
        console.log(val.split('路')[0])
        let LB = val.split('路')[0]
        this.$fetch(this.$url.getZbhByLb, {lb: LB})
          .then(res => {
            console.log(res);
            if (res.success == true) {
              this.chList = res.data
            } else {
              this.$Message.error("查询部门失败")
            }
          })
      },
      chooseZbh() {
        let params = {
          zbh: this.formItem.zbh,
          cph: this.formItem.cph
        }
        this.$fetch(this.$url.getAllByZbh, params)
          .then(res => {
            console.log(res.data);
            this.formItem.bm = res.data[0].dwcode
          })
      },
      getAllByZbh() {

      },
      hfqk(value){
        if(value=='其他'){
          this.isShow = true
        }else {
          this.isShow = false
        }
      },
      getallList() {
        this.$post(this.$url.getAllList)
          .then(res => {
            //console.log(res);
            if (res.success == true) {
              console.log(res.data)
              this.cityList = res.data
            } else {
              this.$Message.error("查询线路失败")
            }
          })
      },
      filterMethod(value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      jlBM(value) {
        console.log(value);
        if (value === '客服中心') {
          this.formItem.lfxs = '来电'
        } else {
          this.formItem.lfxs = '来访'
        }
      },
      sjlb(value) {
        console.log(value)
        if (value == '投诉' || value == '反映情况') {
          this.formItem.clzt = '1'
        } else {
          this.formItem.clzt = '2'
        }
      },
      save: function (name) {
        let that = this
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formItem.fksj === '') {
              this.formItem.fksj = ''
            } else {
              this.formItem.fksj = this.$formatDate(this.formItem.fksj)
            }
            console.log(this.formItem)
            this.formItem.xl = this.xl.split('路')[0];
            this.$post(this.$url.savekfxx, this.formItem)
              .then(res => {
                //console.log(res);
                if (res.success == true) {
                  this.$Message.info("添加成功")
                  this.$router.push({path: '/kfxxList',})
                } else {
                  this.$Message.error("添加失败")
                }
              })
          } else {
            this.$Message.error('请填写完整信息');
          }
        });

      },
      update: function () {
        this.formItem.xl = this.xl.split('路')[0];
        this.formItem.fksj = this.$formatDate(this.formItem.fksj)
        if(this.hfqk_old==='其他'){
          this.formItem.hfqk = this.hfqks
        }else {
          this.formItem.hfqk = this.hfqk_old
        }
        console.log(this.formItem)
        this.$post(this.$url.updatekfxx, this.formItem)
          .then(res => {
            //console.log(res);
            if (res.success == true) {
              this.$Message.info("修改成功");
              this.$router.push({path: '/kfxxList',})
            } else {
              this.$Message.error("修改失败")
            }
          })
      },
    },
    mounted: function () {
      this.getallList()
      let tip = this.$route.query.tip;
      let row = this.$route.query.row;
      //console.log(row)
      this.tip = tip;
      if (tip === 'edit') {
        this.$fetch(this.$url.getZbhByLb, {lb: row.xl.split('路')[0]})
          .then(res => {
            console.log(res);
            if (res.success == true) {
              this.chList = res.data
            } else {
              this.$Message.error("查询部门失败")
            }
          })
          this.formItem.bm=row.bm,
          this.formItem.bz=row.bz,
          this.formItem.cljg=row.cljg,
          this.formItem.fksj=row.fksj,
          this.formItem.sjzt=row.sjzt,
          this.formItem.jlbm=row.jlbm,
          this.formItem.jlr=row.jlr,
          this.formItem.lfxs=row.lfxs,
          this.formItem.lxdh=row.lxdh,
          this.formItem.sjlb=row.sjlb,
          this.formItem.sy=row.sy,
          this.formItem.tslb=row.tslb,
          this.formItem.id=row.id,
          this.formItem.tsr=row.tsr,
          this.formItem.xl=row.xl,
          this.formItem.clzt=row.clzt
          this.formItem.zbh=row.zbh
          this.formItem.cph=row.cph
          this.hfqk_old=row.hfqk
          if(this.hfqk_old==='其他'){
            this.isShow = true
          }
          this.xl=row.xl
      } else {

      }
    }
  }
</script>

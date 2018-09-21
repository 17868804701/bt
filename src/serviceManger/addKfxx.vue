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
          <FormItem label="线路" style="margin-bottom: 25px" prop="xl">
            <!--<Select v-model="formItem.xl" :transfer="true" style="width: 195px;">-->
              <!--<Option value="1路">1路</Option>-->
              <!--<Option value="2路">2路</Option>-->
              <!--<Option value="3路">3路</Option>-->
            <!--</Select>-->
            <CommonSelect type="LB"  :selectValue="formItem.xl" style="width: 195px;"></CommonSelect>
          </FormItem>
          <FormItem label="记录部门" style="margin-bottom: 25px" prop="jlbm">
            <!--<Select v-model="formItem.jlbm" :transfer="true" style="width: 195px;">-->
              <!--<Option value="运营部">运营部</Option>-->
              <!--<Option value="责任公司">责任公司</Option>-->
            <!--</Select>-->
            <CommonSelect type="EJBM"  :selectValue="formItem.jlbm" style="width: 195px;"></CommonSelect>
          </FormItem>
          <FormItem label="记录人" style="margin-bottom: 25px" prop="jlr">
            <Input v-model="formItem.jlr" placeholder="记录人" class="text_width"/>
          </FormItem>
          <FormItem label="车号" style="margin-bottom: 25px" prop="ch">
            <Input v-model="formItem.ch" placeholder="车号" class="text_width"/>
          </FormItem>
          <FormItem label="投诉人姓名" style="margin-bottom: 25px" prop="tsr">
            <Input v-model="formItem.tsr" placeholder="投诉人姓名" class="text_width"/>
          </FormItem>
          <FormItem label="联系电话" style="margin-bottom: 25px" prop="lxdh">
            <Input v-model="formItem.lxdh" placeholder="联系电话" class="text_width"/>
          </FormItem>

          <FormItem label="投诉类别" style="margin-bottom: 25px" prop="tslb">
            <Select v-model="formItem.tslb" :transfer="true" style="width: 195px;" @on-change="changesLf">
              <Option value="DZBTC">到站不停车</Option>
              <Option value="JZ">拒载</Option>
              <Option value="DJG">大间隔</Option>
              <Option value="FWTDC">服务态度差 </Option>
              <Option value="TXYY">脱线运营</Option>
              <Option value="SJSG">摔夹事故</Option>
              <Option value="ICKFM">刷IC卡方面</Option>
              <Option value="QT">其他</Option>
            </Select>
          </FormItem>
          <FormItem label="来电/来访" style="margin-bottom: 25px" prop="lfxs">
            <Select v-model="formItem.lfxs" :transfer="true" :disabled="this.tip=='edit'" style="width: 195px;" @on-change="changesLf">
              <Option value="0">来电</Option>
              <Option value="1">来访</Option>
            </Select>
          </FormItem>
          <FormItem label="事件类别" style="margin-bottom: 25px" v-show="this.formItem.lfxs!=1">
            <Select v-model="formItem.sjlb" :transfer="true" :disabled="this.tip=='edit'" style="width: 195px;" @on-change="changes">
              <Option value="0">责任性事件</Option>
              <Option value="1">疑难性事件</Option>
              <Option value="2">普通事件</Option>
            </Select>
          </FormItem>
          <FormItem label="状态" style="margin-bottom: 25px" v-show="this.formItem.sjlb!=2&&this.formItem.lfxs!=1">
            <Select v-model="formItem.zt" :transfer="true" style="width: 195px;">
              <Option value="1">处理中</Option>
              <Option value="2">处理完成</Option>
            </Select>
          </FormItem>
          <FormItem label="提交部门" style="margin-bottom: 25px" v-show="this.formItem.sjlb!=2&&this.formItem.lfxs!=1" prop="bm">
            <!--<Select v-model="formItem.bm" :transfer="true" style="width: 195px;">-->
              <!--<Option value="公交一公司">公交一公司</Option>-->
              <!--<Option value="公交二公司">公交二公司</Option>-->
            <!--</Select>-->
            <CommonSelect type="EJBM"  :selectValue="formItem.bm" style="width: 195px;"></CommonSelect>
          </FormItem>
          <FormItem label="备注" style="margin-bottom: 25px">
            <Input v-model="formItem.bz" placeholder="备注" class="text_width"/>
          </FormItem>
          <FormItem label="事由" style="margin-bottom: 25px">
            <Input v-model="formItem.sy" placeholder="事由" style="width: 470px;"/>
          </FormItem>
          <FormItem label="反馈时间" style="margin-bottom: 25px" v-show="this.formItem.sjlb==2">
            <DatePicker type="date" placeholder="反馈时间" :transfer="true" v-model="formItem.fksj"
                        class="text_width"></DatePicker>
          </FormItem>
          <FormItem label="反馈信息" v-show="this.formItem.sjlb==2">
            <Input style="width: 470px;" v-model="formItem.cljg" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="填写反馈信息"></Input>
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
    data () {
      return {
//          注意：这块要根据选择的事件类型不同去判断所填的项目
        formItem: {
          bm: "",
          bz: "",
          ch: "",
          cljg: "",
          fksj: "",
          jlbm: "",
          jlr: "",
          lfxs: "",
          lxdh: "",
          sjlb: "",
          sy: "",
          tslb: "",
          tsr: "",
          xl: "",
          zt: ""
        },
        tip: '',
        ruleValidate: {
          jlr: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], xl: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], jlbm: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], ch: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], tsr: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], lxdh: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], tslb: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ], lfxs: [
            {required: true, message: '必填项不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      changes: function (value) {
        //console.log(value)
        if (value == 2) {
          this.formItem.zt = ''
          this.formItem.bm = ''
        } else {
          this.formItem.fksj = ''
          this.formItem.cljg = ''
        }
      },
      changesLf: function (value) {
        //console.log(value);
        if (value == 1) {
          this.formItem.sjlb = '';
          this.formItem.zt = '';
          this.formItem.bm = ''
        }
      },
      save: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formItem.fksj === '') {
              this.formItem.fksj = ''
            } else {
              this.formItem.fksj = this.formItem.fksj
            }
            //console.log(this.formItem);
            // this.formItem.xl = this.$store.state.dictData.parseDict.LB[ this.formItem._xl];
            // this.formItem.bm = this.$store.state.dictData.parseDict.EJBM[ this.formItem._bm];
            // this.formItem.jlbm = this.$store.state.dictData.parseDict.EJBM[ this.formItem._jlbm];
            console.log(this.formItem)
            this.$post(this.$url.savekfxx, this.formItem)
              .then(res => {
                //console.log(res);
                if (res.success == true) {
                  this.$Message.info("添加成功")
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
      let tip = this.$route.query.tip;
      let row = this.$route.query.row;
      //console.log(row)
      this.tip = tip;
      if (tip === 'edit') {
        this.formItem = row
      } else {

      }
    }
  }
</script>

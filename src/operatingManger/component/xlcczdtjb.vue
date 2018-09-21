<style>
  .border_line {
    /*border-bottom: 1px solid #e9eaec;*/
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem1" :label-width="80">
          <div style="display: flex;flex-wrap: wrap;margin-left: 10px;">
            <FormItem label="选择年月" style="margin: 0;">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" placement="bottom-end"
                          v-model="formItem1.sj"></DatePicker>
            </FormItem>
            <FormItem label="路别" style="margin: 0" prop="_lb">
              <!--<Select v-model="formItem1.lb" style="width: 195px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="1路">1路</Option>-->
                <!--<Option value="2路">2路</Option>-->
                <!--<Option value="3路">3路</Option>-->
              <!--</Select>-->
              <CommonSelect type="LB" :selectValue="formItem1._lb" style="width: 195px;"></CommonSelect>
            </FormItem>
            <FormItem label="公司" style="margin: 0" prop="_dw">
              <!--<Select v-model="formItem1.dw" style="width: 195px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="公交一公司">公交一公司</Option>-->
                <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS" :selectValue="formItem1._dw" style="width: 195px;"></CommonSelect>
            </FormItem>
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary" v-has="'yygl_jtyybb_xlcczdtj_search'" @click="search1" style="margin-right: 3px;"><Icon type="search"></Icon>  搜索</Button>
              <Button type="primary" v-has="'yygl_jtyybb_xlcczdtj_daochu'" @click="modal1=true"><Icon type="md-cloud-download" /> 导出</Button>
            </ButtonGroup>
          </div>
        </Form>
        <Modal
          v-model="modal1"
          @on-ok="ok1"
          @on-cancel="cancel1"
          title="填写导出说明"
        >
          <Form :model="formItem1" :label-width="80">
            <FormItem label="导出说明">
              <Input v-model="formItem1.dcsm" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入导出说明"></Input>
            </FormItem>
          </Form>
        </Modal>
      </Card>
      <Table :columns="columns11" :data="data10" border height="520" size="small" style="margin-top: 10px;">
        <div slot="header" style="text-align: center">
          <span style="font-size: 16px;">{{sj}}{{dw}}{{lb}}线路车次正点统计表</span>
        </div>
      </Table>
      <Page :total="totalPage1" show-total style="margin-top: 10px;" @on-change="setPage1"></Page>
    </div>
  </div>
</template>
<script>
  import CommonSelect from '../../components/common/CommonSelect.vue'
  export default {
    components: {
      CommonSelect,
    },
    data () {
      return {
        modal1: false,
        totalPage1: 0,
        formItem1: {
          dw: '',
          sj: '',
          dcsm: '',
          lb: '',
          _dw:'',
          _lb:'',
          current: 1,
          size: 10
        },
        dw: '',
        sj: '',
        lb:'',
        columns11: [
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            width: 100,
          },
          {
            title: '时间',
            key: 'sj',
            align: 'center',
            width: 100,
          },
          {
            title: '路别',
            key: 'lb',
            align: 'center',
            width: 100,
          },
          {
            title: '车次完成情况',
            align: 'center',
            width: 120,
            children: [
              {
                title: '计划',
                key: 'ccqk_jh',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '实际',
                key: 'ccqk_sj',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '短缺',
                key: 'ccqk_dq',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '车次率',
                key: 'ccqk_ccl',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '正点',
                key: 'ccqk_zd',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '不正点',
                key: 'ccqk_bzd',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '正点率',
                key: 'ccqk_zdl',
                align: 'center',
                width: 120,
                sortable: false
              },
            ]
          },
          {
            title: '客运量（人次）',
            align: 'center',
            width: 120,
            children: [
              {
                title: '实投币',
                key: 'kyl_tbrc',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '普卡',
                key: 'kyl_icrc',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: 'SIM卡',
                key: 'kyl_simrc',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '月票',
                key: 'kyl_yprc',
                align: 'center',
                width: 120,
                sortable: false
              }, {
                title: '公益',
                align: 'center',
                width: 120,
                sortable: false,
                children: [
                  {
                    title: '敬老卡',
                    key: 'kyl_jlkrc',
                    align: 'center',
                    width: 120,
                    sortable: false
                  }, {
                    title: '员工卡',
                    key: 'kyl_ygkrc',
                    align: 'center',
                    width: 120,
                    sortable: false
                  },
                ]
              },
              {
                title: '车次/人次',
                key: 'xccx',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '合计',
                key: 'kyl_hj',
                align: 'center',
                width: 120,
                sortable: false
              },
            ]
          },
          {
            title: '客运收入（元）',
            key: 'name',
            align: 'center',
            width: 120,
            children: [
              {
                title: '投币收入',
                key: 'sr_tbsr',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '普卡收入',
                key: 'sr_icsr',
                align: 'center',
                width: 120,
                sortable: false,
                children: [
                  {
                    title: '普卡（无补）',
                    key: 'sr_ickyhsr',
                    align: 'center',
                    width: 120,
                    sortable: false
                  },
                  {
                    title: '补贴',
                    key: 'sr_ickbtsr',
                    align: 'center',
                    width: 120,
                    sortable: false
                  },
                ]
              },
              {
                title: 'SIM卡收入',
                key: 'age',
                align: 'center',
                width: 120,
                sortable: false,
                children: [
                  {
                    title: 'SIM卡（无补）',
                    key: 'sr_simyhsr',
                    align: 'center',
                    width: 120,
                    sortable: false
                  },
                  {
                    title: '补贴',
                    key: 'sr_simbtsr',
                    align: 'center',
                    width: 120,
                    sortable: false
                  },
                ]
              },
              {
                title: '合计',
                key: 'sr_hj',
                align: 'center',
                width: 120,
                sortable: false
              },
              {
                title: '百公里收入',
                key: 'sr_bgl',
                align: 'center',
                width: 120,
                sortable: false
              },
            ]
          },
          {
            title: '敬老卡免费金额（元）',
            key: 'jlkmfje',
            align: 'center',
            width: 120,
          }
        ],
        data10: [],
      }
    },
    methods: {
      //线路车次正点统计
      ok1: function () {
        let time = '';
        if(this.formItem1._dw==''){
          this.formItem1.dw = ''
        }else {
          this.formItem1.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem1._dw];
        }
        if(this.formItem1._lb ==''){
          this.formItem1.lb = ''
        }else {
          this.formItem1.lb = this.$store.state.dictData.parseDict.LB[this.formItem1._lb];
        }
        if (this.formItem1.sj === '') {
          time = ''
        } else {
          time = this.$formatDate(this.formItem1.sj).substring(0, 7);
        }
        this.$getExcel(process.env.BASE_URL + this.$url.yyexportFgsxcyb + '?sj=' + time + '&dw=' + this.formItem1.dw + '&dcsm=' + this.formItem1.dcsm+'&lb='+this.formItem1.lb)
      },
      cancel1: function () {
        this.$Message.error('导出失败')
      },
      setPage1: function (current1) {
        this.formItem1.current = current1;
        this.getList();
      },
      search1: function () {
        this.formItem1.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem1._dw];
        this.formItem1.lb = this.$store.state.dictData.parseDict.LB[this.formItem1._lb];
        if (this.formItem1.sj === '') {
          this.formItem1.sj = ''
        } else {
          this.formItem1.sj = this.$formatDate(this.formItem1.sj).substring(0, 7);
        }
        this.sj = this.formItem1.sj
        this.lb = this.formItem1.lb
        this.dw = this.formItem1.dw
        this.getList();
      },
      getList: function () {
        this.$fetch(this.$url.getLineList, this.formItem1)
          .then(res => {
            console.log(res,'线路车次');
            if (res.data.total === 0) {
              this.$Message.info('暂无数据');
              res.data.records.forEach(item=>{
                item.sj = item.nd+'-'+item.yf
              });
              this.totalPage1 = res.data.total;
              this.data10 = res.data.records;
            } else {
              res.data.records.forEach(item=>{
                item.sj = item.nd+'-'+item.yf
              });
              this.totalPage1 = res.data.total;
              this.data10 = res.data.records;
            }
          })
      },
    },
    mounted () {

    }
  }
</script>

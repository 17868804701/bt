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
        <Form :model="formItem2" :label-width="80">
          <div style="display: flex;flex-wrap: wrap;margin-left: 10px;">
            <FormItem label="按年份查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" placement="bottom-end"
                          v-model="formItem2.sj"></DatePicker>
            </FormItem>
            <FormItem label="公司" style="margin: 0" prop="_dw">
              <!--<Select v-model="formItem2.dw" style="width: 195px;">-->
                <!--<Option value="">全部</Option>-->
                <!--<Option value="公交一公司">公交一公司</Option>-->
                <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--<Option value="公交三公司">公交三公司</Option>-->
              <!--</Select>-->
              <CommonSelect type="EJGS" :selectValue="formItem2._dw" style="width: 195px;"></CommonSelect>
            </FormItem>
          </div>
          <div style="width: 100%;justify-content: center;display: flex;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary" v-has="'yygl_jtyybb_ggsyjthz_search'" @click="search2" style="margin-right: 3px;"><Icon type="search"></Icon>  搜索</Button>
              <Button type="primary" v-has="'yygl_jtyybb_ggsyjthz_daochu'" @click="modal2=true"><Icon type="md-cloud-download" /> 导出</Button>
            </ButtonGroup>
          </div>
        </Form>
        <Modal
          v-model="modal2"
          title="填写导出说明"
          @on-ok="ok2"
          @on-cancel="cancel2"
        >
          <Form :model="formItem3" :label-width="80">
            <FormItem label="导出说明">
              <Input v-model="formItem3.dcsm" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入导出说明"></Input>
            </FormItem>
          </Form>
        </Modal>
      </Card>
      <Table :columns="columns12" :data="data12" border height="520" size="small" style="margin-top: 10px;">
        <div slot="header" style="text-align: center">
          <span style="font-size: 16px;">{{time}}各公司与集团汇总表</span>
        </div>
      </Table>
      <Page :total="totalPage2" show-total style="margin-top: 10px;" @on-change="setPage2"></Page>
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
        modal2: false,
        totalPage2: 0,
        formItem2: {
          dw: '',
          sj: '',
          _dw:'',
          current: 1,
          size: 10
        },
        time:'',
        formItem3:{
          dcsm:''
        },
        columns12: [
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
                title: '人次/车次',
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
        data12: [],
      }
    },
    methods: {
      //各公司与集团汇总
      ok2: function () {
        let time = '';
        if(this.formItem2._dw==''){
          this.formItem2.dw = ''
        }else {
          this.formItem2.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem2._dw];
        }
        if (this.formItem2.sj === '') {
          time = ''
        } else {
          time = this.$formatDate(this.formItem2.sj).substring(0, 7);
        }
        this.$getExcel(process.env.BASE_URL + this.$url.yyJtexportFgsxcyb + '?sj=' + time + '&dw=' + this.formItem2.dw + '&dcsm=' + this.formItem3.dcsm)
      },
      cancel2: function () {

      },
      getList: function () {
          console.log(this.formItem2)
        this.$fetch(this.$url.getjthzList, this.formItem2)
          .then(res => {
              console.log(res,'各公司与集团汇总')
            if (res.data.total === 0) {
              this.$Message.info('暂无数据')
              this.totalPage2 = res.data.total;
              this.data12 = res.data.records;
              res.data.records.forEach(item=>{
                item.sj = item.nd+'-'+item.yf
              });
            } else {
              res.data.records.forEach(item=>{
                item.sj = item.nd+'-'+item.yf
              });
              this.totalPage2 = res.data.total;
              this.data12 = res.data.records;
            }
          })
      },
      setPage2: function (current2) {
        this.formItem2.current = current2;
        this.getList();
      },
      search2: function () {
        this.formItem2.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem2._dw];
        if (this.formItem2.sj === '') {
          this.formItem2.sj = ''
        } else {
          this.formItem2.sj = this.$formatDate(this.formItem2.sj).substring(0, 7);
        }
        let year = this.formItem2.sj.substring(0,4)
        let month = this.formItem2.sj.substring(5,7)
        this.time = year+'年'+month+'月'
        this.getList();
      },
    },
    mounted () {
      let date = new Date;
      let year = (date.getFullYear()).toString();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month)-1;
      this.time = year+'年'+month+'月'
    }
  }
</script>

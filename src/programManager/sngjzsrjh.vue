<template>
  <div>
    <!--</router-link>-->
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
            <FormItem label="按年份查询" style="margin: 0;">
              <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end"
                          v-model="formItem.jhsj"></DatePicker>
              <Button type="primary" icon="ios-search" @click="search" v-has="'srjhzd_sngjzsr_search'">搜索</Button>
              <!--<Button type="primary" icon="android-download" @click="exports=true"-->
              <!--style="float: right">导入计划表-->
              <!--</Button>-->
              <Button type="primary" icon="android-download"
                      style="float: right;margin-right: 10px" @click="daochu" v-has="'srjhzd_sngjzsr_export'">导出Excel
              </Button>
              <Button type="primary" icon="android-download" @click="addProgram=true"
                      style="float: right;margin-right: 10px;" v-has="'srjhzd_sngjzsr_add'">计划生成
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!--修改-->
    <Modal
      v-model="addProgram"
      title="计划信息"
      @on-ok="ok"
      width="400"
      :mask-closable="false"
      style="height:auto;"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" v-if="this.type=='edit'" @click="update">修改
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" v-else @click="add">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <div style="height:auto">
        <Form :model="formItem1" :label-width="120">
          <FormItem label="路别" prop="lb" v-show="this.type!=='edit'">
            <CommonSelect type="LB" :selectValue="formItem1.lb" style="width: 195px;"></CommonSelect>
          </FormItem>
          <FormItem label="单位" prop="dw" v-show="this.type!=='edit'">
            <CommonSelect type="EJGS" :selectValue="formItem1.dw" style="width: 195px;"></CommonSelect>
          </FormItem>
          <FormItem label="类别" prop="lx" v-show="this.type!=='edit'">
            <Select v-model="formItem1.lx" style="width: 195px;">
              <Option value="大公交">大公交</Option>
              <Option value="中客车">中客车</Option>
            </Select>
          </FormItem>
          <FormItem label="本年预计">
            <Input v-model="formItem1.qnyj" placeholder="本年预计" style="width: 195px;"/>
          </FormItem>
          <FormItem label="本年计划">
            <Input v-model="formItem1.bnjh" placeholder="明年计划" style="width: 195px;"/>
          </FormItem>
          <FormItem label="本年计划车次">
            <Input v-model="formItem1.bnjhcc" placeholder="明年计划车次" style="width: 195px;"/>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <div style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.year}}年市内公交总收入计划制定
    </div>
    <Table stripe :columns="columns1" :data="data1" size="small" style="margin-top: 0px;"></Table>
    <Page :total="total" show-total style="margin-top: 10px;" @on-change="step"></Page>
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
        year:'',
        addProgram: false,
        exports: false,
        type: 0,
        total: 0,
        formItem: {
          current: 1,
          size: 10,
          jhsj: ''
        },
        formItem1: {
          lb: '',
          dw: '',
          lx: '',
          qnyj: '',
          bnjh: '',
          bnjhcc: ''
        },
        columns1: [
          {
            title: '单位',
            key: 'dw',
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.EJGS[params.row.dw];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '类型',
            key: 'lx'
          },
          {
            title: '路别',
            key: 'lb',
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.LB[params.row.lb];
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '前年实际',
            key: 'qannsj'
          },
          {
            title: '去年计划',
            key: 'qnjh'
          },

          {
            title: '去年1-10月',
            key: 'qnsj'
          },
          {
            title: '上年预计',
            key: 'qnyj'
          },
          {
            title: '本年计划',
            key: 'bnjh'
          },
          {
            title: '本年计划车次',
            key: 'bnjhcc'
          },
          {
            title: '去年每车次客运量',
            key: 'qnmcc'
          },
          {
            title: '前年每车次客运量',
            key: 'qannmcc'
          },
          {
            title: '操作',
            key: 'cz',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addProgram = true;
                      this.type = 'edit'
                      this.formItem1 = params.row
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'srjhzd_sngjzsr_edit',
                    }
                  ],
                }, '修改'),
              ]);
            }
          }
        ],
        data1: []
      }
    },
    methods: {
      ok() {
      },
      cancel() {
        this.type = '',
          this.formItem1 ={},
          // this.formItem1.dw = '',
          // this.formItem1.lx = '',
          // this.formItem1.qnyj = '',
          // this.formItem1.bnjh = '',
          // this.formItem1.bnjhcc = ''
        this.addProgram = false
      },
      step(current) {
        this.formItem.current = current
        this.getList()
      },
      add: function () {
        console.log(this.formItem1);
        this.$post(this.$url.saveSngj, this.formItem1)
          .then(res => {
            console.log(res);
            if (res.success === true) {
              this.$Message.info('添加成功')
              this.addProgram = false
              this.formItem1 ={},
              this.getList()
            } else {
              this.$Message.error('添加失败，计划已经制定')
              this.addProgram = false
              this.formItem1 ={}
            }
          })
      },
      update: function () {
        this.$post(this.$url.updateSnsrjh, this.formItem1)
          .then(res => {
            if (res.success === true) {
              this.$Message.info('修改成功')
              this.addProgram = false
              this.formItem1 ={}
              this.getList()
            } else {
              this.formItem1 ={}
              this.$Message.error('修改失败')
            }
          })
      },
      daochu: function () {
        if (this.formItem.jhsj == '') {
          this.formItem.jhsj = ''
        } else {
          this.formItem.jhsj = this.$formatDate(this.formItem.jhsj).substring(0, 4)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.sngjjhdc + '?jhsj=' + this.formItem.jhsj)
      },
      getList: function () {
        this.$fetch(this.$url.snjhList, this.formItem)
          .then(res => {
            console.log(res)
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无信息');
                this.data1 = res.data.records;
                this.total = res.data.total
              } else {
                // res.data.records.forEach(item => {
                //   // item.nd = item.nd.toString()
                // })
                this.data1 = res.data.records;
                this.total = res.data.total
              }
            }
          })
      },
      search: function () {
        if (this.formItem.jhsj == '') {
          this.formItem.jhsj = '';
          let date = new Date;
          let year = date.getFullYear();
          this.year = year+1
        } else {
          this.formItem.jhsj = this.$formatDate(this.formItem.jhsj).substring(0, 4)
          this.year = this.$formatDate(this.formItem.jhsj).substring(0, 4)
        }
        this.getList();
      }
    },
    mounted() {
      let date = new Date;
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.year = year+1;
    }
  }
</script>


<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
            <FormItem label="按年份查询" style="margin: 0;">
              <DatePicker type="year" placeholder="请选择年份" :transfer="true" placement="bottom-end"
                          v-model="formItem.jhsj"></DatePicker>
              <Button type="primary" icon="ios-search" @click="search" v-has="'srjhzd_fgssr_search'">搜索</Button>
              <Button type="primary" icon="plus" @click="addyp">添加月票计划</Button>

              <!--<Button type="primary" icon="android-download" @click="exports=true"-->
              <!--style="float: right;margin-right: 10px;">导入计划表-->
              <!--</Button>-->
              <Button type="primary" icon="android-download"
                      style="float: right;margin-right: 10px" @click="daochu" v-has="'srjhzd_fgssr_export'">导出Excel
              </Button>
              <!--<Button type="primary" icon="plus" @click="addProgram=true"-->
              <!--style="float: right;margin-right: 10px;" v-has="'srjhzd_fgssr_add'">新增-->
              <!--</Button>-->
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!--上传-->
    <Modal
      v-model="exports"
      title="导入计划表"
      @on-ok="ok"
      width="400"
      :mask-closable="false"
      style="height: auto"
      @on-cancel="quxiao">
      <Steps :current="0" direction="vertical">
        <Step title="第一步" content="下载收入计划报表模板"></Step>
        <Step title="第二步" content="上传报表"></Step>
        <Step title="第三部" content="系统自动导入"></Step>
      </Steps>
      <div style="display: flex;flex-direction: column;position: absolute;top:90px;margin-left: 240px;">
        <Button type="dashed" icon="android-download"
                style="margin-bottom: 10px;margin-top: -15px;width: 110px;">下载
        </Button>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button type="primary" icon="ios-cloud-upload-outline" style="width: 110px;margin-top: 17px;">上传</Button>
        </Upload>
      </div>
    </Modal>
    <!--新增计划-->
    <Modal
      v-model="addProgram"
      title="计划信息"
      @on-ok="ok"
      width="350"
      :mask-closable="false"
      style="height:auto"
      @on-cancel="quxiao">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="xiugai" v-if="this.type=='edit'">修改
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="save('formItem1')" v-else>新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="quxiao">取消</Button>
      </div>
      <div style="height:auto">
        <Form :model="formItem1" ref="formItem1" :rules="ruleValidate" :label-width="100">
          <FormItem label="单位" prop="dw">
            <!--<Select v-model="formItem1.dw" style="width: 195px;">-->
            <!--<Option value="公交一公司">公交一公司</Option>-->
            <!--<Option value="公交二公司">公交二公司</Option>-->
            <!--</Select>-->
            <CommonSelect type="EJGS" :selectValue="formItem1.dw" style="width: 195px;"></CommonSelect>
          </FormItem>
          <FormItem label="车辆类别" prop="lb">
            <Select v-model="formItem1.lb" style="width: 195px;">
              <Option value="大型">大型</Option>
              <Option value="中型">中型</Option>
              <Option value="小型">小型</Option>
            </Select>
          </FormItem>
          <FormItem label="年份" prop="jhsj">
            <DatePicker type="year" placeholder="请选择年份" :transfer="true" placement="bottom-end"
                        v-model="formItem1.jhsj"></DatePicker>
          </FormItem>
          <FormItem label="计划时间" prop="jhsj">
            <DatePicker type="date" placeholder="计划时间" :transfer="true" placement="bottom-end"
                        v-model="formItem1.jhsj"></DatePicker>
          </FormItem>
          <FormItem label="年度计划收入" prop="ndjh">
            <Input v-model="formItem1.ndjh" placeholder="年度计划" style="width: 195px;"/>
          </FormItem>
        </Form>
      </div>
    </Modal>
    <div
      style="margin-top: 10px;font-size: 18px;width: 100%;text-align: center;border: 1px solid #dddee1;height: 40px;line-height: 40px;font-weight: bold;border-bottom: 0">
      {{this.year}}年市内公交收入计划
    </div>
    <Table stripe :columns="columns1" :data="data1" size="small"></Table>
    <Page :total="total" show-total style="margin-top: 10px;" @on-change="step"></Page>
    <Table stripe :columns="columns2" :data="data2" size="small" style="margin-top: 20px"></Table>

    <Modal
      v-model="add_yp"
      title="添加月票计划"
      width="340"
      @on-cancel="cancel_ypjh">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="save_ypjh">新增
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel_ypjh">取消</Button>
      </div>
      <Form :model="formItem3" :label-width="80">
        <FormItem label="年份">
          <DatePicker type="year" placeholder="选择年份" v-model="formItem3.time" style="width: 190px"></DatePicker>
        </FormItem>
        <FormItem label="实际">
          <Input v-model="formItem3.bnjh" placeholder="实际" style="width: 190px"></Input>
        </FormItem>
      </Form>
    </Modal>


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
        add_yp: false,
        year: '',
        addProgram: false,
        exports: false,
        type: '',
        total: 0,
        formItem3: {
          bnjh: '',
          jhsj: '',
          time: ''
        },
        formItem: {
          jhsj: 'Tue Jan 01 2019 00:00:00 GMT+0800',
          current: 1,
          size: 10
        },
        ruleValidate: {
          dw: [
            {required: true, message: '必填字段', trigger: 'change'}
          ], lb: [
            {required: true, message: '必填字段', trigger: 'change'}
          ], jhsj: [
            {required: true, message: '必填字段', trigger: 'blur', type: 'date'}
          ], ndjh: [
            {required: true, message: '必填字段', trigger: 'blur'}
          ], jhsj: [
            {required: true, message: '必填字段', trigger: 'blur', type: 'date'}
          ],
        },
        formItem1: {
          dw: '',
          lb: '',
          jhsj: '',
          year: '',
          ndjh: ''
        },
        columns2:[
          {
            title: '类别',
            key: 'lx'
          },

          {
            title: '年度计划',
            key: 'bnjh'
          },
        ],
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
            title: '类别',
            key: 'lx'
          },
          {
            title: '年度计划（万元）',
            key: 'bnjh'
          },
          // {
          //   title: '编制单位',
          //   key: 'bzsj'
          // },
          // {
          //   title: '制定时间',
          //   key: 'bzsj'
          // }
          // ,
          // {
          //   title: '计划时间',
          //   key: 'jhsj'
          // },
          // {
          //   title: '操作',
          //   key: 'cz',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Poptip', {
          //         props: {
          //           cojhsjirm: true,
          //           type: 'error',
          //           size: 'large',
          //           title: '你确定要删除吗?'
          //         },
          //         on: {
          //           'on-ok': () => {
          //             //console.log(params.row.id)
          //             this.$fetch(this.$url.delFgssrjh, {id: params.row.id})
          //               .then(res => {
          //                 //console.log(res)
          //                 if (res.success === true) {
          //                   this.$Message.ijhsjo('删除成功')
          //                   this.getList()
          //                 } else {
          //                   this.$Message.error('删除失败')
          //                 }
          //               })
          //           }
          //         }
          //       }, [
          //         h('Button', {
          //           props: {
          //             type: 'error',
          //             size: 'small'
          //           },
          //           style: {
          //             marginRight: '5px'
          //           },
          //           directives: [
          //             {
          //               name: 'has',
          //               value: 'srjhzd_fgssr_delete',
          //             }
          //           ],
          //         }, '删除')]),
          //       h('Button', {
          //         props: {
          //           type: 'primary',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             //console.log(params.row);
          //             this.type = 'edit';
          //             this.addProgram = true;
          //             this.formItem1 = params.row
          //           }
          //         },
          //         directives: [
          //           {
          //             name: 'has',
          //             value: 'srjhzd_fgssr_edit',
          //           }
          //         ],
          //       }, '修改'),
          //     ]);
          //   }
          // }
        ],
        data1: []
      }
    },
    methods: {
      ok() {
        // this.$Message.ijhsjo('Clicked ok');
      },
      addyp() {
        this.add_yp = true
      },
      cancel_ypjh() {
        this.formItem3.bnjh = '',
          this.formItem3.jhsj = '',
          this.formItem3.time = ''
      },
      save_ypjh() {
        this.formItem3.jhsj = this.$formatDate(this.formItem3.time).substring(0, 4)
        this.$post(this.$url.insertYuePiao, this.formItem3)
          .then(res => {
            console.log(res, '***********************')
            if (res.success === true) {
              this.$Message.success('添加成功');
              this.add_yp = false
              this.formItem3.bnjh = '',
                this.formItem3.jhsj = '',
                this.formItem3.time = ''
              this.getList()
            } else {
              this.$Message.error('添加失败');
              this.add_yp = false
              this.formItem3.bnjh = '',
                this.formItem3.jhsj = '',
                this.formItem3.time = ''
            }
          })
      },
      step(current) {
        this.formItem.current = current
        this.getList()
      },
      quxiao() {
        this.getList();
        this.type = '',
          this.formItem1 = {}
        this.addProgram = false
      },
      getList: function () {
        if (this.formItem.jhsj == '') {
          this.formItem.jhsj = '';
          let date = new Date;
          let year = date.getFullYear();
          this.year = year + 1
        } else {
          this.formItem.jhsj = this.$formatDate(this.formItem.jhsj).substring(0, 4)
          this.year = this.$formatDate(this.formItem.jhsj).substring(0, 4)
        }
        this.$fetch(this.$url.fgssrjhList, this.formItem)
          .then(res => {
            console.log(res, '***********************')
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无信息');
                this.data1 = res.data.records;
                this.data2 = res.data1;
                this.total = res.data.total
              } else {
                this.data1 = res.data.records;
                this.data2 = res.data1;
                this.total = res.data.total
              }
            }
          })
      },
      search: function () {
        console.log(this.formItem)
        if (this.formItem.jhsj == '') {
          this.formItem.jhsj = '';
          let date = new Date;
          let year = date.getFullYear();
          this.year = year + 1
        } else {
          this.formItem.jhsj = this.$formatDate(this.formItem.jhsj).substring(0, 4)
          this.year = this.$formatDate(this.formItem.jhsj).substring(0, 4)
        }
        //console.log(this.formItem)
        this.getList()
      },

      daochu: function () {
        if (this.formItem.jhsj == '') {
          this.formItem.jhsj = ''
        } else {
          this.formItem.jhsj = this.$formatDate(this.formItem.jhsj).substring(0, 4)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.fgssrjhdc + '?jhsj=' + this.formItem.jhsj)
      },
    },
    mounted() {
      let date = new Date;
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      month = (month < 10 ? "0" + month : month);
      this.year = year + 1;
    }
  }
</script>


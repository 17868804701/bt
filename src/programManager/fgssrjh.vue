<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
          <FormItem label="按年份查询" style="margin: 0;">
            <DatePicker type="year" placeholder="请选择年份" :transfer="true" placement="bottom-end"
                        v-model="formItem.nf"></DatePicker>
            <Button type="primary" icon="ios-search" @click="search" v-has="'srjhzd_fgssr_search'">搜索</Button>


            <!--<Button type="primary" icon="android-download" @click="exports=true"-->
            <!--style="float: right;margin-right: 10px;">导入计划表-->
            <!--</Button>-->
            <Button type="primary" icon="android-download"
                    style="float: right;margin-right: 10px" @click="daochu" v-has="'srjhzd_fgssr_export'">导出Excel
            </Button>
            <Button type="primary" icon="plus" @click="addProgram=true"
                    style="float: right;margin-right: 10px;" v-has="'srjhzd_fgssr_add'">新增
            </Button>
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
            <Select v-model="formItem1.dw" style="width: 195px;">
              <Option value="公交一公司">公交一公司</Option>
              <Option value="公交二公司">公交二公司</Option>
            </Select>
          </FormItem>
          <FormItem label="车辆类别" prop="lb">
            <Select v-model="formItem1.lb" style="width: 195px;">
              <Option value="中型">中型</Option>
              <Option value="大型">大型</Option>
            </Select>
          </FormItem>
          <FormItem label="年份" prop="nf">
            <DatePicker type="year" placeholder="请选择年份" :transfer="true" placement="bottom-end"
                        v-model="formItem1.nf"></DatePicker>
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
    <Table stripe :columns="columns1" :data="data1" size="small" style="margin-top: 10px;"></Table>
    <Page :total="total" show-total style="margin-top: 10px;" @on-change="step"></Page>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        addProgram: false,
        exports: false,
        type: '',
        total:'',
        formItem: {
          nf: '',
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
          ], nf: [
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
        columns1: [
          {
            title: '单位',
            key: 'dw'
          },
          {
            title: '年份',
            key: 'nf'
          },
          {
            title: '类别',
            key: 'lb'
          },
          {
            title: '年度计划（万元）',
            key: 'ndjh'
          },
          {
            title: '编制时间',
            key: 'bzsj'
          }
          ,
          {
            title: '计划时间',
            key: 'jhsj'
          },
          {
            title: '操作',
            key: 'cz',
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    type: 'error',
                    size: 'large',
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      //console.log(params.row.id)
                      this.$fetch(this.$url.delFgssrjh, {id: params.row.id})
                        .then(res => {
                          //console.log(res)
                          if (res.success === true) {
                            this.$Message.info('删除成功')
                            this.getList()
                          } else {
                            this.$Message.error('删除失败')
                          }
                        })
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    directives: [
                      {
                        name: 'has',
                        value: 'srjhzd_fgssr_delete',
                      }
                    ],
                  }, '删除')]),
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
                      //console.log(params.row);
                      this.type = 'edit';
                      this.addProgram = true;
                      this.formItem1 = params.row
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'srjhzd_fgssr_edit',
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
      ok () {
        this.$Message.info('Clicked ok');
      },
      step(current){
        this.formItem.current = current
        this.getList()
      },
      quxiao () {
        this.getList();
        this.type = '',
          this.formItem1 = {}
        this.addProgram = false
      },
      getList: function () {
        this.$fetch(this.$url.fgssrjhList, this.formItem)
          .then(res => {
            //console.log(res,'***********************')
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无信息');
                this.data1 = res.data.records;
                this.total = res.data.total
              } else {
                res.data.records.forEach(item => {
                  item.bzsj = this.$formatDate(item.bzsj).substring(0, 10)
                  item.jhsj = this.$formatDate(item.jhsj).substring(0, 10)
                  item.nf = item.nf.toString()
                });
                this.data1 = res.data.records;
                this.total = res.data.total
              }
            }
          })
      },
      save: function (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formItem1.nf = this.$formatDate(this.formItem1.nf).substring(0, 4)
            this.formItem1.jhsj = this.$formatDate(this.formItem1.jhsj).substring(0, 10)
            //console.log(this.formItem1);
            this.$post(this.$url.saveFgssrjh, this.formItem1)
              .then(res => {
                //console.log(res)
                if (res.success === true) {
                  this.$Message.info('添加成功')
                  this.getList();
                  this.formItem1 = {}
                  this.addProgram = false
                }
              })
          } else {
            this.$Message.error('请填写完整字段!');
          }
        });
      },
      search: function () {
        if (this.formItem.nf == '') {
          this.formItem.nf = ''
        } else {
          this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0, 4)
        }
        //console.log(this.formItem)
        this.getList()
      },
      xiugai: function () {
        //console.log(this.formItem1)
        this.formItem1.nf = this.$formatDate(this.formItem1.nf).substring(0, 4)
        this.formItem1.jhsj = this.$formatDate(this.formItem1.jhsj).substring(0, 10)
        this.$post(this.$url.updatefgssrjh, this.formItem1)
          .then(res => {
            //console.log(res)
            if (res.success === true) {
              this.$Message.info('修改成功');
              this.addProgram = false
              this.getList()
            } else {
              this.$Message.error('修改失败')
            }
          })
      },

      daochu: function () {
        if (this.formItem.nf == '') {
          this.formItem.nf = ''
        } else {
          this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0, 4)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.fgssrjhdc + '?nf=' + this.formItem.nf)
      },
    },
    mounted () {

    }
  }
</script>


<template>
  <div>
    <!--</router-link>-->
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
          <FormItem label="按年份查询" style="margin: 0;">
            <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end"
                        v-model="formItem.nf"></DatePicker>
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
    <!--上传-->
    <Modal
      v-model="exports"
      title="导入计划表"
      @on-ok="ok"
      width="400"
      :mask-closable="false"
      style="height:auto"
      @on-cancel="cancel">
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
          <FormItem label="路别" v-show="this.type!=='edit'">
            <Select v-model="formItem1.lb" style="width: 195px;">
              <Option value="102路">102路</Option>
              <Option value="103路">103路</Option>
              <Option value="286路">286路</Option>
            </Select>
          </FormItem>
          <FormItem label="本期实际">
            <Input v-model="formItem1.bqsj" placeholder="本年1-10月本期" style="width: 195px;"/>
          </FormItem>
          <FormItem label="明年预计">
            <Input v-model="formItem1.mnyj" placeholder="明年计划" style="width: 195px;"/>
          </FormItem>
          <FormItem label="明年计划车次">
            <Input v-model="formItem1.mnjhcc" placeholder="明年计划车次" style="width: 195px;"/>
          </FormItem>
          <FormItem label="本年客运量">
            <Input v-model="formItem1.bnkyl" placeholder="本年每车次客运量" style="width: 195px;"/>
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
          current: 1,
          size: 10,
          nf: ''
        },
        formItem1: {
          lb: '',
          bqsj: '',
          mnyj: '',
          mnjhcc: '',
          bnkyl: ''
        },
        columns1: [
          {
            title: '单位',
            key: 'dw'
          },
          {
            title: '年度',
            key: 'nd'
          },
          {
            title: '路别',
            key: 'lb'
          },
          {
            title: '前年实际（万元）',
            key: 'qnsj'
          },
          {
            title: '去年计划（万元）',
            key: 'bnjh'
          },

          {
            title: '1-10月本期',
            key: 'bqsj'
          },
          {
            title: '去年预计1（万）',
            key: 'bnyj'
          },
          {
            title: '本年计划（万）',
            key: 'mnyj'
          },
          {
            title: '本年计划车次（万）',
            key: 'mnjhcc'
          },
          {
            title: '去年每车次客运量（万）',
            key: 'bnkyl'
          },
          {
            title: '前年每车次客运量（万）',
            key: 'qnkyl'
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
      ok () {
      },
      cancel () {
        this.type = ''
      },
      step(current){
        this.formItem.current = current
        this.getList()
      },
      add: function () {
        //console.log(this.formItem1);
        this.$post(this.$url.saveSngj + '?lb=' + this.formItem1.lb + '&bqsj=' + this.formItem1.bqsj + '&mnyj=' + this.formItem1.mnyj + '&mnjhcc=' + this.formItem1.mnjhcc + '&bnkyl=' + this.formItem1.bnkyl)
          .then(res => {
            //console.log(res);
            if (res.success === true) {
              this.$Message.info('添加成功')
              this.addProgram = false
              this.getList()
            } else if(res.msg === '保存失败，本年改线路计划已存在'){
              this.$Message.error('保存失败，本年改线路计划已存在')
            } else {
              this.$Message.error('添加失败')
            }
          })
      },
      update: function () {
        this.$post(this.$url.updateSnsrjh, this.formItem1)
          .then(res => {
            //console.log(res);
            if (res.success === true) {
              this.$Message.info('修改成功')
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
        this.$getExcel(process.env.BASE_URL + this.$url.sngjjhdc + '?nf=' + this.formItem.nf)
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
                res.data.records.forEach(item => {
                  item.nd = item.nd.toString()
                })
                this.data1 = res.data.records;
                this.total = res.data.total
              }
            }
          })
      },
      search: function () {
        if (this.formItem.nf == '') {
          this.formItem.nf = ''
        } else {
          this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0, 4)
        }
        this.getList();
      }
    },
    mounted(){

    }
  }
</script>


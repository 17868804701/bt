<!--维修工信息管理-->

<template>

  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Modal
        v-model="exportModal"
        title="导入计划表"
        width="50%"
        :mask-closable="false"
        :closable="false"
        style="height:auto;">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="exportModal = false">关闭</Button>
        </div>
        <Steps :current="currentStep" direction="vertical">
          <Step title="第一步" content="下载导入报表模板"></Step>
          <Step title="第二步" content="上传报表"></Step>
        </Steps>
        <div style="display: flex;flex-direction: column;position: absolute;top:90px;margin-left: 240px;">
          <Button type="dashed" icon="android-download" style="margin-bottom: 10px;margin-top: -15px;width: 110px;" @click="download">下载</Button>
          <Upload :headers="header" :action='uploadFile' name="multipartFile" :on-success="handleSuccess" :show-upload-list="false" :format ="['xlsx']">
            <Button type="primary" icon="ios-cloud-upload-outline" style="width: 110px;margin-top: 17px;">上传</Button>
          </Upload>
        </div>
      </Modal>
      <!--新增维修工-->
      <Modal
        v-model="addModal"
        title="配件信息"
        width="50%"
        :mask-closable="false"
        :closable="false">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="clickSaveBtn('pjxx')">保存</Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancle">取消</Button>
        </div>
        <div style="padding: 0px; height: 100%;">
          <Form :model="pjxx" ref="pjxx" :rules="ruleValidate" :label-width="90">
            <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
              <FormItem prop="spbm" label="商品编码" style="margin-top: 0px;">
                <Input v-model="pjxx.spbm" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="wpmc" label="物品名称" style="margin-top: 0px;">
                <Input v-model="pjxx.wpmc" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="wpflmc" label="物品分类" style="margin-top: 0px;">
                <Select v-model="pjxx.wpflmc" style="width: 110px;">
                  <Option value="清洗类">清洗类</Option>
                  <Option value="轮胎">轮胎</Option>
                  <Option value="润滑油">润滑油</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </FormItem>
              <FormItem prop="dw" label="单位" style="margin-top: 0px;">
                <Input v-model="pjxx.dw" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="jhj" label="计划价" style="margin-top: 0px;">
                <Input v-model="pjxx.jhj" style="width: 110px;"></Input>
              </FormItem>
              <FormItem prop="gys" label="供应商" style="margin-top: 0px;">
                <Input v-model="pjxx.gys" style="width: 110px;"></Input>
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
      <Card>
        <Form :model="formItem">
          <FormItem label="按物品名称查询" style="margin: 0;">
            <Input v-model="formItem.wpmc" style="width: 120px;"></Input>
            <Button type="primary" icon="ios-search" @click="search" v-has="'jcsjgl_pjxxgl_search'">搜索</Button>
            <Button type="primary" icon="plus" style="float: right;margin-right: 10px;" @click="addModal=true" v-has="'jcsjgl_pjxxgl_add'">新增</Button>
            <Button type="primary" icon="android-download" style="float: right;margin-right: 10px" @click="exportExcel" v-has="'jcsjgl_pjxxgl_export'">导出</Button>
            <Button type="primary" size="default" style="float: right;margin-right: 10px;" @click="exportModal=true" v-has="'jcsjgl_pjxxgl_upload'"><Icon type="android-upload"></Icon>导入</Button>
          </FormItem>
        </Form>
      </Card>
        <span style="color: red;display: inline-block;margin-top: 10px;">*备注：在录入备料信息的时候单位那个字段填写规格、单位两个值，写在一起，规格在前，单位在后，中间用‘-’分开  如“15w/40-kg”</span>
      <Table style="margin-top: 10px;" :data="tableData" :columns="columns" border></Table>
      <Page :total="totalSize" show-total style="margin-top: 10px;" @on-change="setPage"></Page>
    </div>
  </div>
</template>
<script>
  import canEditTable from '../../components/common/canEditTable.vue';
  import CommonSelect from '../../components/common/CommonSelect.vue';
  import * as DateTool from '../../../utils/DateTool';
  import VueCookie from 'vue-cookie';
  import axios from 'axios';
  export default {
    components: {
      canEditTable,
      CommonSelect,
    },
    data () {
      return {
        currentStep: 1,
        formItem: {
          wpmc: '',
          currPage: 1,
          pageSize: 10,
        },
        header: {
          'Authorization': 'bearer ' + VueCookie.get('access_token'),
        },
        uploadFile: process.env.BASE_URL + "/weix/dataDictionary/updatePJXX",
        totalSize: 0,
        addModal: false,
        exportModal: false,
        pjxx: {
          id: "",
          dw: "",
          gys: "",
          jhj: "",
          spbm: "",
          wpflmc: "",
          wpmc: ""
        },
        ruleValidate: {
          dw: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          gys: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          jhj: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          spbm: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          wpflmc: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
          wpmc: [
            { required: true, message: '此项为必填字段', trigger: 'blur' },
          ],
        },
        columns: [
          {
            title: '序号',
            type: 'index',
            align: 'center',
            width: 60,
          },
          {
            title: '商品编码',
            key: 'spbm',
            align: 'center',
          },
          {
            title: '物品名称',
            key: 'wpmc',
            align: 'center',
          },
          {
            title: '物品分类名称',
            key: 'wpflmc',
            align: 'center',
          },
          {
            title: '单位',
            key: 'dw',
            align: 'center',
          },
          {
            title: '计划价',
            key: 'jhj',
            align: 'center',
          },
          {
            title: '供应商',
            key: 'gys',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '您确定要删除这条数据吗?',
                    transfer: true
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteRow(params);
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      placement: 'top'
                    },
                    directives: [
                      {
                        name: 'has',
                        value: 'jcsjgl_pjxxgl_delete',
                      }
                    ]
                  }, '删除')
                ]),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '10px'
                  },
                  on: {
                    click: () => {
                      for (let attr in this.pjxx) {
                        this.pjxx[attr] = params.row[attr];
                      }
                      this.addModal = true;
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'jcsjgl_pjxxgl_update',
                    }
                  ]
                }, '修改')
              ]);
            }
          },
        ],
        tableData: [],
      }
    },
    computed: {

    },
    methods: {
      setPage(page) {
        this.formItem.currPage = page;
        this.requestListData();
      },
      search() {
        this.formItem.currPage = 1;
        this.requestListData();
      },
      requestListData() {
        let that = this;
        this.$fetch(this.$url.maintain_BYGL_DATA_PGXX_list, this.formItem)
        .then(res => {
//          console.log(res);
          if (res.code === 0) {
            that.formItem.currPage = 1;
            that.tableData = res.page.records;
            that.totalSize = res.page.total;
          }else{
            that.$Message.error('请求失败!');
          }
        })
      },
      clickSaveBtn(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveOrUpdate();
          } else {
            this.$Message.error('请按照规则来填写内容!');
          }
        })
      },
      cancle() {
        this.addModal = false;
        this.pjxx = {
          id: "",
          dw: "",
          gys: "",
          jhj: "",
          spbm: "",
          wpflmc: "",
          wpmc: ""
        }
      },
      saveOrUpdate() {
//        console.log(this.pjxx);
        let that = this;
        this.$post(this.$url.maintain_BYGL_DATA_PGXX_saveOrUpdate, this.pjxx)
        .then(res => {
//          console.log(res);
          if (res.code === 0) {
            that.$Message.success('保存成功!');
            that.addModal = false;
            that.pjxx = {
              id: "",
              dw: "",
              gys: "",
              jhj: "",
              spbm: "",
              wpflmc: "",
              wpmc: ""
            }
            that.requestListData();
          }else{
            that.$Message.error('保存失败, 请重试!');
          }
        })
      },
      deleteRow(params) {
        let url = this.$url.maintain_BYGL_DATA_PGXX_delete;
        url = url + '?id=' + params.row.id;
        let that = this;
        this.$post(url)
        .then(res => {
          if (res.code === 0) {
            that.$Message.success('删除成功!');
            that.requestListData();
          } else {
            that.$Message.error('删除失败, 请重试!');
          }
        })
      },
      handleSuccess(res) {
//        debugger
        if (res.code === 0) {
          this.$Message.success('上传成功');
          this.exportModal = false;
        }else{
          this.$Message.error(res.msg);
        }
      },
      exportExcel() {
        let url = this.$url.maintain_BYGL_DATA_PGXX_exportExcel;
//        url = url + '?currPage='+this.formItem.currPage+'&pageSize='+this.formItem.pageSize;
        this.$getExcel(url);
      },
      download() {
        let url = this.$url.maintain_BYGL_DATA_PGXX_download;
        url = url+'?tmpName=PJXXGL';
        this.$getExcel(url);
      }
    },
    mounted () {

    }
  }
</script>


<!--商品编码、物品名称、物品分类名称、单位、计划价、供应商-->

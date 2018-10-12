<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
          <FormItem label="按年份查询" style="margin: 0;">
            <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end"
                        v-model="formItem.nf"></DatePicker>
            <Button type="primary" icon="ios-search" @click="search" v-has="'yyjhgl_jtgsyyjh_search'">搜索</Button>
            <Button type="primary" icon="android-download" style="position: absolute;right: 0" @click="daochu" v-has="'yyjhgl_jtgsyyjh_export'">导出excel</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <!--修改-->
    <Modal
      v-model="editProgram"
      title="修改"
      @on-ok="ok"
      width="500"
      :mask-closable="false"
      style="height: auto"
      :scrollable="true"
      @on-cancel="cancel">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="update">确定
        </Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="editCrksm" :label-width="90">
        <div style="display: flex;flex-wrap: wrap">
          <FormItem label="出入库说明">
            <Input v-model="editCrksm.crksm" style="width:200%" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="出入库说明"></Input>
          </FormItem>
        </div>
      </Form>
    </Modal>
    <Table border :columns="columns11" size="small" :data="data10" style="margin-top: 20px;"></Table>
    <Page :total="total" show-total  style="margin-top: 10px;" @on-change="step"/>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          nf: '',
          current: 1,
          size: 10
        },
        total:0,
        editCrksm:{
          crksm:'',
          id:''
        },
        editProgram:false,
        totalPage: '',
        columns11: [
          {
            title: '年份',
            key: 'nf',
            align: 'center',
            width: 100,
          },
          {
            title: '路线长度',
            key: 'xlcd',
            align: 'center',
            width: 100,
          },
          {
            title: '配车数',
            align: 'center',
            children: [
              {
                title: '班车',
                key: 'bcs',
                align: 'center',
                width: 100,
              },
              {
                title: '备用',
                key: 'bys',
                align: 'center',
                width: 100,
              },
              {
                title: '合计',
                key: 'xj',
                align: 'center',
                width: 100,
              },
            ]
          },
          {
            title: '车次',
            align: 'center',
            children: [
              {
                title: '日车次',
                key: 'rcc',
                align: 'center',
                width: 100,
              },
              {
                title: '年度车次',
                key: 'ndcc',
                align: 'center',
                width: 100,
              },
            ]
          },

          {
            title: '运营里程',
            align: 'center',
            children: [
              {
                title: '日里程',
                key: 'rlc',
                align: 'center',
                width: 100,
              },
              {
                title: '年度里程',
                key: 'ndlc',
                align: 'center',
                width: 100,
              },
            ]
          },
          {
            title: '非运营里程',
            align: 'center',
            children: [
              {
                title: '出入库加气里程',
                align: 'center',
                width: 100,
                children: [
                  {
                    title: '日出入库里程',
                    key: 'rcrklc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '年度里程',
                    key: 'crkndlc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '日加气里程',
                    key: 'rjqlc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '年度加气里程',
                    key: 'rjqndlc',
                    align: 'center',
                    width: 100,
                  },
                  {
                    title: '非运营小计',
                    key: 'fyyxj',
                    align: 'center',
                    width: 100,
                  }
                ]
              },
              {
                title: '备用车年度里程',
                key: 'bycndlc',
                align: 'center',
                width: 100,
              },
              {
                title: '合计',
                key: 'fyyhj',
                align: 'center',
                width: 100,
              },
            ]
          },
          {
            title: '出入库台数',
            key: 'crkts',
            align: 'center',
            width: 120,
//            fixed: 'right',
          },
          {
            title: '加气台数',
            key: 'jqts',
            align: 'center',
            width: 100,
          },
          {
            title: '出入库说明',
            key: 'crksm',
            align: 'center',
            width: 220,
            editable: true
          },
          {
            title: '操作',
            align: 'center',
            width: 170,
            fixed: 'right',
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
                      this.editProgram = true;
                      //console.log(params.row.crksm);
                      this.editCrksm.crksm = params.row.crksm;
                      this.editCrksm.id = params.row.id;
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'yyjhgl_jtgsyyjh_edit',
                    }
                  ],
                }, '修改')
              ]);
            }
          }
        ],
        data10: []
      }
    },
    methods: {
      step(current){
        this.formItem.current = current
        this.getList()
      },
      getList: function () {
          //console.log(this.formItem)
        this.$fetch(this.$url.jtgsList, this.formItem)
          .then(res => {
            if (res.success === true) {
              if (res.data.total === 0) {
                this.$Message.info('暂无信息');
                this.data10 = res.data.records;
                this.total = res.data.total
              } else {
                this.data10 = res.data.records;
                this.total = res.data.total
              }
            }
          })
      },
      search: function () {
          if(this.formItem.nf===''){
            this.formItem.nf = ''
          }else {
            this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0, 4);
          }
           this.getList();
      },
      update:function () {
        let url = this.$url.updateJtgs;
        url += '?id='+this.editCrksm.id + '&crksm=' + this.editCrksm.crksm;
        this.$post(url)
          .then(res => {
            if (res.success === true) {
              this.$Message.info('修改成功')
              this.editProgram = false
              this.getList()
            }else {
              this.$Message.error('修改失败')
            }
          })
      },
      daochu:function () {
          if(this.formItem.nf==''){
              this.formItem.nf =''
          }else {
              this.formItem.nf = this.$formatDate(this.formItem.nf).substring(0,4)
          }
          //console.log(this.formItem.nf)
          this.$getExcel(process.env.BASE_URL + this.$url.daochujtyyjh+'?nf='+this.formItem.nf)
      },
      cancel:function () {
        this.editProgram = false
      },
      ok:function () {

      }
    },
    mounted () {
      this.getList()
    }
  }
</script>


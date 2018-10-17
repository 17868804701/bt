<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 10px;
  }

  .container h2 {
    margin-left: 15px;

  }

  .search_btn {
    margin-left: 10px;
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

  .btn {
    position: absolute;
    right: 20px;
  }
</style>
<template>
  <div>
    <Card style="padding-left: 15px;">
      <Form :model="formItem1" :label-width="110">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="daterange" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <FormItem label="部门" style="margin-bottom: 0px" prop="bm">
            <CommonSelect type="EJGS"  :selectValue="formItem1.bm" style="width: 180px;"></CommonSelect>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search2" v-has="'kfxxlbym_dwcllb_search'">
            查询
          </Button>
          <Button type="primary" icon="android-download" class="search_btn" @click="plcl"
                  v-has="'kfxxlbym_dwcllb_mutipledeal'">批量处理
          </Button>
        </div>
      </Form>
    </Card>
    <Table :columns="columns12" :data="data12" border height="470" style="margin-top: 10px;" size="small"
           @on-selection-change="selectAll"></Table>
    <Page :total="totalPage1" show-total style="margin-top: 10px;" @on-change="setp1"></Page>

    <!--批量处理-->
    <Modal
      v-model="modal1"
      width="500"
      @on-cancel="cancel"
      title="填写反馈信息">
      <div slot="footer" style="height: 30px;">
        <Button type="primary" style="float: right;margin-right: 10px" @click="plclOk">确定</Button>
        <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
      </div>
      <Form :model="formItem2" :label-width="100">
        <FormItem label="反馈信息">
          <Input style="width: 350px;" v-model="cljg" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="填写反馈信息"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  import CommonSelect from '../../components/common/CommonSelect.vue'
  export default {
    components: {
      CommonSelect,
    },
    data () {
      return {
        time:'',
        formItem1: {
          current: 1,
          size: 10,
          bm:'',
          startTime: '',
          endTime: ''
        },
        formItem2: {
          ids: []
        },
        cljg: '',
        modal1: false,
        totalPage: 0,
        totalPage1: 0,
        selection: [],
        columns12: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '部门',
            key: 'bm',
            align: 'center',
            width: 120,
            render: (h, params) => {
              let texts = '';
              if(params.row.bm=='运营部'){
                texts='运营部'
              }else {
                texts = this.$store.state.dictData.parseDict.EJGS[params.row.bm];
              }
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '投诉时间',
            key: 'tssj',
            align: 'center',
            width: 120,
          }, {
            title: '线路',
            key: 'xl',
            align: 'center',
            width: 120,
            render: (h, params) => {
              let texts = '';
              texts = this.$store.state.dictData.parseDict.LB[params.row.xl];
              return h('div', {
                props: {},
              }, texts)
            }
          }, {
            title: '车号',
            key: 'ch',
            align: 'center',
            width: 120,
          }, {
            title: '投诉人姓名',
            key: 'tsr',
            align: 'center',
            width: 120,
          }, {
            title: '联系电话',
            key: 'lxdh',
            align: 'center',
            width: 120,
          }, {
            title: '类别',
            key: 'tslb',
            align: 'center',
            width: 120,
            render: (h, params) => {
              let texts = '';
              if (params.row.tslb === 'DZBTC') {
                texts = '到站不停车'
              } else if (params.row.tslb === 'JZ') {
                texts = '拒载'
              } else if (params.row.tslb === 'DJG') {
                texts = '大间隔'
              } else if (params.row.tslb === 'FWTDC') {
                texts = '服务态度差'
              } else if (params.row.tslb === 'TXYY') {
                texts = '脱线运营'
              } else if (params.row.tslb === 'SJSG') {
                texts = '摔夹事故'
              } else if (params.row.tslb === 'ICKFM') {
                texts = '刷IC卡方面'
              } else if (params.row.tslb === 'QT') {
                texts = '其他'
              }
              return h('div', {
                props: {},
              }, texts)
            }
          }, {
            title: '来电/来访',
            key: 'lfxs',
            align: 'center',
            width: 120,
            render: (h, params) => {
              let texts = '';
              if (params.row.lfxs == 0) {
                texts = '来电'
              } else if (params.row.lfxs == 1) {
                texts = '来访'
              }
              return h('div', {
                props: {},
              }, texts)
            }
          }, {
            title: '事由',
            key: 'sy',
            align: 'center',
            width: 260,
          }, {
            title: '记录人',
            key: 'jlr',
            align: 'center',
            width: 120,
          },
          // {
          //   title: '状态',
          //   key: 'zt',
          //   align: 'center',
          //   width: 120,
          //   render: (h, params) => {
          //     let texts = '';
          //     if (params.row.zt == 1) {
          //       texts = '处理中'
          //     } else if (params.row.zt == 2) {
          //       texts = '处理完成'
          //     }
          //     return h('div', {
          //       props: {},
          //     }, texts)
          //   }
          // },
          // {
          //   title: '处理结果',
          //   key: 'cljg',
          //   align: 'center',
          //   width: 120,
          // },
          {
            title: '备注',
            key: 'bz',
            align: 'center',
            width: 120,
          }, {
            title: '事件类别',
            key: 'sjlb',
            align: 'center',
            width: 120,
            render: (h, params) => {
              let texts = '';
              if (params.row.sjlb == 0) {
                texts = '责任性事件'
              } else if (params.row.sjlb == 1) {
                texts = '疑难性事件'
              } else if (params.row.sjlb == 2) {
                texts = '普通事件'
              }
              return h('div', {
                props: {},
              }, texts)
            }
          }, {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 220,
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
                      //console.log(params.row.id);
                      this.formItem2.ids.push(params.row.id)
                      //console.log(this.formItem2.ids)
                      this.modal1 = true;
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'kfxxlbym_dwcllb_deal',
                    }
                  ],
                }, '处理'),
              ]);
            }
          },
        ],
        data12: []
      }
    },
    methods: {
      //        待我处理客服信息列表
      getList: function () {
        this.$fetch(this.$url.dwclkfxx, this.formItem1)
          .then(res => {
            //console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无数据');
              this.data12 = res.data.records;
              this.totalPage1 = res.data.total;
            } else {
              res.data.records.forEach(item => {
                item.tssj = DateTool.timesToDate(item.tssj)
              });
              this.data12 = res.data.records;
              this.totalPage1 = res.data.total;
            }
          })
      },
      search2: function () {
        this.formItem1.startTime = this.time[0];
        this.formItem1.endTime = this.time[1];
        if (this.formItem1.startTime === '') {
          this.formItem1.startTime = ''
        } else {
          this.formItem1.startTime = this.$formatDate(this.formItem1.startTime).substring(0, 10)
        }
        if (this.formItem1.endTime === '') {
          this.formItem1.endTime = ''
        } else {
          this.formItem1.endTime = this.$formatDate(this.formItem1.endTime).substring(0, 10)
        }
        this.getList()
        // if (this.time == '') {
        //     this.formItem1.startTime = '',
        //     this.formItem1.endTime = '',
        //     this.getList()
        // } else {
        //   let start1 = DateTool.timesToDate(this.formItem1.startTime[0]);
        //   let end2 = DateTool.timesToDate(this.formItem1.startTime[1]);
        //   this.formItem1.startTime = start1;
        //   this.formItem1.endTime = end2;
        //   this.getList()
        // }
      },
      setp1: function (current) {
        this.formItem1.current = current;
        this.getList();
      },
      selectAll: function (selection) {
        this.selection = selection
        //console.log(this.selection)
      },
      plclSubmit: function () {
        //console.log(this.formItem2);
        this.$post(this.$url.plclkfxx + '?cljg=' + this.cljg, this.formItem2.ids)
          .then(res => {
            if (res.success === true) {
              this.$Message.info('操作成功')
              this.modal1 = false
              this.cljg = ''
              this.getList()
            } else {
              this.$Message.error('操作失败')
              this.modal1 = false
              this.cljg = ''
            }
          })
      },
      plcl: function () {
        let arr = []
        //console.log(this.selection.length)
        if (this.selection.length === 0) {
          this.$Message.error('请选择操作的项目')
        } else {
          this.selection.forEach(item => {
            arr.push(item.id)
            this.formItem2.ids = arr
            //console.log(this.formItem2.ids)
          });
          this.modal1 = true;
        }
      },
      plclOk: function () {
        if (this.cljg === '') {
          this.$Message.error('请填写反馈信息')
        } else {
          this.plclSubmit()
        }
      },
      cancel: function () {
        this.modal1 = false;
        this.formItem2.cljg = ''
        this.formItem2.ids = []
      }
    },
    mounted () {
    }
  }
</script>

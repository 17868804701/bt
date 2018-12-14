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
      <Form :model="formItem" :label-width="110">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="daterange" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <FormItem label="事件类别" style="margin-bottom: 0px">
            <Select v-model="formItem.tslb" :transfer="true" style="width: 195px;">
              <Option value="">全部</Option>
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
          <div style="margin-left: 30px;">
            <ButtonGroup>
              <Button type="primary" @click="search1" style="margin-right: 3px;">
                <Icon type="search" v-has="'kfxxlbym_kfxxdjlb_search'"></Icon>
                搜索
              </Button>
              <Button type="primary" @click="daochu" icon="android-download" v-has="'kfxxlbym_kfxxdjlb_export'">导出
              </Button>
            </ButtonGroup>
          </div>
          <router-link to="/addKfxx">
            <Button type="primary" icon="plus" class="search_btn" v-has="'kfxxlbym_kfxxdjlb_add'">添加</Button>
          </router-link>


        </div>

      </Form>
    </Card>
    <Table :columns="columns11" :data="data10" border height="470" style="margin-top: 10px;" size="small"></Table>
    <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="setp"></Page>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  export default {
    data () {
      return {
        formItem: {
          current: 1,
          size: 10,
          tslb: '',
          startTime: '',
          endTime: ''
        },
        time: [],
        modal1: false,
        totalPage: 0,
        selection: [],
        columns11: [
          {
            title: '投诉时间',
            key: 'tssj',
            align: 'center',
            width: 160,
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
            title: '提交部门',
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
          },  {
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
          }, {
            title: '状态',
            key: 'zt',
            align: 'center',
            width: 120,
            render: (h, params) => {
              let texts = '';
              if (params.row.zt == 1) {
                texts = '处理中'
              } else if (params.row.zt == 2) {
                texts = '处理完成'
              }
              return h('div', {
                props: {},
              }, texts)
            }
          }, {
            title: '处理结果',
            key: 'cljg',
            align: 'center',
            width: 120,
          }, {
            title: '反馈时间',
            key: 'fksj',
            align: 'center',
            width: 120,
          }, {
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
              if (params.row.sjlb == '0') {
                texts = '责任性事件'
              } else if (params.row.sjlb == '1') {
                texts = '疑难性事件'
              } else if (params.row.sjlb == '2') {
                texts = '普通事件'
              }else{
                texts = ''
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
                      //console.log(params.row.zt.toString())
                      params.row.zt = params.row.zt.toString()
                      params.row.xl = params.row.xl+'路'
                      console.log(params.row)
                      params.row.fksj = this.$formatDate(params.row.fksj);
                      this.$router.push({
                        path: '/addkfxx',
                        query: {row: params.row, tip: 'edit'}
                      })
                    }
                  },
                  directives: [
                    {
                      name: 'has',
                      value: 'kfxxlbym_kfxxdjlb_edit',
                    }
                  ],
                }, '修改'),
              ]);
            }
          },
        ],
        data10: [],
      }
    },
    methods: {
//        客服信息列表
      getList: function () {
        this.$fetch(this.$url.kfxxList, this.formItem)
          .then(res => {
            //console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无数据');
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            } else {
              res.data.records.forEach(item => {
                item.tssj = this.$formatDate(item.tssj)
                if(item.fksj===null){
                  item.fksj = ''
                }else {
                   item.fksj = this.$formatDate(item.fksj)
                }
              });
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            }
          })
      },
      daochu: function () {
        this.formItem.startTime = this.time[0];
        this.formItem.endTime = this.time[1];
        if (this.formItem.startTime === '') {
          this.formItem.startTime = ''
        } else {
          this.formItem.startTime = this.$formatDate(this.formItem.startTime).substring(0, 10)
        }
        if (this.formItem.endTime === '') {
          this.formItem.endTime = ''
        } else {
          this.formItem.endTime = this.$formatDate(this.formItem.endTime).substring(0, 10)
        }

        //console.log(this.formItem.endTime)
        //console.log(this.formItem.startTime)
        this.$getExcel(process.env.BASE_URL+this.$url.daochukfxx+'?tslb='+this.formItem.tslb + '&startTime='+this.formItem.startTime + '&endTime='+this.formItem.endTime)
      },
      search1: function () {
        //console.log(this.time)
        this.formItem.startTime = this.time[0];
        this.formItem.endTime = this.time[1];
        if (this.formItem.startTime === '') {
          this.formItem.startTime = ''
        } else {
          this.formItem.startTime = this.$formatDate(this.formItem.startTime).substring(0, 10)
        }
        if (this.formItem.endTime === '') {
          this.formItem.endTime = ''
        } else {
          this.formItem.endTime = this.$formatDate(this.formItem.endTime).substring(0, 10)
        }
        this.getList()
      },
      setp: function (current) {
        this.formItem.current = current;
        this.getList();
      },
    },
    mounted () {

    }
  }
</script>

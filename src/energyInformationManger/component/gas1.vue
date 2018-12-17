<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem" :label-width="80">
          <Row>
            <Col span="24">
              <div style="display: flex;width: 100%">
                <FormItem label="按年份查询" style="margin: 0;">
                  <DatePicker type="month" placeholder="选择时间" :transfer="true" placement="bottom-end"
                              v-model="formItem.tjsj"></DatePicker>
                </FormItem>
                <FormItem label="公司" style="margin: 0 " prop="_dw">
                  <!--<Select v-model="formItem.dw" style="width: 195px;">-->
                  <!--<Option value="">全部</Option>-->
                  <!--<Option value="公交一公司">公交一公司</Option>-->
                  <!--<Option value="公交二公司">公交二公司</Option>-->
                  <!--</Select>-->
                  <CommonSelect type="EJGS" :selectValue="formItem._dw" style="width: 180px;"></CommonSelect>
                </FormItem>

                <FormItem label="燃料来源" style="margin: 0">
                  <Select v-model="formItem.rlly" style="width: 195px;">
                    <Option value="">全部</Option>
                    <Option value="中燃">中燃</Option>
                    <Option value="汇通">汇通</Option>
                  </Select>
                  <span style="color: red">*燃料来源这个只做导出用</span>
                </FormItem>
              </div>
            </Col>
          </Row>
          <div style="display: flex;justify-content: center;margin-top: 10px;">
            <ButtonGroup>
              <Button type="primary" icon="ios-search" @click="chaxun1" v-has="'trqtjgl_fgshz_search'">搜索</Button>
              <Button type="primary" icon="android-download" @click="daochu1" v-has="'trqtjgl_fgshz_export'"
                      style="margin-left: 2px;">导出Excel
              </Button>
              <Button type="primary" icon="android-add-circle" @click="add_dj" style="margin-left: 2px">添加单价</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>


      <!--添加单价-->
      <Modal
        v-model="modal_adddj"
        title="添加单价"
        width="400"
        @on-cancel="cancel">
        <div slot="footer" style="height: 30px;">
          <Button type="primary" style="float: right;margin-right: 10px" @click="save">新增
          </Button>
          <Button type="primary" style="float: right;margin-right: 10px" @click="cancel">取消</Button>
        </div>
        <div style="display: flex;justify-content: center">
          <Form :model="formItem2" :label-width="80">
            <FormItem label="线路" prop="_xl">
              <CommonSelect type="LB" :selectValue="formItem2._xl" style="width: 190px;"></CommonSelect>
            </FormItem>
            <FormItem label="单位" prop="_dw">
              <CommonSelect type="EJGS" :selectValue="formItem2._dw" style="width: 190px;"></CommonSelect>
            </FormItem>
            <FormItem label="燃料来源">
              <Select v-model="formItem2.rlly" style="width: 190px;">
                <Option value="中燃">中燃</Option>
                <Option value="汇通">汇通</Option>
              </Select>
            </FormItem>
            <FormItem label="时间">
              <DatePicker type="month" placeholder="请选择时间" v-model="formItem2._time" style="width: 190px;"></DatePicker>
            </FormItem>
            <FormItem label="单价">
              <Input v-model="formItem2.price" placeholder="单价" style="width: 190px;"></Input>
            </FormItem>
          </Form>
        </div>
      </Modal>


      <Tag checkable color="blue" style="position: absolute;right:15px;margin-top: 6px;">总金额：{{this.sjje_header}}万元
      </Tag>
      <Tag checkable color="blue" style="position: absolute;right:185px;margin-top: 6px;">汇通总金额：{{this.htsjj}}万元</Tag>
      <Tag checkable color="blue" style="position: absolute;right:385px;margin-top: 6px;">中燃总金额：{{this.zrsjj}}万元</Tag>

      <Table :columns="columns11" :data="data10" ref="selection" border height="500" style="margin-top: 35px;"
             size="small">
        <div slot="header" style="text-align: center">
          <span style="font-size: 16px;">{{tjsj}}{{dw}}天然气汇总</span>
        </div>
      </Table>
      <Page :total="totalPage" show-total style="margin-top: 10px;" @on-change="setpPage1"></Page>
    </div>
  </div>


</template>
<script>
  import CommonSelect from '../../components/common/CommonSelect.vue'

  export default {
    components: {
      CommonSelect,
    },
    data() {
      return {
        formItem2: {
          _xl: '',
          xl: '',
          _dw: '',
          dw: '',
          nd: '',
          yf: '',
          price: '',
          _time: '',
          rlly: ''
        },
        time: '',
        totalPage: 0,
        sjje_header: '',
        modal_adddj: false,
        zrsjj: '',
        htsjj: '',
        tjsj: '',
        dw: '',
        rlly: '全部',
        formItem: {
          dw: '',
          _dw: '',
          tjsj: '',
          rlly: '',
          current: 1,
          size: 10
        },

        columns11: [
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            width: 150,
          },
          {
            title: '线路',
            key: 'xl',
            align: 'center',
            width: 150,
          },

          {
            title: '合计',
            key: 'ch',
            align: 'center',
            width: 100,
            children: [
              {
                title: '气量（立方米）',
                key: 'ql',
                align: 'center',
                width: 150,
              },
              {
                title: '实际金额',
                key: 'sjje',
                align: 'center',
                width: 150,
              }, {
                title: '计划金额',
                key: 'jhje',
                align: 'center',
                width: 150,
              },
            ]
          },
          {
            title: '中燃',
            key: 'zr',
            show: false,
            align: 'center',
            children: [
              {
                title: '气量',
                key: 'zrql',
                align: 'center',
                width: 150,
              },
              {
                title: '实际价',
                key: 'zrsjje',
                align: 'center',
                width: 150,
              }, {
                title: '实际单价',
                key: 'zrsjdj',
                align: 'center',
                width: 150,
              }, {
                title: '计划价',
                key: 'zrjhje',
                align: 'center',
                width: 150,
              }, {
                title: '计划单价',
                key: 'zrjhdj',
                align: 'center',
                width: 150,
              },
            ]
          },
          {
            title: '汇通',
            key: 'zr',
            align: 'center',
            width: 150,
            children: [
              {
                title: '气量',
                key: 'htql',
                align: 'center',
                width: 150,
              },
              {
                title: '实际价',
                key: 'htsjje',
                align: 'center',
                width: 150,
              }, {
                title: '实际单价',
                key: 'htsjdj',
                align: 'center',
                width: 150,
              }, {
                title: '计划价',
                key: 'htjhje',
                align: 'center',
                width: 150,
              }, {
                title: '计划单价',
                key: 'htjhdj',
                align: 'center',
                width: 150,
              },
            ]
          }
        ],
        data10: [],
      }
    },
    methods: {
      add_dj() {
        this.modal_adddj = true
      },
      save() {
        if (this.formItem2._time === '') {
          this.formItem.nd = ''
          this.formItem.yf = ''
        } else {
          this.formItem2.nd = this.$formatDate(this.formItem2._time).substring(0, 4)
          this.formItem2.yf = this.$formatDate(this.formItem2._time).substring(5, 7)
        }
        this.formItem2.xl = this.formItem2._xl + '路'
        this.formItem2.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem2._dw];
        console.log(this.formItem2)
        if (this.formItem2._time == '' || this.formItem2._xl == '' || this.formItem2._xl == '' || this.formItem2.rlly == '' || this.formItem2.price == '') {
          this.$Message.info('请填写完整信息');
        } else {
          this.$post(this.$url.setPrice, this.formItem2)
            .then(res => {
              console.log(res)
              if (res.success === true) {
                this.$Message.success('添加成功');
                this.modal_adddj = false
                this.clean()
              } else {
                this.$Message.error('添加失败')
                this.modal_adddj = false
                this.clean()
              }
            })
        }
      },
      cancel() {
        this.modal_adddj = false
        this.clean()
      },
      clean(){
         this.formItem2._xl = '',
          this.formItem2.xl = '',
          this.formItem2._dw = '',
          this.formItem2.dw = '',
          this.formItem2.nd = '',
          this.formItem2.yf = '',
          this.formItem2.price = '',
          this.formItem2._time = '',
          this.formItem2.rlly = ''
      },
      getList: function () {
        this.$fetch(this.$url.fgstrq, this.formItem)
          .then(res => {
            console.log(res)
            if (res.data.total == 0) {
              this.$Message.info('暂无信息');
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            } else {
              this.sjje_header = res.hz.sjje
              this.zrsjj = res.hz.zrsjje
              this.htsjj = res.hz.htsjje
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            }
          })
      },
      setpPage1: function (current) {
        console.log(current);
        this.formItem.current = current;
        this.getList()
      },
      chaxun1: function () {
        this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        if (this.formItem.tjsj == '') {
          this.formItem.tjsj = ''
        } else {
          this.formItem.tjsj = this.$formatDate(this.formItem.tjsj).substring(0, 7)
        }
        console.log(this.formItem)
        this.tjsj = this.formItem.tjsj
        this.dw = this.formItem.dw
        this.getList()
      },
      daochu1: function () {
        if (this.formItem._dw == '') {
          this.formItem.dw = ''
        } else {
          this.formItem.dw = this.$store.state.dictData.parseDict.EJGS[this.formItem._dw];
        }
        if (this.formItem.tjsj == '') {
          this.formItem.tjsj = ''
        } else {
          this.formItem.tjsj = this.$formatDate(this.formItem.tjsj).substring(0, 7)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.daochufgstrq + '?tjsj=' + this.formItem.tjsj + '&dw=' + this.formItem.dw + '&rlly=' + this.formItem.rlly)
      }
    },
    mounted() {

    }
  }
</script>

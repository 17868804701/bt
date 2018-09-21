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
              <FormItem label="公司" style="margin: 0 " prop="_ejdw">
                <!--<Select v-model="formItem.ejdw" style="width: 195px;">-->
                  <!--<Option value="">全部</Option>-->
                  <!--<Option value="公交一公司">公交一公司</Option>-->
                  <!--<Option value="公交二公司">公交二公司</Option>-->
                <!--</Select>-->
                <CommonSelect type="EJGS"  :selectValue="formItem._ejdw" style="width: 180px;"></CommonSelect>
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
              <Button type="primary" icon="android-download" @click="daochu1" v-has="'trqtjgl_fgshz_export'" style="margin-left: 2px;">导出Excel</Button>
            </ButtonGroup>
          </div>
        </Form>
      </Card>
      <Tag checkable color="blue" style="position: absolute;right:15px;margin-top: 6px;">总金额：{{this.sjje_header}}万元</Tag>
      <Tag checkable color="blue" style="position: absolute;right:185px;margin-top: 6px;">汇通总金额：{{this.htsjj}}万元</Tag>
      <Tag checkable color="blue" style="position: absolute;right:385px;margin-top: 6px;">中燃总金额：{{this.zrsjj}}万元</Tag>

      <Table :columns="columns11" :data="data10" ref="selection" border height="500" style="margin-top: 35px;" size="small">
        <div slot="header" style="text-align: center">
          <span style="font-size: 16px;">{{tjsj}}{{ejdw}}天然气汇总</span>
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
    data () {
      return {
        totalPage:0,
        sjje_header:'',
        zrsjj:'',
        htsjj:'',
        tjsj:'',
        ejdw:'',
        rlly:'全部',
        formItem: {
          ejdw: '',
          _ejdw: '',
          tjsj: '',
          rlly:'',
          current:1,
          size:10
        },

        columns11: [
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
                key: 'dw',
                align: 'center',
                width: 150,
              },
              {
                title: '实际金额',
                key: 'sjje',
                align: 'center',
                width: 150,
              },      {
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
            show:false,
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
                key: 'zrsjj',
                align: 'center',
                width: 150,
              },    {
                title: '实际单价',
                key: 'zrsjdj',
                align: 'center',
                width: 150,
              }, {
                title: '计划价',
                key: 'zrjhj',
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
                key: 'htsjj',
                align: 'center',
                width: 150,
              },  {
                title: '实际单价',
                key: 'htsjdj',
                align: 'center',
                width: 150,
              }, {
                title: '计划价',
                key: 'htjhj',
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
    methods:{
      getList: function () {
        this.$fetch(this.$url.fgstrq, this.formItem)
          .then(res => {
              console.log(res)
            if (res.data.total == 0) {
              this.$Message.info('暂无信息');
              this.data10 = res.data.records;
              this.totalPage = res.data.total;
            } else {
              this.sjje_header = res.count[0].sjje
              this.zrsjj = res.count[0].zrsjj
              this.htsjj = res.count[0].htsjj
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
      chaxun1:function () {
        this.formItem.ejdw  = this.$store.state.dictData.parseDict.EJGS[ this.formItem._ejdw];
        if(this.formItem.tjsj==''){
          this.formItem.tjsj = ''
        }else {
          this.formItem.tjsj = this.$formatDate(this.formItem.tjsj).substring(0,7)
        }
        console.log(this.formItem)
        this.tjsj = this.formItem.tjsj
        this.ejdw = this.formItem.ejdw
        this.getList()
      },
      daochu1:function () {
        if(this.formItem._ejdw==''){
          this.formItem.ejdw = ''
        }else {
          this.formItem.ejdw  = this.$store.state.dictData.parseDict.EJGS[this.formItem._ejdw];
        }
        if(this.formItem.tjsj==''){
          this.formItem.tjsj = ''
        }else {
          this.formItem.tjsj = this.$formatDate(this.formItem.tjsj).substring(0,7)
        }
        this.$getExcel(process.env.BASE_URL + this.$url.daochufgstrq + '?tjsj=' + this.formItem.tjsj+'&ejdw='+this.formItem.ejdw+'&rlly='+ this.formItem.rlly)
      }
    },
    mounted () {

    }
  }
</script>

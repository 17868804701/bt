<!--六个公司百公里收入对比图-->
<template>
  <div>
    <Row type="flex" justify="center" align="middle" style="margin-top: 0px;margin-bottom: 40px;margin-top: 20px;">
      <Col span="23">
        <Card style="height: 800px;">
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            六个公司百公里收入对比图
          </p>
          <Form :model="params" :label-width="80" :inline="true">
            <FormItem label="单位"  prop="ejdw">
              <CommonSelect type="EJGS" :selectValue="params.ejdw" style="width: 180px;"></CommonSelect>
            </FormItem>
            <FormItem label="年份">
              <DatePicker type="year" placeholder="请选择日期" style="width: 180px;" v-model="params.nd"></DatePicker>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="search">搜索</Button>
            </FormItem>
          </Form>
          <div style="width:100%;height:700px;margin-top: 20px;" id="data_source_con_1"></div>
        </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
  import CommonSelect from '../../components/common/CommonSelect.vue'
  import echarts from 'echarts';

  export default {
    components: {
      CommonSelect,
    },
    data() {
      return {
        lb: [],
        bn_bgl: [],
        dw: [],
        qn_bgl: [],
        zzl: [],
        columnsTitle: ['总计', '不含退离', '在岗女工', '公司领导', '二级', '三级(主任科员)', '一般管理', '辅助', '司机', '修理', '其他在岗', '其他不在岗', '内退',
          '病假', '产假', '女工长假', '下岗', '工伤', '待岗', '停薪', '外借', '退离'],
        columnsCode: ['zj', 'bhtl', 'zgng', 'gsld', 'ej', 'sj', 'ybgl', 'fz', 'siji', 'xl', 'qtzg', 'qtbzg', 'nt', 'cj', 'bj', 'ngcj', 'xg', 'gs', 'dg', 'tx', 'wj', 'tl'],
        tableData: [],
        params: {nd: '', dw:'',ejdw:'YGS'}
      }
    },
    computed: {},
    methods: {
      search(){
        this.requestData()
      },
      requestData() {
        if(this.params.nd==''){
          this.params.nd = ''
        }else {
           this.lb= [],
           this.bn_bgl= [],
           this.dw= [],
           this.qn_bgl= [],
           this.zzl= [],
          this.params.nd = this.$formatDate(this.params.nd).substring(0,4)
          this.params.dw = this.$store.state.dictData.parseDict.EJGS[this.params.ejdw];
        }
        this.$fetch(this.$url.getFgsBglsr, this.params)
          .then(res => {
            console.log(res.data)
            res.data.forEach(item => {
              console.log(item)
              this.lb.push(item.lb)
              this.bn_bgl.push(item.bn_bgl)
              this.zzl.push(item.zzl)
              this.qn_bgl.push(item.qn_bgl)
              this.dw.push(item.dw)
            })
            // 构建图表数据
            this.$nextTick(() => {
              this.pieData();
            });
          })
      },
      pieData() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_con_1'));

        const option = {
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: false},
              dataView: {show: false, readOnly: false},
              magicType: {show: false, type: ['line', 'bar']},
              restore: {show: false},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          legend: {
            data: ['本期', '上年同期', '增减百分比']
          },
          xAxis: [
            {
              type: 'category',
              data: this.lb
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '收入',
              axisLabel: {
                formatter: '{value} 万元'
              }
            },
            {
              type: 'value',
              name: '增减百分比刻度',
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name: '本期',
              type: 'bar',
              data: this.bn_bgl
            },
            {
              name: '上年同期',
              type: 'bar',
              data: this.qn_bgl
            },
            {
              name: '增减百分比',
              type: 'line',
              yAxisIndex: 1,
              data: this.zzl
            }
          ]
        };

        dataSourcePie.setOption(option);
        window.addEventListener('resize', function () {
          dataSourcePie.resize();
        });
      },
    },
    mounted() {
      this.requestData()
      let date = new Date;
      let year = (date.getFullYear()).toString();
      this.params.nd = year;
    },
  }
</script>

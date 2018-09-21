<!--直接经济效益分析-->
<template>
  <div>
    <Row type="flex" justify="center" align="middle" style="margin-top: 0px;margin-bottom: 40px;margin-top: 20px;">
      <Col span="23">
      <Card style="height: 800px;">
        <p slot="title" class="card-title">
          <Icon type="ios-pulse-strong"></Icon>
          直接经济效益分析
        </p>
        <div style="width:100%;height:700px;" id="data_source_con_2"></div>
      </Card>
      </Col>
    </Row>

  </div>
</template>
<script>

  import echarts from 'echarts';

  export default {
    data () {
      return {
        columnsTitle: ['总计','不含退离','在岗女工','公司领导','二级','三级(主任科员)','一般管理','辅助','司机','修理','其他在岗','其他不在岗','内退',
          '病假','产假','女工长假','下岗','工伤','待岗','停薪','外借','退离'],
        columnsCode: ['zj','bhtl','zgng','gsld','ej','sj','ybgl','fz','siji','xl','qtzg','qtbzg','nt','cj','bj','ngcj','xg','gs','dg','tx','wj','tl'],
        tableData:[],
      }
    },
    computed: {

    },
    methods: {
      requestData() {
        this.$fetch(this.$url.userManager_counts)
        .then(res => {
          this.tableData = res.data;
          // 构建图表数据
          this.$nextTick(() => {
            this.pieData();
          });
        })
      },
      pieData() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_con_2'));
//        let dwData = [];
//        let series = [];
//        for (let i = 0; i < this.tableData.length; i++) {
//          let countData = [];
//          countData.push(this.tableData[i].zj);
//          countData.push(this.tableData[i].bhtl);
//          countData.push(this.tableData[i].zgng);
//          countData.push(this.tableData[i].gsld);
//          countData.push(this.tableData[i].ej);
//          countData.push(this.tableData[i].sj);
//          countData.push(this.tableData[i].ybgl);
//          countData.push(this.tableData[i].fz);
//          countData.push(this.tableData[i].siji);
//          countData.push(this.tableData[i].xl);
//          countData.push(this.tableData[i].qtzg);
//          countData.push(this.tableData[i].qtbzg);
//          countData.push(this.tableData[i].nt);
//          countData.push(this.tableData[i].bj);
//          countData.push(this.tableData[i].cj);
//          countData.push(this.tableData[i].ngcj);
//          countData.push(this.tableData[i].xg);
//          countData.push(this.tableData[i].gs);
//          countData.push(this.tableData[i].dg);
//          countData.push(this.tableData[i].tx);
//          countData.push(this.tableData[i].wj);
//          countData.push(this.tableData[i].tl);
//          countData.push(this.tableData[i].sm);
//
//          dwData.push(this.tableData[i].dw);
//          series.push({
//            name:this.tableData[i].dw,
//            type:'line',
//            data:countData,
//          },);
//        }

        const option = {
          title : {
          },
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            data:[
              '百公里收入 本期','百公里成本 本期',
              '百公里收入 上年同期', '百公里成本 上年同期',
            ]
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: false},
              dataView : {show: false, readOnly: false},
              magicType : {show: false, type: ['line', 'bar']},
              restore : {show: false},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          grid: {y: 70, y2:30, x2:20},
          xAxis : [
            {
              type : 'category',
              data : ['1路','2路','3路','4路','5路']
            },
            {
              type : 'category',
              axisLine: {show:false},
              axisTick: {show:false},
              axisLabel: {show:false},
              splitArea: {show:false},
              splitLine: {show:false},
              data : ['1路','2路','3路','4路','5路']
            }
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel:{formatter:'{value} 万元'}
            }
          ],
          series : [
            {
              name:'百公里收入 本期',
              type:'bar',
              itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,textStyle:{color:'#27727B'}}}},
              data:[100,200,105,100,156]
            },
            {
              name:'百公里收入 上年同期',
              type:'bar',
              itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
              data:[906,911,908,778,1000]
            },
            {
              name:'百公里成本 本期',
              type:'bar',
              xAxisIndex:1,
              itemStyle: {normal: {color:'rgba(181,195,52,0.5)', label:{show:true}}},
              data:[491,2035,389,955,347]
            },
            {
              name:'百公里成本 上年同期',
              type:'bar',
              xAxisIndex:1,
              itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value):'';}}}},
              data:[3000,3000,2817,3000,2000]
            }
          ]
        };

        dataSourcePie.setOption(option);
        window.addEventListener('resize', function () {
          dataSourcePie.resize();
        });
      },
    },
    mounted () {

    }
  }
</script>

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
        <div style="width:100%;height:700px;" id="data_source_con_1"></div>
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
        var dataSourcePie = echarts.init(document.getElementById('data_source_con_1'));
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
          tooltip : {
            trigger: 'axis'
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: false},
              dataView : {show: false, readOnly: false},
              magicType: {show: false, type: ['line', 'bar']},
              restore : {show: false},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          legend: {
            data:['本期','上年同期','增减百分比']
          },
          xAxis : [
            {
              type : 'category',
              data : ['1路','2路','3路','4路','5路','6路','7路','8路','9路','10路','11路','12路']
            }
          ],
          yAxis : [
            {
              type : 'value',
              name : '收入',
              axisLabel : {
                formatter: '{value} 万元'
              }
            },
            {
              type : 'value',
              name : '增减百分比刻度',
              axisLabel : {
                formatter: '{value} %'
              }
            }
          ],
          series : [

            {
              name:'本期',
              type:'bar',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name:'上年同期',
              type:'bar',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name:'增减百分比',
              type:'line',
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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

    },
  }
</script>

<style scoped>
  .back {
    color: #5cadff;
    font-size: 12px;
    margin-left: 20px;
  }
</style>

<template>
  <div>
    <Table :data="tableData" border :columns="initTableColumns" border></Table>
    <Row type="flex" justify="center" align="middle" style="margin-top: 0px;margin-bottom: 40px;margin-top: 20px;">
      <Col span="23">
        <Card style="height: 800px;">
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            人员信息实时分布
          </p>
          <div style="width:100%;height:700px;" id="data_source_con"></div>
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
      initTableColumns() {
        let coulumns = [
          {
            title: '单位',
            key: 'dw',
            width: 150,
            fixed: 'left'
          },
        ];
        for (let i = 0; i < this.columnsTitle.length; i++) {
          coulumns.push({
            title: this.columnsTitle[i],
            key: this.columnsCode[i],
            width: 150,
            sortable: true
          });
        }
        return coulumns;
      },
    },
    methods: {
      getList() {
        this.$fetch(this.$url.userManager_counts)
        .then(res => {
          this.tableData = res.data;
          // 构建图表数据
          this.pieData();
        })
      },
      pieData() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
        let dwData = [];
        let series = [];
        for (let i = 0; i < this.tableData.length; i++) {
          let countData = [];
          countData.push(this.tableData[i].zj);
          countData.push(this.tableData[i].bhtl);
          countData.push(this.tableData[i].zgng);
          countData.push(this.tableData[i].gsld);
          countData.push(this.tableData[i].ej);
          countData.push(this.tableData[i].sj);
          countData.push(this.tableData[i].ybgl);
          countData.push(this.tableData[i].fz);
          countData.push(this.tableData[i].siji);
          countData.push(this.tableData[i].xl);
          countData.push(this.tableData[i].qtzg);
          countData.push(this.tableData[i].qtbzg);
          countData.push(this.tableData[i].nt);
          countData.push(this.tableData[i].bj);
          countData.push(this.tableData[i].cj);
          countData.push(this.tableData[i].ngcj);
          countData.push(this.tableData[i].xg);
          countData.push(this.tableData[i].gs);
          countData.push(this.tableData[i].dg);
          countData.push(this.tableData[i].tx);
          countData.push(this.tableData[i].wj);
          countData.push(this.tableData[i].tl);

          dwData.push(this.tableData[i].dw);
          series.push({
            name:this.tableData[i].dw,
            type:'line',
            data:countData,
          },);
        }

        const option = {
          title : {
            text: '人数',
          },
          tooltip : {
            trigger: 'axis'
          },
          grid: {
            left: '1%',   //图表距边框的距离
            right: '1%',
            bottom: '1%',
            containLabel: true
          },
          legend: {
            data:dwData,
            right: '10',
            width:650,
            height:300
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : this.columnsTitle,
              axisLabel: {
                interval:0,
                rotate:60
              }
            },
          ],
          yAxis : [
            {
              type : 'value',
              axisLabel : {
                formatter: '{value} 人'
              }
            }
          ],
          series : series
        };
        dataSourcePie.setOption(option);
        window.addEventListener('resize', function () {
          dataSourcePie.resize();
        });
      },
    },
    mounted () {
      this.$nextTick(() => {
        this.getList();
      });
    }
  }
</script>

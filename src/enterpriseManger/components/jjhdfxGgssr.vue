<!--各公司收入完成对比饼状图-->
<template>
  <div style="display: flex;justify-content: space-between;">
    <Card style="width:50%;height: 400px;margin-right: 20px;">
      <p slot="title" class="card-title">
        <Icon type="ios-pulse-strong"></Icon>
        各公司收入完成对比饼状图(按收入统计)
      </p>
      <div style="width:90%;height:300px;" id="data_source_sr"></div>
    </Card>
    <Card style="width:50%;height: 400px;">
      <p slot="title" class="card-title">
        <Icon type="ios-pulse-strong"></Icon>
        各公司收入完成对比饼状图(按人次统计)
      </p>
      <div style="width:90%;height:300px;" id="data_source_rc"></div>
    </Card>
  </div>
</template>
<script>

  import echarts from 'echarts';

  export default {
    data () {
      return {
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
            this.pie1Data();
            this.pie2Data();
          });
        })
      },
      pie1Data() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_sr'));
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['一公司', '二公司', '三公司', '四公司', '五公司']
          },
          series: [
            {
              name: '收入完成占比',
              type: 'pie',
              radius: '66%',
              center: ['50%', '50%'],
              data: [
                {value: 2103456, name: '一公司', itemStyle: {normal: {color: '#9bd598'}}},
                {value: 1305923, name: '二公司', itemStyle: {normal: {color: '#ffd58f'}}},
                {value: 543250, name: '三公司', itemStyle: {normal: {color: '#abd5f2'}}},
                {value: 798403, name: '四公司', itemStyle: {normal: {color: '#ab8df2'}}},
                {value: 302340, name: '五公司', itemStyle: {normal: {color: '#e14f60'}}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        dataSourcePie.setOption(option);
        window.addEventListener('resize', function () {
          dataSourcePie.resize();
        });
      },
      pie2Data() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_rc'));
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['一公司', '二公司', '三公司', '四公司', '五公司']
          },
          series: [
            {
              name: '收入完成占比',
              type: 'pie',
              radius: '66%',
              center: ['50%', '50%'],
              data: [
                {value: 2103456, name: '一公司', itemStyle: {normal: {color: '#9bd598'}}},
                {value: 1305923, name: '二公司', itemStyle: {normal: {color: '#ffd58f'}}},
                {value: 543250, name: '三公司', itemStyle: {normal: {color: '#abd5f2'}}},
                {value: 798403, name: '四公司', itemStyle: {normal: {color: '#ab8df2'}}},
                {value: 302340, name: '五公司', itemStyle: {normal: {color: '#e14f60'}}}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
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

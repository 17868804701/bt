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
        <Form :model="params" :label-width="80" :inline="true">
          <FormItem label="季度">
            <RadioGroup v-model="params.jd">
              <Radio label="1">第一季度</Radio>
              <Radio label="2">第二季度</Radio>
              <Radio label="3">第三季度</Radio>
              <Radio label="4">第四季度</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="年份">
            <DatePicker type="year" placeholder="请选择日期" style="width: 180px;" v-model="params.nd"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="search">搜索</Button>
          </FormItem>
        </Form>
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
        params: {nd: '', jd:'3'},
        columnsTitle: ['总计','不含退离','在岗女工','公司领导','二级','三级(主任科员)','一般管理','辅助','司机','修理','其他在岗','其他不在岗','内退',
          '病假','产假','女工长假','下岗','工伤','待岗','停薪','外借','退离'],
        columnsCode: ['zj','bhtl','zgng','gsld','ej','sj','ybgl','fz','siji','xl','qtzg','qtbzg','nt','cj','bj','ngcj','xg','gs','dg','tx','wj','tl'],
        tableData:[],
        lb:[],
        bglsr_bq:[],
        bglsr_tq:[],
        bglcb_tq:[],
        bglcb_bq:[],
      }
    },
    computed: {

    },
    methods: {
      requestData() {
        if(this.params.nd==''){
          this.params.nd = ''
        }else {
          this.lb= [],
            this.bglsr_bq= [],
            this.bglsr_tq= [],
            this.bglcb_tq= [],
            this.bglcb_bq= [],
          this.params.nd = this.$formatDate(this.params.nd).substring(0,4)
        }
        this.$fetch(this.$url.getJjxxfx,this.params)
        .then(res => {
          console.log(res)
          res.data.forEach(item=>{
            this.lb.push(item.lb)
            this.bglsr_bq.push(item.bglsr_bq)
            this.bglsr_tq.push(item.bglsr_tq)
            this.bglcb_tq.push(item.bglcb_tq)
            this.bglcb_bq.push(item.bglcb_bq)
          })
          // 构建图表数据
          this.$nextTick(() => {
            this.pieData();
          });
        })
      },
      search(){
        this.requestData()
      },
      pieData() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_con_2'));

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
              data : this.lb
            },
            {
              type : 'category',
              axisLine: {show:false},
              axisTick: {show:false},
              axisLabel: {show:false},
              splitArea: {show:false},
              splitLine: {show:false},
              data : this.lb
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
              data:this.bglsr_bq
            },
            {
              name:'百公里收入 上年同期',
              type:'bar',
              itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
              data:this.bglsr_tq
            },
            {
              name:'百公里成本 本期',
              type:'bar',
              xAxisIndex:1,
              itemStyle: {normal: {color:'rgba(181,195,52,0.5)', label:{show:true}}},
              data:this.bglcb_bq
            },
            {
              name:'百公里成本 上年同期',
              type:'bar',
              xAxisIndex:1,
              itemStyle: {normal: {color:'rgba(252,206,16,0.5)', label:{show:true,formatter:function(p){return p.value > 0 ? (p.value):'';}}}},
              data:this.bglcb_tq
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
      let date = new Date;
      let year = (date.getFullYear()).toString();
      this.params.nd = year;
    }
  }
</script>

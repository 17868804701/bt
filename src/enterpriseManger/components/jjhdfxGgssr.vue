<!--直接经济效益分析-->
<template>
  <div>
    <Row type="flex" justify="center" align="middle" style="margin-top: 0px;margin-bottom: 40px;margin-top: 20px;">
      <Col span="23">
        <Card style="height: 800px;">
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>
            各公司收入完成对比图
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
          <div style="width:100%;height:700px;" id="data_source_con_21"></div>
        </Card>
      </Col>
    </Row>

  </div>
</template>
<script>

  import echarts from 'echarts';

  export default {
    data() {
      return {
        params: {nd: '', jd: '3'},
        columnsTitle: ['总计', '不含退离', '在岗女工', '公司领导', '二级', '三级(主任科员)', '一般管理', '辅助', '司机', '修理', '其他在岗', '其他不在岗', '内退',
          '病假', '产假', '女工长假', '下岗', '工伤', '待岗', '停薪', '外借', '退离'],
        columnsCode: ['zj', 'bhtl', 'zgng', 'gsld', 'ej', 'sj', 'ybgl', 'fz', 'siji', 'xl', 'qtzg', 'qtbzg', 'nt', 'cj', 'bj', 'ngcj', 'xg', 'gs', 'dg', 'tx', 'wj', 'tl'],
        tableData: [],
        dw: [],
        kyl_icrc: [],
        kyl_jlkrc: [],
        kyl_simrc: [],
        kyl_tbrc: [],
        kyl_yprc: [],
        sr_ick: [],
        sr_tbsr: [],
      }
    },
    computed: {},
    methods: {
      requestData() {
      	let params = {};
      	for (let attr in this.params) {
          params.nd = this.params.nd;
          params.jd = this.params.jd;
        }
        if (this.params.nd == '') {
          this.params.nd = ''
          params.nd = ''
        } else {
          this.dw = [],
            this.kyl_icrc = [],
            this.kyl_jlkrc = [],
            this.kyl_simrc = [],
            this.kyl_tbrc = [],
            this.kyl_yprc = [],
            this.sr_ick = [],
            this.sr_tbsr = [],
            this.params.nd = this.$formatDate(this.params.nd).substring(0, 4)
          params.nd = this.$formatDate(this.params.nd).substring(0, 4)

        }

        this.$fetch(this.$url.getFgsSrwcdb, params)
          .then(res => {
            console.log(res.rcdata)
            res.rcdata.forEach(item => {
              console.log(item)
              this.dw.push(item.dw)
              this.kyl_icrc.push(item.kyl_icrc)
              this.kyl_jlkrc.push(item.kyl_jlkrc)
              this.kyl_simrc.push(item.kyl_simrc)
              this.kyl_tbrc.push(item.kyl_tbrc)
              this.kyl_yprc.push(item.kyl_yprc)
            })
            console.log(this.kyl_yprc, '********************************')
            res.srdata.forEach(item1 => {
              console.log(item1)
              this.sr_ick.push(item1.sr_ick)
              this.sr_tbsr.push(item1.sr_tbsr)
            })
            // console.log(res.srdata)
            // 构建图表数据
            this.$nextTick(() => {
              this.pieData1();
            });
          })
      },
      search() {
        this.requestData()
      },
      pieData1() {
        var dataSourcePie = echarts.init(document.getElementById('data_source_con_21'));

        const option = {
          title: {},
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [
              '客运量-月票人次', '客运量-敬老卡人次',
              '客运量-ic卡人次', '客运量-投币人次', 'sim卡人次', '投币收入', 'IC卡收入'
            ]
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
          grid: {y: 70, y2: 30, x2: 20},
          xAxis: [
            {
              type: 'category',
              data: this.dw
            },
            {
              type: 'category',
              axisLine: {show: false},
              axisTick: {show: false},
              axisLabel: {show: false},
              splitArea: {show: false},
              splitLine: {show: false},
              data: this.dw
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {formatter: '{value} 万元'}
            }
          ],
          series: [
            // {
            //   name:'客运量-月票人次',
            //   type:'bar',
            //   itemStyle: {normal: {color:'rgba(181,195,52,1)', label:{show:true,textStyle:{color:'#27727B'}}}},
            //   data:this.kyl_yprc
            // },
            // {
            //   name:'客运量-敬老卡人次',
            //   type:'bar',
            //   itemStyle: {normal: {color:'rgba(252,206,16,1)', label:{show:true,textStyle:{color:'#E87C25'}}}},
            //   data:this.kyl_jlkrc
            // },
            {
              name: '客运量-月票人次',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {normal: {color: 'rgba(255,165,0,0.8)', label: {show: true}}},
              data: this.kyl_yprc
            },
            {
              name: '客运量-敬老卡人次',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {normal: {color: 'rgba(255,165,0,0.4)', label: {show: true}}},
              data: this.kyl_jlkrc
            },


            {
              name: '客运量-ic卡人次',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {normal: {color: 'rgba(255,165,0,0.5)', label: {show: true}}},
              data: this.kyl_icrc
            },
            {
              name: '客运量-投币人次',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: 'rgba(255,165,0,0.5)', label: {
                    show: true, formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              data: this.kyl_tbrc
            },
            {
              name: 'sim卡人次',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: 'rgba(255,55,0,0.2)', label: {
                    show: true, formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              data: this.kyl_simrc
            },
            {
              name: '投币收入',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: 'rgba(240,20,140,0.5)', label: {
                    show: true, formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              data: this.sr_tbsr
            },
            {
              name: 'IC卡收入',
              type: 'bar',
              xAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: 'rgba(252,6,16,0.5)', label: {
                    show: true, formatter: function (p) {
                      return p.value > 0 ? (p.value) : '';
                    }
                  }
                }
              },
              data: this.sr_ick
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
      let date = new Date;
      let year = (date.getFullYear()).toString();
      this.params.nd = year;
    }
  }
</script>

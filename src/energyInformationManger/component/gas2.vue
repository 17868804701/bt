<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Form :model="formItem1" :label-width="80">
          <Row>
            <Col span="24">
            <FormItem label="按年份查询" style="margin: 0;">
              <DatePicker type="month" placeholder="选择时间" :transfer="true" placement="bottom-end"
                          v-model="formItem1.tjsj"></DatePicker>
              <Button type="primary" icon="ios-search" @click="chaxun2" v-has="'trqtjgl_trqyhz_search'">搜索</Button>

              <Button type="primary" icon="android-download"
                      style="float: right;margin-right: 10px" @click="daochu2" v-has="'trqtjgl_trqyhz_export'">导出Excel
              </Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table :columns="columns12" :data="data12" ref="selection" border height="500" style="margin-top: 20px;"
             size="small">
        <div slot="header" style="text-align: center">
              <span style="font-size: 16px;">{{title_tjsj}}天然气月汇总</span>
        </div>
      </Table>
      <Page :total="totalPage1" show-total style="margin-top: 10px;" @on-change="setpPage2"></Page>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        totalPage1:0,
        sjje:'',
        zrsjj:'',
        htsjj:'',
        title_tjsj:'',
        formItem1:{
          tjsj:'',
          current:1,
          size:10
        },
        columns12: [
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            width: 100,
          },
          {
            title: '中燃',
            key: 'zr',
            align: 'center',
            width: 150,
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
              },     {
                title: '实际单价',
                key: 'zrsjdj',
                align: 'center',
                width: 150,
              }, {
                title: '计划价',
                key: 'zrjhj',
                align: 'center',
                width: 150,
              },   {
                title: '计划单价',
                key: 'zrjhdj',
                align: 'center',
                width: 150,
              }
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
              },    {
                title: '实际单价',
                key: 'htsjdj',
                align: 'center',
                width: 150,
              },  {
                title: '计划价',
                key: 'htjhj',
                align: 'center',
                width: 150,
              },    {
                title: '实际单价',
                key: 'htsjdj',
                align: 'center',
                width: 150,
              },
            ]
          },
          {
            title: '合计',
            key: 'zr',
            align: 'center',
            width: 150,
            children: [
              {
                title: '气量',
                key: 'hjql',
                align: 'center',
                width: 150,
              },
              {
                title: '实际价',
                key: 'hjsjj',
                align: 'center',
                width: 150,
              }, {
                title: '计划价',
                key: 'hjjhj',
                align: 'center',
                width: 150,
              },
            ]
          }
        ],
        data12: []
      }
    },
    methods:{
      getList:function () {
        this.$fetch(this.$url.jttrq, this.formItem1)
          .then(res => {
            console.log(res);
            if (res.data.total === 0) {
              this.$Message.info('暂无信息');
              this.data12 = res.data.records;
              this.totalPage1 = res.data.total;
            } else {
              res.data.records.forEach(item=>{
                 item.hjql = item.htql+item.zrql
                 item.hjsjj = item.htsjj+item.zrsjj
                 item.hjjhj = item.htjhj+item.zrjhj
              });
              this.data12 = res.data.records;
              this.totalPage1 = res.data.total;
            }
          })
      },
      chaxun2:function () {
        if(this.formItem1.tjsj===''){
          this.formItem1.tjsj = ''
        }else {
          this.formItem1.tjsj = this.$formatDate(this.formItem1.tjsj).substring(0,7)
        }
        this.title_tjsj = this.formItem1.tjsj
        console.log(this.formItem1)
        this.getList()
      },
      setpPage2: function (current) {
        console.log(current);
        this.formItem1.current = current;
        this.getList()
      },
      daochu2:function () {
        if(this.formItem1.tjsj==''){
          this.formItem1.tjsj = ''
        }else {
          this.formItem1.tjsj = this.$formatDate(this.formItem1.tjsj).substring(0,7)
        }
        console.log(this.formItem1)
        this.$getExcel(process.env.BASE_URL + this.$url.daochujttrq + '?tjsj=' + this.formItem1.tjsj)
      },
    },
    mounted () {

    }
  }
</script>

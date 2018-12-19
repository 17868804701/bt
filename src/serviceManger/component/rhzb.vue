<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding: 10px;
  }

  .container h2 {
    margin-left: 15px;

  }

  .search_btn {
    margin-left: 10px;
  }

  .text_width {
    width: 195px;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    margin-left: -30px;
    align-items: center;
  }

  .btn {
    position: absolute;
    right: 20px;
  }
</style>
<template>
  <div>
    <Card style="padding-left: 15px;">
      <Form :model="formItem1" :label-width="110">
        <div class="search">
          <FormItem label="选择时间" style="margin: 0">
            <DatePicker type="date" placeholder="选择时间" :transfer="true" v-model="time"
                        class="text_width"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" class="search_btn" @click="search2" v-has="'kfxxlbym_dwcllb_search'">
            查询
          </Button>
          <Button type="primary" icon="ios-search" class="search_btn" @click="daochu">
            导出
          </Button>
        </div>
      </Form>
    </Card>
    <Table :columns="columns12" :data="data12" border height="470" style="margin-top: 10px;" size="small"></Table>
    <!--<Page :total="totalPage1" show-total style="margin-top: 10px;" @on-change="setp1"></Page>-->

    <!--批量处理-->
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  import CommonSelect from '../../components/common/CommonSelect.vue'
  export default {
    components: {
      CommonSelect,
    },
    data () {
      return {
        time:'',
        formItem1:{
            day:''
        },
        formItem2: {
          ids: []
        },
        cljg: '',
        modal1: false,
        totalPage: 0,
        totalPage1: 0,
        selection: [],
        columns12: [
          {
            title: '单位',
            key: 'dw',
            align: 'center',
            render: (h, params) => {
              let texts = '';
              if(params.row.dw=='运营部'){
                texts='运营部'
              }else {
                texts = this.$store.state.dictData.parseDict.EJGS[params.row.dw];
              }
              return h('div', {
                props: {},
              }, texts)
            }
          },
          {
            title: '问寻',
            key: 'wx',
            align: 'center',
          },      {
            title: '导乘',
            key: 'dc',
            align: 'center',
          },  {
            title: '寻物',
            key: 'xw',
            align: 'center',
          }, {
            title: '投诉',
            key: 'ts',
            align: 'center',
          },{
            title: '建议',
            key: 'jy',
            align: 'center',
          },{
            title: '表扬',
            key: 'by',
            align: 'center',
          },{
            title: '反映情况',
            key: 'fyqk',
            align: 'center',
          },{
            title: '合计',
            key: 'hj',
            align: 'center',
          },
        ],
        data12: []
      }
    },
    methods: {
      //        待我处理客服信息列表
      getList: function () {
        this.$fetch(this.$url.getKfrxList,this.formItem1)
          .then(res => {
            console.log(res);
            this.data12 = res.data;
          })
      },
      search2: function () {
        this.formItem1.day = this.$formatDate(this.time).substring(0,10)
        this.getList()
        // if (this.time == '') {
        //     this.formItem1.startTime = '',
        //     this.formItem1.endTime = '',
        //     this.getList()
        // } else {
        //   let start1 = DateTool.timesToDate(this.formItem1.startTime[0]);
        //   let end2 = DateTool.timesToDate(this.formItem1.startTime[1]);
        //   this.formItem1.startTime = start1;
        //   this.formItem1.endTime = end2;
        //   this.getList()
        // }
      },
      daochu(){
        this.formItem1.day = this.$formatDate(this.time).substring(0,10)
        this.$getExcel(process.env.BASE_URL+this.$url.exportKfrxList+'?day='+this.formItem1.day)
      }
    },
    mounted () {
    }
  }
</script>

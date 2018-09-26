<template>
  <div>
    <div style="padding: 0px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <Card>
        <Button type="primary" icon="plus">
          新增领料信息
        </Button>
      </Card>
      <Table :columns="columns11" :data="data10" ref="selection"  border height="500" style="margin-top: 20px;" size="small"></Table>
      <Page :total="100" show-total style="margin-top: 10px;"></Page>
    </div>
  </div>
</template>
<script>
  import spInfoPicking from './spInfoPicking.vue'
  export default {
    data () {
      return {
        addPicking: false,
        formItem: {
          date: ''
        },
//        车号、车型、物品名称（轮胎、润滑油）、领料数量、领料规格、供货单位、品牌型号、规格、计量单位、单价、金额、附记、状态（采购、下派）
        columns11: [
          {
            title: '编号',
            key: 'ch',
            align: 'center',
          },
          {
            title: '材料名称',
            key: 'cx',
            align: 'center',
          },
          {
            title: '规格',
            key: 'wpmc',
            align: 'center',
          },
          {
            title: '单位',
            key: 'llsl',
            align: 'center',
          }, {
            title: '计划单价',
            key: 'llsj',
            align: 'center',
            width: 130,
          },
          {
            title: '操作',
            key: 'zt',
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.addPicking = true
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      alert("删除成功")
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data10: []
      }
    },
    components: {
      spInfoPicking
    },
    mounted () {
      const data = [];
      for (let i = 1; i < 11; i++) {
        data.push({
          ch: i + '-05',
          cx: '轮胎',
          wpmc: '直径'+i+'mm',
          llsj: '20元',
          llsl:'个',
          llgg: '10个/件',
          ghdw: '产品' + i + '公司',
          ppxh: '飞毛腿',
          gg: '中',
          jldw: '件',
          dj: i * 67 + 98 + '元',
          je: '789' + i + '元',
          fj: '-----',
          zt: '采购',

        });
      }
      this.data10 = data;
    }
  }
</script>

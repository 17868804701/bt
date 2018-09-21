<!--追加事故经损记录-->
<template>
  <Card style="margin-top: 20px;">
    <!--表格-->
    <p slot="title" >
      追加经损记录
    </p>
    <can-edit-table
      ref="table"
      v-model="tableData"
      :hover-show="true"
      @on-change="handleChange"
      @on-delete="handleDel"
      :editIncell="true"
      :columns-list="initTableColumns"
    ></can-edit-table>
  </Card>
</template>

<script>
  import canEditTable from '../../components/common/canEditTable.vue';
  export default {
    props: {
      tableData: Array,
    },
    components: {
      canEditTable,
    },
    data () {
      return {
        columnsTitle: ['追加公司', '路别', '牌照', '驾驶员姓名', '立案时间', '预估经损', '结案经损', '追加车内', '追加车损', '三者', '合计追加', '追加扣分', '备注'],
        columnsCode: ['zjgs','lb','pz','jsyxm','lasj','ygjs','jajs','zjcn','zjcs','zjsz','hjzj','zjkf','bz'],
      }
    },
    computed: {
      initTableColumns() {
        let coulumns = [
          {
            title: '序号',
            type: 'index',
            width: 80,
            align: 'center',
            fixed: 'left'
          },
        ];
        for (let i = 0; i < this.columnsTitle.length; i++) {
          coulumns.push({
            title: this.columnsTitle[i],
            key: this.columnsCode[i],
            width: 100,
            align: 'center',
//            editable: ((this.columnsTitle[i] === '结案经损')||(this.columnsTitle[i] === '追加车内')||(this.columnsTitle[i] === '追加车损')||
//            (this.columnsTitle[i] === '三者')||(this.columnsTitle[i] === '合计追加')||(this.columnsTitle[i] === '追加扣分')||(this.columnsTitle[i] === '备注'))
          });
        }
//        coulumns.push({
//          title: '操作',
//          key: 'handle',
//          width: 200,
//          fixed: 'right',
//          align: 'center',
//          handle: ['edit'],
//        });

        return coulumns;
      },
    },
    methods: {
      search() {
        console.log('搜索查询');
      },
      deleteData() {
        console.log('查看详情');
      },
      handleDel (val, index) {
        let row = val[index];
        this.deleteLASGZJSGData(row);
      },
      handleChange (val, index) {
        let row = val[index];
        this.updateLASGZJSGData(row);
      },
      updateLASGZJSGData(row) { // 修改立案事故追加信息
        var that = this;
        this.$post(this.$url.security_LASG_updateLoss, row)
        .then(res=>{
          if (res.success === true) {
            this.$Message.success('修改成功!');
          }else{
            this.$Message.error('修改失败!');
          }
          that.$emit('update');
        })
      },
      deleteLASGZJSGData(row) { // 删除立案事故追加信息
        this.$fetch(this.$url.security_LASG_deleteLoss, {id: row.id})
        .then(res=>{
          if (res.success === true) {
            this.$Message.success('删除成功!');
            this.$emit('update');
          }else{
            this.$Message.error('删除失败!');
          }
        })
      },
    },
    mounted () {

    }
  }
</script>

<!--
{
  "bz": "string",
  "hjzj": 0,
  "id": "string",
  "jajs": 0,
  "jsyxm": "string",
  "laid": "string",
  "lasj": "2018-07-30T05:47:10.816Z",
  "lb": "string",
  "pz": "string",
  "ygjs": 0,
  "zjcn": 0,
  "zjcs": 0,
  "zjgs": "string",
  "zjkf": 0,
  "zjsz": 0
}
-->

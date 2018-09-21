<!--安全管理月考核表管理-->
<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="80">
        <Row>
          <Col span="24">
          <FormItem label="按月查询" style="margin: 0;">
            <DatePicker type="month" placeholder="选择月份" :transfer="true" placement="bottom-end" v-model="formItem.date"></DatePicker>
            <Button type="primary" icon="ios-search">搜索</Button>
            <Button type="primary" icon="android-download" style="float: right;margin-right: 10px">导出Excel</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Table border style="margin-top: 10px;" :data="data10" :columns="columns11">
    </Table>
  </div>
</template>

<script>
  import canEditTable from '../../components/common/canEditTable.vue'
  export default {
    components:{
      canEditTable
    },
    data () {
      return {
        formItem: {
          select: '',
          date: ''
        },
        columns11: [
          {
            title: '分公司限速运营月统计结果',
            align: 'center',
            children: [
              {
                title: '单位',
                align: 'center',
                key: 'dw',
              },
              {
                title: '线路',
                align: 'center',
                key: 'xl',
              },
              {
                title: '≥40s',
                align: 'center',
                key: 'rate',
              },
            ]
          }
        ],
        data10: [],
      }
    },
    methods:{
      handleCellChange (val, index, key) {
        this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
      },
      handleChange (val, index) {
        this.$Message.success('修改了第' + (index + 1) + '行数据');
      },
      requestListData() {
//        console.log('限速运营请求数据');
      }
    },
    mounted () {
      const data = [];
      for (let i = 0; i < 14; i++) {
        data.push({
          key: i,
          dw: '公交'+ i +'公司',
          xl: i+'路',
          rate: i
        });
        this.data10 = data;
      }
    }
  }
</script>


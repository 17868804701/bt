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
    <div style="padding: 20px 0 10px 20px;">
    <h2>客服信息列表</h2>
    </div>
    <Tabs :value="tabValue" @on-click="clickTab">
      <TabPane v-if="$showMenu('客服信息登记列表')" label="客服信息登记列表" name="KFDJ">
        <KFDJ ref="KFDJ"></KFDJ>
      </TabPane>
      <TabPane v-if="$showMenu('待我处理列表')" label="待我处理列表" name="DWCL">
        <DWCL ref="DWCL"></DWCL>
      </TabPane>
      <TabPane  label="分公司需知列表" name="XZLB">
        <XZLB ref="XZLB"></XZLB>
      </TabPane>
      <TabPane  v-if="$showMenu('客服热线日汇总表')" label="客服热线日汇总表" name="RHZB">
        <RHZB ref="RHZB"></RHZB>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import * as DateTool from '../../utils/DateTool'
  import KFDJ from './component/kfdj.vue'
  import DWCL from './component/dwcl.vue'
  import XZLB from './component/xzlb.vue'
  import RHZB from './component/rhzb.vue'
  export default {
    components:{
      KFDJ,
      DWCL,
      XZLB,
      RHZB
    },
    data () {
      return {
        tabValue: ''
      }
    },
    methods: {
      clickTab(name){
        this.$refs[name].getList()
      }
    },
    mounted () {
      for (let item in this.$refs) {
        this.$refs[item].getList();
        this.tabValue = item;
        return;
      }
    }
  }
</script>

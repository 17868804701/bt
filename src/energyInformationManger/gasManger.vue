<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">天然气汇总管理</h2>
      <Tabs :value="tabValue" @on-click="clickTab">
        <TabPane v-if="$showMenu('分公司天然气汇总')" label="分公司天然气汇总" name="GAS1">
          <GAS1 ref="GAS1"></GAS1>
        </TabPane>
        <TabPane v-if="$showMenu('天然气月终汇总')" label="天然气月终汇总" name="GAS2">
          <GAS2 ref="GAS2"></GAS2>
        </TabPane>
      </Tabs>
    </div>
  </div>


</template>
<script>
  import GAS1 from './component/gas1.vue'
  import GAS2 from './component/gas2.vue'
  export default {
    components:{
      GAS1,
      GAS2
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

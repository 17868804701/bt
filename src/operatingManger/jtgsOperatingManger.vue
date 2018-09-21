<style>
  .border_line {
    /*border-bottom: 1px solid #e9eaec;*/
    margin-bottom: 10px;
  }
</style>
<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <div class="border_line">
        <h2 style="margin-left: 15px;">
          集团公司运营部统计
        </h2>
      </div>
      <Tabs :value="tabValue" style="margin-top: 5px;" @on-click="changes">
        <TabPane v-if="$showMenu('线路车次正点统计表')" label="线路车次正点统计表" name="XLCCZDTJB">
          <XLCCZDTJB ref="XLCCZDTJB"></XLCCZDTJB>
        </TabPane>
        <TabPane v-if="$showMenu('各公司与集团汇总表')" label="各公司与集团汇总表" name="GGSYJTHZB">
          <GGSYJTHZB ref="GGSYJTHZB"></GGSYJTHZB>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import XLCCZDTJB from './component/xlcczdtjb.vue'
  import GGSYJTHZB from './component/ggsyjthz.vue'
  export default {
    components:{
      XLCCZDTJB,
      GGSYJTHZB
    },
    data () {
      return {
        tabValue:''
      }
    },
    methods: {
      changes(name){
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

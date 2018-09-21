<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        电能消耗管理
      </h2>
      <Tabs :value="tabValue" style="margin-top: 5px;" @on-click="clickTab">
        <TabPane v-if="$showMenu('分公司电能消耗统计')" label="分公司电能消耗统计" name="FGSDN">
          <FGSDN ref="FGSDN"></FGSDN>
        </TabPane>
        <TabPane v-if="$showMenu('集团电能消耗统计')" label="集团电能消耗统计" name="JTGSDN">
          <JTGSDN ref="JTGSDN"></JTGSDN>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import FGSDN from './component/fgsdn.vue'
  import JTGSDN from './component/jtgsdn.vue'
  export default {
    components:{
      FGSDN,
      JTGSDN
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


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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


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
<template>
  <div>
    <div style="padding: 20px 0 10px 20px;">
    <h2>能耗里程台账</h2>
    </div>
    <Tabs :value="tabValue" @on-click="clickTab">
      <TabPane v-if="$showMenu('集团公司能耗里程台账')" label="集团公司能耗里程台账" name="JTNH">
        <JTNH ref="JTNH"></JTNH>
      </TabPane>
      <TabPane v-if="$showMenu('分公司能耗里程台账')" label="分公司能耗里程台账" name="FGSNH">
        <FGSNH ref="FGSNH"></FGSNH>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import * as DateTool from '../../utils/DateTool'
  import JTNH from './components/jtnh.vue'
  import FGSNH from './components/fgsnh.vue'
  export default {
    components:{
      JTNH,
      FGSNH
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

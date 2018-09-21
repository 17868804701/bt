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
    <h2>车次线路收入台账</h2>
    </div>
    <Tabs :value="tabValue" @on-click="clickTab">
      <TabPane v-if="$showMenu('集团公司车次线路收入台账')" label="集团公司车次线路收入台账" name="JTGSSRTZ">
          <JTGSSRTZ ref="JTGSSRTZ"></JTGSSRTZ>
      </TabPane>
      <TabPane v-if="$showMenu('分公司车次线路收入台账')" label="分公司车次线路收入台账" name="FGSSRTZ">
          <FGSSRTZ ref="FGSSRTZ"></FGSSRTZ>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import JTGSSRTZ from './components/jtgssrtz.vue'
  import FGSSRTZ from './components/fgssrtz.vue'
  export default {
    components:{
      JTGSSRTZ,
      FGSSRTZ
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


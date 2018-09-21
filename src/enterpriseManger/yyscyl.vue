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
    width: 100px;
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
    <h2>运营生产原始资料汇总</h2>
    </div>
    <Tabs v-model="tabValue" @on-click="clickTab">
      <TabPane v-if="$showMenu('车次里程耗油季度汇总')" label="车次里程耗油季度汇总" name="YYSCYL1">
        <YYSCYL1 ref="YYSCYL1"></YYSCYL1>
      </TabPane>

      <TabPane v-if="$showMenu('客运量与总收入季度汇总')" label="客运量与总收入季度汇总" name="YYSCYL2">
        <YYSCYL2 ref="YYSCYL2"></YYSCYL2>
      </TabPane>

      <TabPane v-if="$showMenu('车次里程耗油月度分析')" label="车次里程耗油月度分析" name="YYSCYL3">
        <YYSCYL3 ref="YYSCYL3"></YYSCYL3>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import YYSCYL1 from './components/yyscyl1.vue'
  import YYSCYL2 from './components/yyscyl2.vue'
  import YYSCYL3 from './components/yyscyl3.vue'
  export default {
    components:{
      YYSCYL1,
      YYSCYL2,
      YYSCYL3
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

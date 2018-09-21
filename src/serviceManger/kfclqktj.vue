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
    <h2>客服处理情况报表统计</h2>
    </div>
    <Tabs :value="tabValue"  @on-click="clickTab">
      <TabPane v-if="$showMenu('投诉情况分类汇总表')" label="投诉情况分类汇总表" name="KFCLQK1">
        <KFCLQK1 ref="KFCLQK1"></KFCLQK1>
      </TabPane>
      <TabPane v-if="$showMenu('分公司投诉情况分类汇总表')" label="分公司投诉情况分类汇总表" name="KFCLQK2">
        <KFCLQK2 ref="KFCLQK2"></KFCLQK2>
      </TabPane>
      <TabPane v-if="$showMenu('客服处理情况报表统计')" label="客服处理情况报表统计" name="KFCLQK3">
        <KFCLQK3 ref="KFCLQK3"></KFCLQK3>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import KFCLQK1 from './component/kfclqk1.vue'
  import KFCLQK2 from './component/kfclqk2.vue'
  import KFCLQK3 from './component/kfclqk3.vue'
  export default {
    components:{
      KFCLQK1,
      KFCLQK2,
      KFCLQK3,
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

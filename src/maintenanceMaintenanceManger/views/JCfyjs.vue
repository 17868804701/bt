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
    <h2>检测费用结算</h2>
    </div>
    <Tabs :value="tabValue" @on-click="changes">
      <TabPane v-if="$showMenu('月份检测费用结算')" label="月份检测费用结算" name="YJCFY">
        <YJCFY ref="YJCFY"></YJCFY>
      </TabPane>
      <TabPane v-if="$showMenu('季度检测费用结算')" label="季度检测费用结算" name="JDJCFY">
        <JDJCFY ref="JDJCFY"></JDJCFY>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  import YJCFY from '../components/yjcfy.vue'
  import JDJCFY from '../components/jdjcfy.vue'
  export default {
    components:{
      YJCFY,
      JDJCFY
    },
    data () {
      return {
        tabValue: ''
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

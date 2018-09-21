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
      <h2>检测登记</h2>
    </div>
    <Tabs :value="tabValue" @on-click="changes">
      <TabPane v-if="$showMenu('钢瓶检测登记')" label="钢瓶检测登记" name="GPJCDJ">
        <GPJCDJ ref="GPJCDJ"></GPJCDJ>
      </TabPane>
      <TabPane v-if="$showMenu('检测费用设定')" label="检测费用设定" name="JCFYSD">
        <JCFYSD ref="JCFYSD"></JCFYSD>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool'
  import GPJCDJ from '../components/gpjcdj.vue'
  import JCFYSD from '../components/jcfysd.vue'
  export default {
    components:{
      GPJCDJ,
      JCFYSD
    },
    data () {
      return {
        tabValue: 'GPJCDJ'
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

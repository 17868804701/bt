<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        计划管理
      </h2>
      <Tabs :value="tabValue" style="margin-top: 5px;" @on-click="changes">
        <TabPane v-if="$showMenu('集团公司运营计划管理')" label="集团公司运营计划管理" name="jtgsyy">
            <jtgsyy ref="jtgsyy"></jtgsyy>
        </TabPane>
        <TabPane v-if="$showMenu('分公司运营计划管理')" label="分公司运营计划管理" name="fgsyy">
          <fgsyy ref="fgsyy"></fgsyy>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import jtgsyy from './jtgsyy.vue'
  import fgsyy from './fgsyy.vue'
  export default {
    data () {
      return {
        tabValue:''
      }
    },
    components:{
      jtgsyy,
      fgsyy,
    },
    mounted () {
      for (let item in this.$refs) {
        this.$refs[item].getList();
        this.tabValue = item;
        return;
      }
    },
    methods: {
      changes(name){
        this.$refs[name].getList()
      }
    },
  }
</script>

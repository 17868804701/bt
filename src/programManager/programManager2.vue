<template>
  <div>
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        计划管理
      </h2>
      <Tabs :value="tabValue" style="margin-top: 5px;" @on-click="changes">
        <TabPane v-if="$showMenu('分公司收入计划制定')" label="分公司收入计划制定" name="fgssrjh">
          <fgssrjh ref="fgssrjh"></fgssrjh>
        </TabPane>
          <TabPane v-if="$showMenu('市内公交总收入计划制定')" label="市内公交总收入计划制定" name="sngjzsrjh">
            <sngjzsrjh ref="sngjzsrjh"></sngjzsrjh>
          </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import fgssrjh from './fgssrjh.vue'
  import sngjzsrjh from './sngjzsrjh.vue'
  export default {
    data () {
      return {
        tabValue:''
      }
    },
    components:{
      fgssrjh,
      sngjzsrjh
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

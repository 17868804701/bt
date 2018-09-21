<!--基础数据管理-->

<template>
  <div >
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        基础数据管理
      </h2>
      <Tabs style="margin-top: 5px;" @on-click="clickTab">
        <TabPane v-if="$showMenu('维修工信息管理')" label="维修工信息管理" name="WorkerManager">
          <WorkerManager ref="WorkerManager"></WorkerManager>
        </TabPane>
        <TabPane v-if="$showMenu('配件信息管理')" label="配件信息管理" name="PJXXManager">
          <PJXXManager ref="PJXXManager"></PJXXManager>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import WorkerManager from './WorkerManager.vue';
  import PJXXManager from './PJXXManager.vue';
  export default {
    components: {
      WorkerManager,
      PJXXManager,
    },
    data () {
      return {
        currentTab: '',
      }
    },
    methods: {
      clickTab(name) {
        this.$refs[name].requestListData();
      }
    },
    mounted () {
      for (let item in this.$refs) {
        this.$refs[item].requestListData();
        this.currentTab = item;
        return;
      }
    }
  }
</script>


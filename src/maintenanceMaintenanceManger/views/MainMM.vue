<!--保养管理-->

<template>
  <div >
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        保养管理
      </h2>
      <Tabs style="margin-top: 5px;" @on-click="clickTab">
        <TabPane v-if="$showMenu('车辆保养')" label="车辆保养" name="MMList">
          <MMList ref="MMList"></MMList>
        </TabPane>
        <TabPane v-if="$showMenu('检验单管理')" label="检验单管理" name="MMJYDList">
          <MMJYDList ref="MMJYDList"></MMJYDList>
        </TabPane>
        <TabPane v-if="$showMenu('验收单管理')" label="验收单管理" name="MMYSDList">
          <MMYSDList ref="MMYSDList"></MMYSDList>
        </TabPane>
        <TabPane v-if="$showMenu('维修领料管理')" label="维修领料管理" name="MMCLList">
          <MMCLList ref="MMCLList"></MMCLList>
        </TabPane>
        <TabPane v-if="$showMenu('返修管理')" label="返修管理" name="MMBackList">
          <MMBackList ref="MMBackList"></MMBackList>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import MMList from './MMList.vue'; // 车辆保养
  import MMJYDList from './MMJYDList.vue'; // 检验单管理
  import MMYSDList from './MMYSDList.vue'; // 验收单管理
  import MMCLList from './MMCLList.vue'; // 维修领料管理
  import MMBackList from './MMBackList.vue'; // 返修管理
  export default {
    components: {
      MMList,
      MMJYDList,
      MMYSDList,
      MMCLList,
      MMBackList,
    },
    data () {
      return {
        currentTab: ''
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


<!--保养管理-->

<template>
  <div >
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        设备保养管理
      </h2>
      <Tabs  style="margin-top: 5px;" @on-click="clickTab">
        <TabPane v-if="$showMenu('设备保养记录')" label="设备保养记录" name="DeviceBYList">
          <DeviceBYList ref="DeviceBYList"></DeviceBYList>
        </TabPane>
        <TabPane v-if="$showMenu('设备信息管理')" label="设备信息管理" name="DeviceList">
          <DeviceList ref="DeviceList"></DeviceList>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import DeviceBYList from './DeviceBYList.vue'; // 设备保养记录列表
  import DeviceList from './DeviceList.vue'; // 设备信息管理列表
  export default {
    components: {
      DeviceList,
      DeviceBYList,
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


<!--报表管理-->

<template>
  <div style="padding: 20px; height: 100%;">
    <h2>
      报表管理
    </h2>
    <Tabs v-model="currentTab" style="margin-top: 5px;" @on-click="clickTab">
      <TabPane v-if="$showMenu('三级保养台账')" label="三级保养台账" name="RM_SJBYTZ">
        <RM_SJBYTZ ref="RM_SJBYTZ"></RM_SJBYTZ>
      </TabPane>
      <TabPane v-if="$showMenu('三级维护材料使用情况')" label="三级维护材料使用情况" name="RM_SJWHCL">
        <RM_SJWHCL ref="RM_SJWHCL"></RM_SJWHCL>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import * as DateTool from '../../../utils/DateTool';
  import RM_SJBYTZ from './RM_SJBYTZ.vue';
  import RM_SJWHCL from './RM_SJWHCL.vue';
  export default {
    components: {
      RM_SJBYTZ,
      RM_SJWHCL
    },
    data () {
      return {
        currentTab: '',
      }
    },
    computed: {

    },
    methods: {

      clickTab(name) {
        this.$refs[name].requestListData();
      },
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

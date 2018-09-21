<!--安全管理事故考核表-->
<!-- 包含子页面
    安全管理月考核表管理、追加事故经损说明管理、分公司限速运营月统计结果
-->
<template>
  <div >
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        安全管理月考核表管理
      </h2>
      <Tabs value="name1" style="margin-top: 5px;" @on-click="clickTab">
        <TabPane v-if="$showMenu('安全管理月考核表')" label="安全管理月考核表" name="name1">
          <ExamineManager ref="ExamineManager"/>
        </TabPane>
        <TabPane v-if="$showMenu('追加事故经损说明管理')" label="追加事故经损说明管理" name="name2">
          <AddLossList ref="AddLossList"/>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import AddLossList from './AddLossList.vue'
  import ExamineManager from './ExamineManager.vue'
  import RateLimitReport from './RateLimitReport.vue'
  export default {
    components: {
      AddLossList,
      ExamineManager,
      RateLimitReport
    },
    data () {
      return {

      }
    },
    methods: {
      clickTab(name) {
        if (name === 'name1') {
          this.$refs['ExamineManager'].requestListData();
        } else {
          this.$refs['AddLossList'].requestListData();
        }
      }
    },
    mounted () {
      this.$refs['ExamineManager'].requestListData();
    }
  }
</script>

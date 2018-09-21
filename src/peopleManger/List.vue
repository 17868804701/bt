<style>
  .select_name {
    width: 180px;
    border: 1px solid #dddee1;
    border-radius: 5px;
    height: 32px;
    padding-left: 7px;
  }

  .select_name::-webkit-input-placeholder {
    color: #bbbec4;
  }

  #letter {
    margin-right: 10px;
    width: 50px;
    margin-bottom: 10px;
  }
</style>
<template>
  <div style="padding: 20px; height: 100%">
    <h2>
      人员信息管理
    </h2>
    <Tabs style="margin-top: 10px;" @on-click="changes" v-model="tabValue">
      <TabPane v-if="$showMenu('集团人员查询')" label="集团人员查询" name="peopleSearch">
        <peopleSearch ref="peopleSearch"></peopleSearch>
      </TabPane>
      <TabPane v-if="$showMenu('人员岗位统计')" label="人员岗位统计" name="UserStatistics">
        <UserStatistics ref="UserStatistics"></UserStatistics>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import UserStatistics from './UserStatistics.vue'
  import peopleSearch from './peopleSearch.vue'
  export default {
    components: {
      UserStatistics,
      peopleSearch
    },
    data () {
      return {
        tabValue:''
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

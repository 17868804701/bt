<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container h2 {
    margin-left: 15px;
  }
</style>
<template>
  <div>
    <div style="padding: 20px 0 10px 20px;">
    <h2>经济指标完成情况</h2>
    </div>
    <Tabs :value="tabValue" @on-click="clickTab">
      <TabPane v-if="$showMenu('经济指标完成情况（表一）')" label="经济指标完成情况（表一）" name="JJZB1">
        <JJZB1 ref="JJZB1"></JJZB1>
      </TabPane>

      <TabPane v-if="$showMenu('经济指标完成情况（表二）')" label="经济指标完成情况（表二）" name="JJZB2">
        <JJZB2 ref="JJZB2"></JJZB2>
      </TabPane>

      <TabPane v-if="$showMenu('各单位星级考核结果(表三)')" label="各单位星级考核结果(表三)" name="JJZB3">
        <JJZB3 ref="JJZB3"></JJZB3>
      </TabPane>

      <!--<TabPane v-if="$showMenu('经济指标完成情况（表四）')" label="经济指标完成情况（表四）" name="JJZB4">-->
        <!--<JJZB4 ref="JJZB4"></JJZB4>-->
      <!--</TabPane>-->

      <TabPane v-if="$showMenu('经济指标完成情况（表五）')" label="经济指标完成情况（表五）" name="JJZB5">
        <JJZB5 ref="JJZB5"></JJZB5>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import JJZB1 from './components/jjzb1.vue'
  import JJZB2 from './components/jjzb2.vue'
  import JJZB3 from './components/jjzb3.vue'
  import JJZB4 from './components/jjzb4.vue'
  import JJZB5 from './components/jjzb5.vue'
  export default {
    components:{
      JJZB1,
      JJZB2,
      JJZB3,
      JJZB4,
      JJZB5,
    },
    data () {
      return {
        tabValue: ''
      }
    },
    methods: {
      clickTab(name){
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

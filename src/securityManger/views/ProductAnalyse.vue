<!--安全生产情况分析-->
<template>
  <div >
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        安全生产情况分析
      </h2>

      <Tabs v-model="currentTab" style="margin-top: 5px;" @on-click="clickTab">

        <TabPane v-if="$showMenu('安全情况分析')" label="安全情况分析" name="PA_Quarter">
          <PA_Quarter ref="PA_Quarter"></PA_Quarter>
        </TabPane>

        <TabPane v-if="$showMenu('立案事故分布')" label="立案事故分布" name="PA_LASG">
          <PA_LASG ref="PA_LASG"></PA_LASG>
        </TabPane>

        <TabPane v-if="$showMenu('考核事故分布')" label="考核事故分布" name="PA_Examine">
         <PA_Examine ref="PA_Examine"></PA_Examine>
        </TabPane>

        <TabPane v-if="$showMenu('经济损失')" label="经济损失" name="PA_Economic_Losses">
          <PA_Economic_Losses ref="PA_Economic_Losses"></PA_Economic_Losses>
        </TabPane>

        <TabPane v-if="$showMenu('行车责任事故频率')" label="行车责任事故频率" name="PA_XCZR_Rate">
          <PA_XCZR_Rate ref="PA_XCZR_Rate"></PA_XCZR_Rate>
        </TabPane>

        <TabPane v-if="$showMenu('立案事故经损率指标')" label="立案事故经损率指标" name="PA_LASG_LossRateTarget">
          <PA_LASG_LossRateTarget ref="PA_LASG_LossRateTarget"></PA_LASG_LossRateTarget>
        </TabPane>

        <TabPane v-if="$showMenu('车辆安检')" label="车辆安检" name="PA_CLAJ_Yield">
          <PA_CLAJ_Yield ref="PA_CLAJ_Yield"></PA_CLAJ_Yield>
        </TabPane>

        <TabPane v-if="$showMenu('对外投保交强险及赔付情况')" label="对外投保交强险及赔付情况" name="PA_Insure_Paid">
          <PA_Insure_Paid ref="PA_Insure_Paid"></PA_Insure_Paid>
        </TabPane>

      </Tabs>
    </div>
  </div>
</template>

<script>
  import PA_Quarter from '../components/PA_Quarter.vue';
  import PA_LASG from '../components/PA_LASG.vue';
  import PA_Examine from '../components/PA_Examine.vue';
  import PA_Economic_Losses from '../components/PA_Economic_Losses.vue';
  import PA_XCZR_Rate from '../components/PA_XCZR_Rate.vue';
  import PA_LASG_LossRateTarget from '../components/PA_LASG_LossRateTarget.vue';
  import PA_CLAJ_Yield from '../components/PA_CLAJ_Yield.vue';
  import PA_Insure_Paid from '../components/PA_Insure_Paid.vue';
  export default {
    components: {
      PA_Quarter, // 安全情况分析
      PA_LASG, // 立案事故分布
      PA_Examine,
      PA_Economic_Losses,
      PA_XCZR_Rate,
      PA_LASG_LossRateTarget,
      PA_CLAJ_Yield,
      PA_Insure_Paid,
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
    },
  }
</script>









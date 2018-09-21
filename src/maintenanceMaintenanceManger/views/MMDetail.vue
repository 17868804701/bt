<template>
  <div style="padding: 20px; height: 100%;">
    <h2>
      车辆维修养护
      <router-link to="/MainMM">
        <Button type="primary" size="small" style="margin-right: 10px;"><<返回列表页</Button>
      </router-link>
    </h2>
    <!--<div style="margin-top: 20px;">-->
      <!--<Steps :current="currentStep">-->
        <!--<Step title="进厂检验接单"></Step>-->
        <!--<Step title="维修养护测试阶段"></Step>-->
        <!--<Step title="出厂"></Step>-->
      <!--</Steps>-->
    <!--</div>-->

    <AddMMStepOne :sourceData="networkData" @updateInfo="requestDetailData"></AddMMStepOne>
    <AddMMStepTwo :sourceData="networkData" @updateInfo="requestDetailData"></AddMMStepTwo>
    <AddMMStepThree :sourceData="networkData" @updateInfo="requestDetailData"></AddMMStepThree>

    <!--<div style="margin-top: 20px;width: 100%;display: flex;justify-content: center">-->
      <!--<Button v-if="this.currentStep === 0 || this.currentStep === 1" type="primary" @click="nextStep">{{nextStepText}}</Button>-->
    <!--</div>-->

  </div>
</template>
<script>
  import AddMMStepOne from '../components/AddMMStepOne.vue'
  import AddMMStepTwo from '../components/AddMMStepTwo.vue'
  import AddMMStepThree from '../components/AddMMStepThree.vue'
  export default {
    components: {
      AddMMStepOne,
      AddMMStepTwo,
      AddMMStepThree
    },
    data () {
      return {
        currentStep: 0,
        networkData: {},
      }
    },
    computed: {
      nextStepText() {
        if (this.currentStep == 0) {
          return '检验完毕, 开始维修';
        } else if (this.currentStep == 1) {
          return '维修验收结束, 进行出厂登记';
        } else {
          return '';
        }
      },
      isStepTwo() {
//        if (typeof this.networkData.pageJyd.ysxmmc !== 'undefined' || typeof this.networkData.pageYsd.ysxmmc !== 'undefined' || this.networkData.pageLlmx.length > 0) {
//          return true;
//        }
//        return false;
      },
      isStepThree() {

      },
    },
    methods: {
      nextStep() {
        if (this.currentStep === 0) {
          this.currentStep = 1;
        } else if (this.currentStep === 1) {
          this.currentStep = 2;
        } else {

        }
      },
      requestDetailData() {

        let params = {id: this.$route.query.row.id}
        this.$fetch(this.$url.maintain_BYGL_CLBY_recordDetail, params)
        .then(res => {
          console.log(res);
//          if (typeof res.pageJyd.ysxmmc !== 'undefined' || typeof res.pageYsd.ysxmmc !== 'undefined' || res.pageLlmx.length > 0) {
//            this.currentStep = 1;
//          }
//          if (false){
//            this.currentStep = 2;
//          }
//          debugger;
          this.networkData = res;
        })
      },
    },
    mounted () {
      this.requestDetailData();
    }
  }
</script>

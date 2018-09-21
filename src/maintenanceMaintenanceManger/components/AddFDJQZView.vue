<!--添加发动机曲轴检测数据-->
<template>
  <div >
    <Form v-model="qzData" :label-width="70">
      <Tabs value="name1" style="margin-top: 5px;" type="card">
        <TabPane label="曲轴径" name="name1">
          <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
            <FormItem label="直径" style="margin-top: 0px;">
              <Input v-model="qzData.qz_qzj_zj" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="圆度" style="margin-top: 0px;">
              <Input v-model="qzData.qz_qzj_yd" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="圆柱度" style="margin-top: 0px;">
              <Input v-model="qzData.qz_qzj_yzd" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>
        <TabPane label="连杆颈" name="name2">
          <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
            <FormItem label="直径" style="margin-top: 0px;">
              <Input v-model="qzData.qz_lgj_zj" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="圆度" style="margin-top: 0px;">
              <Input v-model="qzData.qz_lgj_yd" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="圆柱度" style="margin-top: 0px;">
              <Input v-model="qzData.qz_lgj_yzd" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  </div>
</template>

<script>

  export default {
    name: 'AddFDJQZView',
    props: {
      qzData: Object,
    },
    components: {
    },
    computed: {
    },
    data () {
      return {

      }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>

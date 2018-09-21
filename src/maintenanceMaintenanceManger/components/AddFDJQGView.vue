<!--添加发动机气缸、凸轮轴检测数据-->
<template>
  <div >
    <Form v-model="qgData" :label-width="50">
      <Tabs value="name1" style="margin-top: 5px;" type="card">
        <TabPane label="气缸上部" name="name1">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="前后" style="margin-top: 0px;">
              <Input v-model="qgData.qg_sb_qh" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="左右" style="margin-top: 0px;">
              <Input v-model="qgData.qg_sb_zy" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>
        <TabPane label="气缸中部" name="name2">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="直径" style="margin-top: 0px;">
              <Input v-model="qgData.qg_zb_qh" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="前后" style="margin-top: 0px;">
              <Input v-model="qgData.qg_zb_zy" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>
        <TabPane label="气缸下部" name="name3">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="直径" style="margin-top: 0px;">
              <Input v-model="qgData.qg_xb_qh" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="前后" style="margin-top: 0px;">
              <Input v-model="qgData.qg_xb_zy" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>

        <TabPane label="活塞尺寸" name="name4">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="直径" style="margin-top: 0px;">
              <Input v-model="qgData.hscc" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>

        <TabPane label="凸轮轴升程" name="name5">
          <div style="display: flex;flex-wrap: wrap;justify-content: flex-start;">
            <FormItem label="进气" style="margin-top: 0px;">
              <Input v-model="qgData.tlz_jq" style="width:120px;"></Input>
            </FormItem>
            <FormItem label="排气" style="margin-top: 0px;">
              <Input v-model="qgData.tlz_pq" style="width:120px;"></Input>
            </FormItem>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  </div>
</template>

<script>

  export default {
    name: 'AddFDJQGView',
    props: {
      qgData: Object,
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

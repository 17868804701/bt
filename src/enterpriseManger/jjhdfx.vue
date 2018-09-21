<!--保养管理-->

<template>
  <div >
    <div style="padding: 20px 10px 0 10px; height: 100%;width: 100%;border-bottom: 0px solid #f5f5f5">
      <h2 style="margin-left: 15px;">
        经济活动分析
      </h2>
      <Tabs value="name1" style="margin-top: 5px;" @on-click="clickTab">
        <TabPane v-if="$showMenu('各公司收入完成对比图')" label="各公司收入完成对比图" name="name1">
          <jjhdfxGgssr ref="jjhdfxGgssr"></jjhdfxGgssr>
        </TabPane>
        <TabPane v-if="$showMenu('百公里收入对比图')" label="百公里收入对比图" name="name2">
          <jjhdfxBglsr ref="jjhdfxBglsr"></jjhdfxBglsr>
        </TabPane>
        <TabPane v-if="$showMenu('直接经济效益分析')" label="直接经济效益分析" name="name3">
          <jjhdfxjjxy ref="jjhdfxjjxy"></jjhdfxjjxy>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import jjhdfxGgssr from './components/jjhdfxGgssr.vue';
  import jjhdfxBglsr from './components/jjhdfxBglsr.vue';
  import jjhdfxjjxy from './components/jjhdfxjjxy.vue';
  export default {
    components: {
      jjhdfxGgssr,
      jjhdfxBglsr,
      jjhdfxjjxy
    },
    data () {
      return {

      }
    },
    methods: {
      clickTab(name) {
        if (name === 'name1') {
          this.$refs['jjhdfxGgssr'].requestData();
        } else if (name === 'name2') {
          this.$refs['jjhdfxBglsr'].requestData();
        }  else {
          this.$refs['jjhdfxjjxy'].requestData();
        }
      }
    },
    mounted () {
      this.$refs['jjhdfxGgssr'].requestData();
    }
  }
</script>


<!-- 季度查询 -->
<template>
  <div >
    <DatePicker type="year" placeholder="选择年份" :transfer="true" placement="bottom-end" v-model="year"></DatePicker>
    <RadioGroup v-model="quarter" style="margin-left: 20px;">
      <Radio label="第一季度"></Radio>
      <Radio label="第二季度"></Radio>
      <Radio label="第三季度"></Radio>
      <Radio label="第四季度"></Radio>
    </RadioGroup>
    <Button type="primary" icon="ios-search">搜索</Button>
    <Button type="primary" icon="android-download" style="position: absolute;right: 0">导出excel</Button>
  </div>
</template>

<script>

  export default {
    name: 'QuarterQuery',
    components: {

    },
    computed: {

    },
    data () {
      return {
        quarter: '',
        year: '',
      }
    },
    methods: {

    },
    mounted () {

    }
  }
</script>

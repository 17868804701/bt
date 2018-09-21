<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container {
    padding: 10px;
    display: flex;
  }
</style>
<template>
  <div style="width: 100%;text-align: center">
    <h1>欢迎使用包头公交ERP</h1>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        split1: 0.5,
        time1: (new Date()).getTime() - 60 * 3 * 1000,
        formItem: {
          input: '',
          select: '',
          date:''
        }
      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

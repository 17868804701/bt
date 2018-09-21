<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
  .container {
    padding: 10px 10px 10px 0;
    border-bottom: 1px solid #eae9ec;
    width: 98%;
    margin-left: 1%;
  }

  .container h2 {
    margin-left: 15px;
  }
  td{
    text-align: center;
    width: 120px;
    height: 40px;
  }
</style>
<template>
<div>
  <div style="width: 100%;border: 0px solid red;display: flex;flex-direction: column;justify-content: center;align-items: center;">
    <div style="text-align: center">
      <span style="font-size: 17px;">机关各部室及基层单位2018年4月</span> <br>
      <span style="font-size: 17px;">{{year}}年{{month}}月{{titles}}</span>
    </div>
    <div style="width: 630px;display: flex;justify-content: space-between;margin-top: 15px;">
      <span>填报部门:企业管理部门</span>
      <span>填报日期：{{year}}年{{month}}月</span>
    </div>
    <table border="1" cellspacing="0" style="margin-top: 10px;width:630px">
      <tr>
        <td>单位</td>
        <td>得分率</td>
        <td>星级</td>
        <td>司售工资计划</td>
      </tr>
      <tr>
        <td>机关部室</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>一公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>二公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>三公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>四公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>五公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>六公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>修理公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>职工培训中心</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>站务管理中心</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>票款结算中心</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>稽查大队</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>长客公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>大自然旅游公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>吉运服务公司</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div style="width: 630px;display: flex;justify-content: space-between;margin-top: 10px">
      <span>总经理：张三</span>
      <span>分管领导：张三</span>
      <span>部门负责人：张三</span>
      <span>制表：张三</span>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    props: {
      scoreList: '',
      month:'',
      year:'',
      titles:''
    },
    data () {
      return {
        value1:1,
        formItem: {
          input: '',
          select: '',
          date: ''
        },
      }
    },
    methods: {}
  }
</script>

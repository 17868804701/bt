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
       <span style="font-size: 17px;">包头市公交运输集团有限责任公司</span> <br>
       <span style="font-size: 17px;">{{year}}年{{month}}月{{titles}}</span>
     </div>
     <div style="width: 630px;display: flex;justify-content: space-between;margin-top: 15px;">
       <span>填报部门:企业管理部门</span>
       <span>填报日期：{{year}}年{{month}}月</span>
     </div>
     <table border="1" cellspacing="0" style="margin-top: 10px;width:630px">
       <tr>
         <td>指标名称</td>
         <td style="width: 10px;">目标值</td>
         <td>分值</td>
         <td style="width: 200px;">实际</td>
         <td>得分</td>
       </tr>
       <tr>
         <td>一、利润总额（万元）</td>
         <td></td>
         <td>18</td>
         <td>
           {{kfsmList['利润总额(万元)']}}
         </td>
         <td>
           {{
           scoreList['利润总额(万元)']
           }}
         </td>
       </tr>
       <tr>
         <td>二、货币资金缴交率</td>
         <td></td>
         <td>20</td>
         <td>{{kfsmList['货币资金交缴率']}}</td>
         <td>
           {{
           scoreList['货币资金交缴率']
           }}
         </td>
       </tr>
       <tr>
         <td>三、服务投诉</td>
         <td></td>
         <td>17</td>
         <td>{{kfsmList['服务投诉']}}</td>
         <td>
           {{
           scoreList['服务投诉']
           }}
         </td>
       </tr>
       <tr>
         <td>四、行车责任事故</td>
         <td></td>
         <td>13</td>
         <td>{{kfsmList['行车责任事故']}}</td>
         <td>
           {{
           scoreList['行车责任事故']
           }}
         </td>
       </tr>
       <tr>
         <td>五、行政管理</td>
         <td></td>
         <td>12</td>
         <td></td>
         <td rowspan="6">
           {{
           scoreList['四防工作']+
           scoreList['现场管理']+
           scoreList['人力资源管理']+
           scoreList['基础管理']+
           scoreList['计划生育']
           }}
         </td>
       </tr>
       <tr>
         <td>1、“四防”工作</td>
         <td></td>
         <td>4</td>
         <td>{{kfsmList['四防工作']}}</td>
       </tr>
       <tr>
         <td>2、现场管理</td>
         <td></td>
         <td>2</td>
         <td>{{kfsmList['现场管理']}}</td>
       </tr>
       <tr>
         <td>3、人力资源管理</td>
         <td></td>
         <td>3</td>
         <td>{{kfsmList['人力资源管理']}}</td>
       </tr>
       <tr>
         <td>4、基础管理</td>
         <td></td>
         <td>2</td>
         <td>{{kfsmList['基础管理']}}</td>
       </tr>
       <tr>
         <td>5、计划生育</td>
         <td></td>
         <td>1</td>
         <td>{{kfsmList['计划生育']}}</td>
       </tr>
       <tr>
         <td>七、党建工会工作</td>
         <td></td>
         <td>20</td>
         <td>{{kfsmList['党建工会工作']}}</td>
         <td>
           {{
           scoreList['党建工会工作']
           }}
         </td>
       </tr>
       <tr>
         <td colspan="2">综合得分率（%）</td>
         <td>100</td>
         <td></td>
         <td>{{
           scoreList['人力资源管理']+
           scoreList['党建工会工作']+
           scoreList['利润总额(万元)']+
           scoreList['四防工作']+
           scoreList['基础管理']+
           scoreList['服务投诉']+
           scoreList['现场管理']+
           scoreList['行车责任事故']+
           scoreList['计划生育']+
           scoreList['货币资金交缴率']
           }}
         </td>
       </tr>
       <tr>
         <td>星级级别</td>
         <td colspan="4"></td>
       </tr>
       <tr>
         <td>备注</td>
         <td colspan="4"></td>
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
      kfsmList:'',
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

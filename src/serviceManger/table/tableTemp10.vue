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
        <td>考核指标</td>
        <td>目标值</td>
        <td>分值</td>
        <td>实际</td>
        <td>得分</td>
      </tr>
      <tr>
        <td>一、利润总额（万元）</td>
        <td></td>
        <td>10</td>
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
        <td>二、运营服务安全生产</td>
        <td></td>
        <td>40</td>
        <td></td>
        <td rowspan="5">
          {{
          scoreList['四防工作']+
          scoreList['经损率(元/万公里)']+
          scoreList['行车责任事故']+
          scoreList['车次率']
          }}
        </td>
      </tr>
      <tr>
        <td>1、车次率</td>
        <td></td>
        <td>10</td>
        <td>{{kfsmList['车次率']}}</td>
      </tr>
      <tr>
        <td>2、一般责任行车事故</td>
        <td></td>
        <td>10</td>
        <td>{{kfsmList['行车责任事故']}}</td>
      </tr>
      <tr>
        <td>3、经损率（元/万公里）</td>
        <td></td>
        <td>10</td>
        <td>{{kfsmList['经损率(元/万公里)']}}</td>
      </tr>
      <tr>
        <td>4、四防工作</td>
        <td></td>
        <td>10</td>
        <td>{{kfsmList['四防工作']}}</td>
      </tr>
      <tr>
        <td>三、日常工作</td>
        <td></td>
        <td>30</td>
        <td></td>
        <td rowspan="4">
          {{
          scoreList['办公秩序']+
          scoreList['基础管理']+
          scoreList['服务满意度']
          }}
        </td>
      </tr>
      <tr>
        <td>1、基础管理</td>
        <td></td>
        <td>2</td>
        <td>{{kfsmList['基础管理']}}</td>
      </tr>
      <tr>
        <td>2、服务满意度</td>
        <td></td>
        <td>3</td>
        <td>{{kfsmList['服务满意度']}}</td>
      </tr>
      <tr>
        <td>3、办公秩序</td>
        <td></td>
        <td>2</td>
        <td>{{kfsmList['办公秩序']}}</td>
      </tr>
      <tr>
        <td>四、党建工会工作</td>
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
        <td colspan="2">综合得分率</td>
        <td>100</td>
        <td></td>
        <td>
          {{
          scoreList['党建工会工作']+
          scoreList['利润总额(万元)']+
          scoreList['办公秩序']+
          scoreList['四防工作']+
          scoreList['基础管理']+
          scoreList['服务满意度']+
          scoreList['经损率(元/万公里)']+
          scoreList['行车责任事故']+
          scoreList['车次率']
          }}
        </td>
      </tr>
      <tr>
        <td>工资总额考核</td>
        <td colspan="2">岗位档次工资标准</td>
        <td>星级级别</td>
        <td>星级工资标准</td>
      </tr>
      <tr>
        <td>领导班子正职（元）</td>
        <td colspan="2">{{xjgzList.zzgwgzbz}}</td>
        <td rowspan="2">{{xjgzList.xjjb}}</td>
        <td>{{xjgzList.fzxjgzbz}}</td>
      </tr>
      <tr>
        <td>副职（元）</td>
        <td colspan="2">{{xjgzList.fzgwgzbz}}</td>
        <td>{{xjgzList.zzxjgzbz}}</td>
      </tr>
      <tr>
        <td>备注</td>
        <td colspan="4"></td>
      </tr>
    </table>
    <div style="width: 630px;display: flex;justify-content: space-between;margin-top: 10px">
      <span>总经理：</span>
      <span>分管领导：</span>
      <span>部门负责人：</span>
      <span>制表：</span>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    props: {
      scoreList: '',
      kfsmList:'',
      xjgzList:'',
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

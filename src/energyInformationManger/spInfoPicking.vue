<style>
  .wid {
    width: 180px;
  }
</style>

<template>
  <div>
    <div style="padding: 10px 10px 0 10px;">
      <Form :model="formItem" :label-width="80">
        <div style="display: flex;flex-wrap: wrap">
          <FormItem label="车号">
            <Select v-model="formItem.select"  style="width: 195px;">
              <Option value="beijing">1号</Option>
              <Option value="shanghai">2号</Option>
              <Option value="shenzhen">3号</Option>
            </Select>
          </FormItem>
          <FormItem label="车型">
            <Select v-model="formItem.select"  style="width: 195px;">
              <Option value="beijing">大型</Option>
              <Option value="shanghai">中型</Option>
              <Option value="shenzhen">小型</Option>
            </Select>
          </FormItem>
          <FormItem label="物品名称">
            <Select v-model="formItem.select"  style="width: 195px;">
              <Option value="beijing">轮胎</Option>
              <Option value="shanghai">润滑油</Option>
            </Select>
          </FormItem>
          <FormItem label="领料数量">
            <Input v-model="formItem.input" placeholder="请输入领料数量"  style="width: 195px;"/>
          </FormItem>
          <FormItem label="领料时间">
            <DatePicker type="date" placeholder="选择领料时间" v-model="formItem.date"  style="width: 195px;"></DatePicker>
          </FormItem>
          <FormItem label="领料规格">
            <Input v-model="formItem.input" placeholder="领料规格"  style="width: 195px;"/>
          </FormItem>
          <FormItem label="供货单位">
            <Select v-model="formItem.select"  style="width: 195px;">
              <Option value="beijing">产品1公司</Option>
              <Option value="shanghai">产品2公司</Option>
              <Option value="shanghai1">产品3公司</Option>
            </Select>
          </FormItem>
          <FormItem label="品牌型号">
            <Input v-model="formItem.input" placeholder="品牌型号"  style="width: 195px;"/>
          </FormItem>
          <FormItem label="规格">
            <Input v-model="formItem.input" placeholder="规格"  style="width: 195px;"/>
          </FormItem>
          <FormItem label="计量单位">
            <Select v-model="formItem.select"  style="width: 195px;">
              <Option value="beijing">件</Option>
              <Option value="shanghai">台</Option>
              <Option value="shanghai1">提</Option>
            </Select>
          </FormItem>
          <FormItem label="单价">
            <Input v-model="formItem.input" placeholder="单价"  style="width: 195px;"/>
          </FormItem>
          <FormItem label="金额">
            <Input v-model="formItem.input" placeholder="金额"  style="width: 195px;"/>
          </FormItem>
          <FormItem label="状态">
            <Select v-model="formItem.select"  style="width: 195px;">
              <Option value="beijing">采购</Option>
              <Option value="shanghai">派发</Option>
            </Select>
          </FormItem>
          <FormItem label="附记">
            <Input v-model="formItem.input" placeholder="附记" style="width: 440px;"/>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>


</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          date: '',
          select: '',
          Input: ''
        },
      }
    }
  }
</script>

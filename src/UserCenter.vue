<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
<template>
  <div style="padding:10px;width: 60%;">
    <h1 style="padding:10px;">个人用户信息</h1>
    <Form :model="formItem" :label-width="80">
      <FormItem label="用户头像">
        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button icon="ios-cloud-upload-outline" style="margin-top: 10px;">上传头像</Button>
        </Upload>
      </FormItem>
      <FormItem label="用户名">
        <Input v-model="formItem.input" placeholder="用户名"></Input>
      </FormItem>
      <FormItem label="所在公司">
        <Select v-model="formItem.select">
          <Option value="公交一公司">公交一公司</Option>
          <Option value="公交二公司">公交二公司</Option>
          <Option value="公交三公司">公交三公司</Option>
        </Select>
      </FormItem>
      <FormItem label="籍贯">
        <Input v-model="formItem.jiguan" placeholder="用户名"></Input>
      </FormItem>
      <FormItem label="性别">
        <RadioGroup v-model="formItem.radio">
          <Radio label="男">男</Radio>
          <Radio label="女">女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="兴趣爱好">
        <CheckboxGroup v-model="formItem.checkbox">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="是否在职">
        <i-switch v-model="formItem.switch" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>
      <FormItem label="个人简介">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="个人简介"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">提交</Button>
        <Button style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          input: 'admin',
          jiguan: '陕西省汉中市',
          select: '公交一公司',
          radio: '男',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: '',
        },
      }
    },
    methods: {}
  }
</script>

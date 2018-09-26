<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
<template>
  <div style="padding:10px;width: 60%;">
    <h2 style="padding:10px;">修改密码</h2>
    <Form :model="formItem" :label-width="80">
      <FormItem label="输入旧密码" style="margin-top:20px;">
        <Input v-model="formItem.oldPass" placeholder="请输入旧密码" type="password"></Input>
      </FormItem>
      <FormItem label="输入新密码" style="margin-top:20px;">
        <Input v-model="formItem.newPass" placeholder="请输入旧密码" type="password"></Input>
      </FormItem>
      <FormItem label="确认新密码" style="margin-top:20px;">
        <Input v-model="okPwd" placeholder="请再次输入新密码" @on-blur="checkSame" type="password"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="updatePwd">修改密码</Button>
        <router-link to="/">
            <Button style="margin-left: 8px">取消</Button>
        </router-link>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        okPwd:'',
        formItem: {
          account:'',
          oldPass:'',
          newPass:'',
        },
      }
    },
    methods: {
      updatePwd(){
        if(this.formItem.newPwd===''||this.formItem.okPwd===''||this.formItem.oldPwd===''){
          this.$Message.error('请输入密码');
        }else {
          let account = sessionStorage.getItem("account");
          this.formItem.account = account;
          this.$post(this.$url.updatePwd+'?account='+this.formItem.account+'&oldPass='+this.formItem.oldPass+'&newPass='+this.formItem.newPass)
            .then(res => {
              if (res.success === true) {
                  this.$Message.success('修改成功');
                  this.$router.push({path:'/'});
              } else {
                this.$Message.error('修改失败')
              }
            })
        }
      },
      checkSame(){
        if(this.formItem.newPass!==this.okPwd){
          this.$Message.error('两次密码输入不一致,请重新输入');
          this.okPwd = ''
        }
      },
    },
    mounted(){
    }
  }
</script>

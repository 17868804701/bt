<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }

  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #495060;
  }

  .logo {
    color: white;
    font-size: 22px;
    font-weight: bold;
    margin-left: -30px;
    align-items: center;
    display: flex;
  }

  .more {
    margin-left: 8px;
    color: white;
    float: right;
  }

  .home_icon {
    color: white;
    font-size: 30px;
    margin-left: 50px;
    margin-top: -5px;
  }


  .menu-item span {
    display: inline-block;
    overflow: hidden;
    font-size: 12px;
    width: 120px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .side2 a {
    color: #515a6e;
  }
  #Sider a {
    color: #333;
  }
  .home_img {
    width: 25px;
    height: 25px;
    margin-left:70px;
    margin-top: 25px;
  }
  .logo_img {
    width: 25px;
    height: 25px;
    margin-top: 5px;
    margin-left: -8px;
    margin-right: 10px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header class="header">
        <div class="logo">
          <img src="./assets/bird.png" alt="" class="logo_img">
          <span>包头公交平台</span>
          <div>
            <router-link to="/" style="color: white">
              <img src="./assets/home.png" alt="" class="home_img">
            </router-link>
          </div>
        </div>
        <div class="demo-avatar">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
          <Dropdown class="more">
            <span>
              欢迎，{{$store.state.userAuth.userAccount}}
              <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list">
                <router-link to="UserCenter" >
                  <span>
                    <DropdownItem>修改密码</DropdownItem>
                  </span>
                </router-link>
              <a v-for="(item2,index) in $store.state.userAuth.appList" :href="item2.apath" target="_blank"  :key="item2.cid+item2.apath+'B'" v-show="item2.aname=='管理平台'">
                <DropdownItem>{{item2.aname}}</DropdownItem>
              </a>
              <span @click="logout">
                <DropdownItem>退出</DropdownItem>
              </span>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Header>
      <Layout style="background: #495060">
        <Sider hide-trigger :style="{background: '#495060'}" id="Sider">
          <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" :accordion="true">
            <router-link v-for="(item2,index) in $store.state.userAuth.appList" :to="item2.apath" v-show="item2.aname=='星级考核'" :key="item2.cid+item2.apath+'A'">
              <MenuItem :name="index" style="height: 50px;line-height:25px;">
                <Icon type="ios-navigate"></Icon> <span style="font-size: 12px;"> {{item2.aname}}</span>
              </MenuItem>
            </router-link>
            <a v-for="(item2,index) in $store.state.userAuth.appList" :href="item2.apath" target="_blank" v-show="item2.aname=='车辆系统'" :key="item2.cid+item2.apath+'C'">
              <MenuItem :name="index" style="height: 50px;line-height:25px;">
                <Icon type="ios-navigate"></Icon> <span style="font-size: 12px;">{{item2.aname}}</span>
              </MenuItem>
            </a>
              <!--<MenuItem :name="index" style="height: 40px;line-height:11px;">-->
                <!--<Icon type="ios-navigate"></Icon> <span style="font-size: 12px;">111</span>-->
              <!--</MenuItem>-->
          </Menu>
          <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" :accordion="true">
            <Submenu :name="item1.cid" v-for="(item1,index) in $store.state.userAuth.classifyList" v-show="item1.ctype!=1" :key="item1.cid+item1.cname+'D'">
              <template slot="title" style="height: 30px;">
                <Icon type="ios-navigate"></Icon> <span style="font-size: 12px;">{{item1.cname}}</span>
              </template>
                <router-link v-for="(item2,index) in $store.state.userAuth.appList" :to="item2.apath"  :key="item2.cid+item2.apath+'F'">
                  <MenuItem :name="index" v-show="item1.cid==item2.cid" style="height: 40px;line-height:11px;">
                     <span style="font-size: 12px;"> {{item2.aname}}</span>
                  </MenuItem>
                </router-link>
            </Submenu>
          </Menu>
        </Sider>
        <Layout style="height: 94vh">
          <Content style="margin:13px 10px 0 20px;background: #fff;height: 90vh}">
            <div id="app" style="padding: 10px;">
              <router-view/>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import VueCookie from 'vue-cookie';
export default {
  name: 'App',
  data () {
    return {
      account:'',
      logoutUrl:'',
      isCollapsed: false,
      id: '',
      URL: '',
      modal1: false,
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
      // appClassfiyList: ,
      // allAppList: ,
      currentClassify: 0,
    }
  },
  mounted() {
    let acessToken = VueCookie.get('access_token');
    // let account =  sessionStorage.getItem("account");
    // this.account = account
    if (acessToken !== null) {
      this.$store.commit('getAllMenu');
      this.$store.commit('getCurrentAuth');
      this.$store.commit('getAllDict');
      this.$store.commit('getAllCLList');
      this.$store.commit('getLBList');
      this.$store.commit('getOriganzation');
      this.$store.commit('getUserSetting');
    }
  },
  methods: {
    logout() {
      console.log('退出登录');
      this.$fetch(process.env.BASE_URL+'/login/logout?access_token=' + VueCookie.get('access_token'))
        .then(res => {
          if (res.success === true) {
            VueCookie.set('access_token', '', -1);
            // window.location.href = process.env.BASE_URL + "/login?service=http://106.12.19.134:8080/bterp";
            window.location.href = process.env.BASE_URL + "/login?service=http://192.168.17.106:8080/bterp";
            // window.location.href = process.env.BASE_URL + "/login?service=http://localhost:8081/#/";
          }
        })
    },
    // getUserSetting() {
    //   let that = this;
    //   let appClassifyURL = process.env.BASE_URL + '/auth/app/getClassify';
    //   this.$fetch(appClassifyURL)
    //     .then(res => {
    //       console.log(res.data,'分类');
    //       that.appClassfiyList = res.data;
    //     });
    //
    //   let allAppURL = process.env.BASE_URL + '/auth/app/getApp';
    //   this.$fetch(allAppURL)
    //     .then(res => {
    //       console.log(res.data,'应用')
    //       that.allAppList = res.data;
    //     })
    // },
    admin(){
      window.location.href = process.env.upload_BASE_URL + 'plat/#/home'
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

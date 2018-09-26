/**
 * Created by qismsom on 2018/8/24.
 */
import {post,fetch,patch,put,getExcel} from '../../../utils/http';
// 当前用户权限
const userAuth = {
  state: {
    authButtons: [],
    menuList: [],
    classifyList: [],
    appList: [],
  },
  mutations: {
    getCurrentAuth(state){//这里的state对应着上面这个state
      if (state.authButtons.length <= 0) {
        fetch(process.env.BASE_URL+'/auth/app/getResrouce')
        .then(res => {
          state.authButtons = res.data;
          //console.log(state.authButtons);
        })
      }
    },
    getAllMenu(state) {
      fetch(process.env.BASE_URL+'/auth/app/getMenu')
      .then(res => {
        state.menuList = res.data;
      })
    },
    showMenu(state, menuName) {
      for (let i = 0; i < state.menuList.length; i++) {
        let menu = state.menuList[i];
        if (menu.mname === menuName) {
          return true;
        }
      }
      return false;
    },
    getUserSetting(state) {
      let that = this;
      let appClassifyURL = process.env.BASE_URL + '/auth/app/getClassify';
      fetch(appClassifyURL)
        .then(res => {
          console.log(res.data,'分类');
          state.classifyList = res.data;
        });

      let allAppURL = process.env.BASE_URL + '/auth/app/getApp';
      fetch(allAppURL)
        .then(res => {
          console.log(res.data,'应用')
          state.appList = res.data;
        }),
        post(process.env.BASE_URL +'/3e-platform-modules-auth/user/getUserInfo')
          .then(res => {
            console.log(res);
            if (res.success === true) {
              sessionStorage.setItem("account", res.account);
              sessionStorage.setItem("name", res.name);
            } else {

            }
          });
    }
  }
}

export default userAuth;

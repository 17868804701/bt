import Vue from 'vue';
import App from './App.vue';
import router from './router';
import iView from 'iview';
import vueshowpdf from 'vueshowpdf'
import vuePdfjs from 'vue-pdfjs'
import 'iview/dist/styles/iview.css';
import {Message} from 'iview';
import canEditTable from './components/common/canEditTable.vue'
import VueCookie from 'vue-cookie'
// 网络相关 全局变量
import {post,fetch,patch,put,getExcel} from '../utils/http';
import {formatDate_hs} from '../utils/DateTool';
import URLUntil from '../utils/NetworkDefine';
//store
import store from './store';
//auth
import has from '../plugins/CustomDirectives';
import {showMenu} from '../utils/AuthTool'

// pdf导出
import htmlToPdf from '../utils/htmlToPdf'
Vue.use(htmlToPdf);



Vue.prototype.$url=URLUntil;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$getExcel=getExcel;
Vue.prototype.$formatDate=formatDate_hs;
// Vue.prototype.$VueCookie=VueCookie;
Vue.prototype.$showMenu=showMenu;


//定义全局变量

Vue.use(iView);
Vue.use(vueshowpdf);
Vue.use(vuePdfjs);
Vue.use(canEditTable);
Vue.use(VueCookie);

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  beforeCreate: function () {
    // console.group('beforeCreate 创建前状态===============》');
    this.$router.push({path:'/'});
  },
});

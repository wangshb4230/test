// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ajaxUtil from "./components/common/unit/AjaxUtil";
import '../static/css/css/style.css';
import '../static/css/fonts/iconfont.css';
import "../static/css/js/zTree_v3/js/jquery.ztree.core.min.js";
import "../static/css/js/zTree_v3/js/jquery.ztree.excheck"
import "../static/css/js/zTree_v3/css/zTreeStyle/zTreeStyle.css";
import ElementUi from 'element-ui'

import '../theme/index.css'
// import axios from 'axios'
import App from './App'
import router from './router'
import './styles/font.css'
import echarts from 'echarts'
import DateFormat from './components/common/unit/DateFormat'
import AppConfig from '../static/ApplicationConfig'
import Print from './components/common/unit/print'
// import Print from 'vue-print-nb'
Vue.use(Print) // 打印
Vue.use(ElementUi);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.auth){// 判断该路由是否需要登录权限
    // console.log("当前页面需要校验是否已经登陆");
    if (sessionStorage.getItem("token") != null){// 判断当前的token是否存在 ； 登录存入的token
      next();
    }else {
      next({
        path: '/',
        query:{redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

//js日期格式化
DateFormat.init();

//引入公共信息文件
// var AppConfig = app_config;
Vue.prototype.AppConfig = AppConfig;
Vue.prototype.ajaxUtil = ajaxUtil;
Vue.prototype.$echarts = echarts;
//赋给全局使用
window.$ = $;
window.echarts = echarts;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

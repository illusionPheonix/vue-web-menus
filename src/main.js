import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import session from "@/utils/session";
// 引入echarts，并挂载在vue原型上
// 解决路由重复报错
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


// 引入 样式
import './assets/styles/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/common.less';


//权限检查方法
Vue.prototype.$_has = function (value) {
  // debugger
  let isShow = false;

  let buttonperms = session.get("permission")
  if (buttonperms.length == 0) {
    return false;
  } else if (buttonperms.indexOf(value) > -1) {
    isShow = true;
  }

  return isShow;
};

/**权限指令**/
Vue.directive('has', {
  bind: function (el, binding) {
  },
  inserted: function (el, inserting) {
    if (!Vue.prototype.$_has(inserting.value)) {
      el.parentNode.removeChild(el);
    }
  }
});


Vue.use(ElementUI);

Vue.config.productionTip = false

// 路由守卫

router.beforeEach((to, from, next) => {
  const token = session.get('shenji-2020-system') ? session.get('shenji-2020-system') : window.localStorage.getItem("tempToken");
  // 哪些需要验证
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (token) {
      next()
    } else { //没有token
      if (to.path === '/login') {
        next()
      } else {
        // 想去其他界面，调到登录
        ElementUI.Message.error('请先登录');
        next('/login');
      }
    }
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
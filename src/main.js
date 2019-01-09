// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import App from './App'
import router from './router'
import Http from '@/plugins/http'
import moment from 'moment'
import MyBread from '@/components/cusBread.vue'
Vue.use(Http)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 全局组件
Vue.component(MyBread.name,MyBread);
//处理日期格式
Vue.filter('fmtDate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
// @符号->src  这套模板带的方法
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
Vue.use(Router)

export default new Router({
  routes: [{  
    name:"home",
    path:"/",
    component:Home
  },{
    name:"login",
    path:"/login",
    component:Login
  }
]
})

import Vue from 'vue'
import Router from 'vue-router'
// @符号->src  这套模板带的方法
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import Goods from '@/components/goodslist.vue'
import {Message} from 'element-ui';
import GoodsAdd from '@/components/goodsadd.vue'

Vue.use(Router)

  const router = new Router({
  routes: [{  
    name:"home",
    path:"/",
    component:Home,
    children:[{
      name:"users",
      path:"/users",
      component:Users
    },
    {
      name:"rights",
      path:"/rights",
      component:Rights
     },
     {
      name:"roles",
      path:"/roles",
      component:Roles
     },{
      name:"goods",
      path:"/goods",
      component:Goods
     },{
      name:"goodsadd",
      path:"/goods/add",
      component:GoodsAdd
     }
  ]
  },
  {
    name:"login",
    path:"/login",
    component:Login
   },
  
  ]
})
router.beforeEach((to,from,next)=>{
  
  // 如果要去的是登录-> 继续执行路由配置 next()
    if (to.name==='login') {
      next();
    }
  // 如果要去的是home-> 判断token ->如果有token ->next() ->如果没有返回login
    const token = localStorage.getItem('token');
    if(!token){
      Message.warning('请先登录');
      router.push({
        name:"login"
      })
    }else{
      next();
    }
})
export default router;

<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
         <img src="@/assets/logo.png" alt="">
         </el-col>
        <el-col :span="19">
          <h3 class="middle">电商后台管理系统</h3>
        </el-col>
        <el-col :span="1"><a href="#" class="loginout" @click.prevent="handleLoginout()">退出</a></el-col>
      </el-row>
    </el-header>
  <el-container>
  <el-aside width="200px" class="aside">
    <!-- 导航 -->
    <el-menu default-active="2" unique-opened router>
     <!-- 1 -->
      <el-submenu :index="''+item1.order" v-for="item1 in menus" :key="item1.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item1.authName}}</span>
        </template>
        <el-menu-item :index="item2.path" v-for="item2 in item1.children" :key="item2.id">
          <i class="el-icon-location"></i>          
          {{item2.authName}}</el-menu-item>      
      </el-submenu> 
    </el-menu>
  
                   
    
  </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  beforeCreate(){
    // if(!localStorage.getItem("token")){
      // this.$router.push({
      //   name:"login"
      // })
    // }
  },
  data(){
    return{
      menus:[]
    }
  },
   created() {
      this.getMenus()
    },
  methods:{
   
    async getMenus(){
      const res = await this.$http.get(`menus`);
      console.log(res);
      this.menus = res.data.data;
    },
    handleLoginout(){
      // 1.清除token
      localStorage.clear();
      // 2.回到登录
      this.$router.push({
        name:"login"
      })
      // 3.退出成功
      this.$message.success("退出成功");
    }
  }
}
</script>

<style>
.container{
  height: 100%;
}
.aside{
  
  background-color: cornsilk;
}
.header{
  
  background-color: #b3c0d1;
}
.main{
  background-color: pink;
}
.middle{
  line-height: 60px;
  text-align: center;
  color: #fff;
}
.loginout{
  line-height: 60px;  
  text-decoration: none;
}
</style>

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
        <el-col :span="1"><a href="#" class="loginout">退出</a></el-col>
      </el-row>
    </el-header>
  <el-container>
  <el-aside width="200px" class="aside">
    <!-- 导航 -->
    <el-menu default-active="2" unique-opened>
     <!-- 1 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="1-1">
          <i class="el-icon-location"></i>          
          用户列表</el-menu-item>      
        </el-submenu>   
        <!-- 2 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="2-1">
          <i class="el-icon-date"></i>           
          角色列表</el-menu-item>  
          <el-menu-item index="2-1">
          <i class="el-icon-date"></i>           
          权限列表</el-menu-item>      
        </el-submenu> 
        <!-- 3    -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">
          <i class="el-icon-setting"></i>           
          商品列表</el-menu-item>
          <el-menu-item index="3-2">
          <i class="el-icon-setting"></i>           
          分类参数</el-menu-item>
          <el-menu-item index="3-3">
          <i class="el-icon-setting"></i>           
          商品分类</el-menu-item>      
      </el-submenu> 
      <!-- 4 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">
          <i class="el-icon-location"></i>          
          选项1</el-menu-item>      
        </el-submenu>   
        <!-- 5 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-date"></i>           
          选项1</el-menu-item>      
        </el-submenu> 
    </el-menu>
  
                   
    
  </el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  
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

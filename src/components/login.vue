<template>
<div class="login-warp">
  <el-form label-position="top" 
  label-width="80px" 
  :model="formdata"
  class="form">
  <h3>用户登录</h3>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
    <el-button type="primary" class="btn"
    @click.prevent="handleLogin()">登录</el-button>
</el-form>
</div>
</template>

<script>
export default {
   data() {
      return {
        formdata: {
          username: '',
          password: '',        
        }
      };
    },
    methods: {
      async handleLogin(){
        const res = await this.$http.post("login",this.formdata);
        const {data:{data,meta:{msg,status}}} = res;
        if(status === 200){
          //保存token值(将来写其他功能会用到)
          localStorage.setItem('token',data.token)
          this.$router.push({
            name:"home"
          })
        }else{
          this.$message.warning(msg);
        }
      }






   },
      // handleLogin(){
      //   this.$http
      //   .post("login",this.formdata)
      //   .then((res)=>{
      //     // console.log(res); 
      //     const {data:{data,meta:{msg,status}}} =res;
      //     if(status ===200){
      //       this.$router.push({
      //         name:"home"
      //       })
      //       // this.$message.success(msg)
      //       // this.$message({
      //       //   message:msg,
      //       //   type:"success"
      //       // })
      //     }else{
      //       this.$message.warning(msg)
      //       // this.$message({
      //       //   message:msg,
      //       //   type:"error"
      //       // })
      //     }
      //   })
      // }
   
}
</script>

<style>
.login-warp{
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-warp .form{
  width: 400px;
  padding:25px 30px;
  background-color: #fff;
  border-radius: 4px;
}
.login-warp .btn{
  width: 100%
}
</style>

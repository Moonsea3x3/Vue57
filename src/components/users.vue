<template>
  <el-card class="card">
    <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索+输入框 -->
    <el-row>
      <el-col>
        <el-input placeholder="请输入用户名" v-model="query" class="input-with-select" 
        clearable @clear="getAllUsers()">
        <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
      </el-input>
      <el-button type="success" plain @click="showDiaAdd()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑用户对话框 -->
       <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配角色对话框 -->
      <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            {{currUserName}}
          </el-form-item> 
          <el-form-item label="角色" :label-width="formLabelWidth">
            <!-- 
             1. v-model 绑定数据
             v-model绑定的数据如果和option的value值一样 默认选项option
             点击不同的option时 v-model绑定的值就会变化 变成点击的option的value
             -->
            
          <el-select v-model="currUserRoleId">
            <!-- 请选择 -->
          <el-option label="请选择" :value="-1" disabled></el-option>
          <!-- v-for遍历 -->
          <el-option v-for="(v,i) in roles" :key="i"
          :label="v.roleName" 
          :value="v.id"
          ></el-option>
      </el-select>
    </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 表格 -->
     <el-table  class="table"
      :data="tableData" style="width: 100%" height="300px">
      <el-table-column prop="id" label="#" width="80"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"> </el-table-column>
      <el-table-column  label="创建日期" width="120">
       <template slot-scope="list">   
         <!-- slot-scope上下级传递数据 -->
        {{list.row.create_time|fmtDate}}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="120">
        <template slot-scope="scope">
          <el-switch @change="changeUserState(scope.row)"
          v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
        </template>
       </el-table-column>
      <el-table-column label="操作" width="180" size="mini">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" size="mini" plain circle
            @click="showEditDia(scope.row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
            @click="showDeleConfim(scope.row)"
            ></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain circle
            @click="showDiaRole(scope.row)"></el-button>
          </el-row>
        </template>
      </el-table-column>
      
    </el-table> 
    <!-- 分页 -->
     <!-- @size-change 每页显示条数改变时
      @current-change 当前页码改变
      :current-page 当前页码
      :page-sizes="[100, 200, 300, 400]" 控制每页显示条数所在的数组
      layout="total, sizes, prev, pager, next, jumper" 分页组件的小功能
      :total="400 数组总个数 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  
</el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      tableData: [],
      pagenum: 1,
      pagesize: 2,
      total:-1,
      form:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },
     
      formLabelWidth:"100px",
      //添加用户对话框的显示/隐藏
      dialogFormVisibleAdd:false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleRole:false,
      // 下拉框
      currUserRoleId:-1,
      roles : [],
      currUserName :"",
      currUserId:-1
    };
  },
  created() {
    this.pagenum = 1;
    this.getTableData();
  },
  methods: {
    // 分配用户角色
    async setRole(){
      // 没有用户id 在data中提供声明currUserId
      const res = await this.$http.put(`users/${this.currUserId}/role`,{
        rid:this.currUserRoleId
      })
      console.log(res);
      this.dialogFormVisibleRole = false;
    },
    //分配角色
    async showDiaRole(user){
      this.currUserId = user.id;
      // console.log(user);  没有当前用户的角色id
      this.currUserName = user.username;
      // 获取所有角色
      const res = await this.$http.get(`roles`)
      // console.log(res);
      this.roles = res.data.data;
      // console.log(this.roles);  所有的角色id
      const res2 = await this.$http.get(`users/${user.id}`);
      // console.log(res2);   用户与角色id
      this.currUserRoleId = res2.data.data.rid;
      this.dialogFormVisibleRole = true;
    },
    // 修改用户状态
    async changeUserState(user){
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
    // console.log(res);
    }, 
    // 编辑用户 - 发送请求
    async editUser(){
      const res = await this.$http.put(`users/${this.form.id}`,{
        email:this.form.email,
        mobile:this.form.mobile
      });
      const {meta:{mas,status}} = res.data;
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.getTableData();
      }else{
        this.$message.warning(msg);
      }

    },
    // 编辑用户 -打开提示框
    showEditDia(user){
      // console.log(user)
      this.form = user;
      this.dialogFormVisibleEdit = true;
    },
    // 删除用户 -打开提示框
    showDeleConfim(user){
      // console.log(user);
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 发送删除请求 id是用户id
          const res = await this.$http.delete(`users/${user.id}`)
          // console.log(res)
          const {
            meta:{msg,status}
          } = res.data
          if(status===200){
            this.$message.success(msg);
            this.getTableData();
          }
        }).catch(() => {
          this.$message.warning("取消删除");          
        });
    },
    // 添加用户 - 发送请求
    async addUser(){
      // 发送请求
      const res = await this.$http .post(`users`,this.form)
      // console.log(res); 
      const {
        meta:{msg,status} 
      } = res.data;
      if(status ===201){
        // 关闭对话框
        // 刷新表格
        this.dialogFormVisibleAdd = false;
        this.getTableData();
      }else{
        this.$message.warning(msg);
      }
    },
    //添加用户中的显示对话框
    showDiaAdd(){
      this.form={};
      this.dialogFormVisibleAdd = true;
    },
    //清空按钮时  重新获取数据
    getAllUsers(){
      this.getTableData();
    },
    //搜索用户 
    searchUser(){
      this.getTableData();
    },
    //分页相关方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTableData();
    },


    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const { data: { data: { total, users }, meta: { status, msg } } } = res;
      if (status === 200) {
        // 1.给表格赋值
        this.tableData = users;
        this.total = total;
        // console.log(this.tableData);
        // 2.提示
        this.$message.success(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.input-with-select {
  margin-top: 20px;
  width: 350px;
}
.table{
  overflow: auto;
  
}
</style>

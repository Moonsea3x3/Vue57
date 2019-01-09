<template>
  <el-card class="card">
    <my-bread level1 ="权限管理" level2="角色列表"></my-bread>

    <!-- 添加按钮 -->
    <el-row class="row">
      <el-col>
        <el-button type="primary" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
     <el-table :data="roles" style="width: 100%" height="400px">
    <el-table-column type="expand" width="100">
      <template slot-scope="bottom">
        <!-- 展开之后的内容  分析布局 行列-->
        <!-- item1.id是每个权限的标识  唯一 -->
        <el-row  v-for="item1 in bottom.row.children" :key="item1.id"  >
          <el-col :span="4">
            <!-- 一级权限 -->
            <el-tag closable class="level1"
            @close="deleRights(bottom.row,item1)"
            >{{item1.authName}}</el-tag> 
            <i class="el-icon-arrow-right"></i>
            </el-col>
          <el-col :span="20">
           <el-row v-for="item2 in item1.children" :key="item2.id">
             <el-col :span="4"> 
               <!-- 二级权限 -->
               <el-tag @close="deleRights(bottom.row,item2)"
               type="success" closable class="level2">{{item2.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>                   
               </el-col>
             <el-col :span="20"> 
               <!-- 三级权限 -->
               <el-tag @close="deleRights(bottom.row,item3)"
               type="warning" v-for="item3 in item2.children" :key="item3.id" closable class="level3">{{item3.authName}}</el-tag > 
               </el-col>
           </el-row>
          </el-col>
        </el-row>
        <el-row v-if="bottom.row.children.length ===0">
          <el-col><span>该角色为分配权限</span></el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column label="#" type="index" width="80"></el-table-column>
    <el-table-column label="角色名称" prop="roleName" width="260"></el-table-column>
    <el-table-column label="角色描述" prop="roleDesc" width="280"></el-table-column>
    <el-table-column label="操作" width="180" size="mini">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" size="mini" plain circle
            @click="showDia(scope.row)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain circle
            @click="showDeleConfim(scope.row)"
            ></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" plain circle
            @click="showDiaRight(scope.row)"></el-button>
          </el-row> 
        </template>
    </el-table-column>
  </el-table>
  <!-- 分配权限对话框 -->
      <el-dialog  title="分配权限"  :visible.sync="dialogVisiblerights"  width="50%">
        <!-- 
          :data="树形结构绑定的数据"
          show-checkbox  是否支持选中
          node-key=  每个节点唯一标识
          :default-expanded-keys="[默认展开 想要展开的节点的id值]"
          :default-checked-keys="[默认选中 被选中的节点的id值]"
          :props="配置选项   {label，children}">
          :default-checked-keys="[5]"
          default-expand-all
          :default-expanded-keys="expandeArr"   循环遍历全部展开
          
          :default-checked-keys="expandeArr"
        
          
         -->
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"        
        :default-checked-keys="expandeArr"            
        >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblerights = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>


<script>
export default {
  data() {
    return {
      roles:[],
      treeData:[],
      dialogVisiblerights:false,
      defaultProps:{
        // label和children的值来源于树形结构绑定数据可要名
        // label指的是文本信息
        // children指的树形结构的子节点的数据的key名
        label:"authName",
        children:"children",
      },
      expandeArr:[],
      currRolesId:-1
    }
  },
  created(){
    this.getRoles();
  },
   methods: {
    //  分配权限 -发送请求
    async setRights(){
      // console.log(this.$refs); dom元素
      // 获取树形结构tree全选节点
      const arr1 = this.$refs.tree.getCheckedKeys();
      // console.log(arr1);
      // 获取树形结构tree半选节点
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      // console.log(arr2);
      const arr = [...arr1,...arr2];
      // console.log(arr);
      const res = await this.$http.post(`roles/${this.currRolesId}/rights`,{
        rids:arr.join(",")
      })
      console.log(res);
      this.getRoles();
      this.dialogVisiblerights = false;

    },
    //  设置分配权限 -打开对话框
    async showDiaRight(rights){
      this.currRolesId = rights.id;
      // 获取属性结构的权限数据
      const res = await this.$http.get(`rights/tree`)
      // console.log(res);
      this.treeData = res.data.data;
      this.dialogVisiblerights = true;
    /**   遍历
      const tempArr = [];
      this.treeData.forEach((item1) => {
        tempArr.push(item1.id);
        item1.children.forEach((item2)=>{
          tempArr.push(item2.id);
          item2.children.forEach((item3)=>{
            tempArr.push(item3.id);
          })
        })
      });
      console.log(tempArr);
      this.expandeArr = tempArr;
     */
      const tempArr = [];

      rights.children.forEach((item1) => {
        item1.children.forEach((item2)=>{
          item2.children.forEach((item3)=>{
            tempArr.push(item3.id);
         })
        })
      });
      this.expandeArr = tempArr;

    },
     //删除权限
     async deleRights(role,rights){
      //  console.log(role);
       const res = await this.$http.delete(`roles/${role.id}/rights/${rights.id}`)
        // console.log(res);
        role.children = res.data.data        
       
     },

    async getRoles(){
    const res = await this.$http.get(`roles`);
    this.roles = res.data.data;
    // console.log(this.roles);
    }
    
  },
}
</script>

<style>
.card{
  height: 100%;
}
.row{
  margin-top: 20px;
}
.level1, .level2, .level3{
  margin-top: 10px;
}
</style>

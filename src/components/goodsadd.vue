<template>
  <el-card class="card">
    <my-bread level1="商品管理" level2="商品列表">  
    </my-bread>
      <el-row>
        <el-col class="marg">
          <el-alert  title="添加商品信息"  type="info" center :closable="false" show-icon>
       </el-alert>
      </el-col>
      </el-row>
    <!-- 步骤条 -->
    <el-steps :active="1*active" align-center class="center">
      <el-step title="基本信息" ></el-step>
      <el-step title="商品参数" ></el-step>
      <el-step title="商品属性" ></el-step>
      <el-step title="商品图片" ></el-step>
      <el-step title="商品内容" ></el-step>
    </el-steps>
   
   <!-- 输入框 -->
  <el-form label-position="top" :model="form" label-width="80px" class="hei-auto">
    <el-tabs tab-position="left" v-model="active">
      <el-tab-pane name="1" label="基本信息">
            <el-form-item label="商品名称">
            <el-input v-model="form.goods_name">  </el-input>
        </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price">  </el-input>
        </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight">  </el-input>
        </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number">  </el-input>
        </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器(表单元素)
                  :options="options"  数据源
                  v-model="selectedOptions"  被选中的label的value值
                  @change="handleChange"  改变label
                  props 配置选项 ={label/value/children} 赋值来源都是options数据源中的key名
                -->

            <el-cascader expand-trigger="hover"  :options="options"
              v-model="selectedOptions"  :props="defaultProp"
              clearable  @change="handleChange">
            </el-cascader>
          </el-form-item>
         

      </el-tab-pane>
        <!-- tab导航左侧 -->
    <!-- 当选中某个tab时  v-model绑定的数据active其值就是被选中的name值 -->
    
      <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
    
    </el-tabs>
 
   </el-form>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active:'1',
      form:{
        goods_name:'',
        goods_cat:'',
        goods_price:'',
        goods_number:'',
        goods_weight:'',
        goods_introduce:'',
        pics:'',
        attrs:''
      },
      options:[], 
      selectedOptions:[],
      defaultProp:{
        // label/value/children
        label:"cat_name",
        value:"cat_id",
        children:"children"
      }
    }
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 级联选择器方法
    handleChange(){

    },
    // 获取三级分类数据
    async getGoodsCate(){
      const res = await this.$http.get(`categories?type=3`)
      console.log(res);
      this.options = res.data.data;
      
    }
  },
};
</script>


<style>
.card {
  height: 100%;
}
.marg {
  margin-top: 20px;
}
.center{
  margin: 20px 0;
}
.hei-auto{
  height: 400px;;
  overflow: auto;
}
</style>

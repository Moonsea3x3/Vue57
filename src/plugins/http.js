// 发送请求
import axios from 'axios'
import { promises } from 'fs';
const Http = {}
Http.install = function (Vue) {

  axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

  axios.interceptors.request.use(function(config){
    // console.log(config)  1.headers  2.url
    // console.log(config.url);

    if(config.url !=="login"){
      const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      config.headers.Authorization = AUTH_TOKEN;
    }
    
    return config;
  },function(error){
    return promises.reject(error);
  })

  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default Http
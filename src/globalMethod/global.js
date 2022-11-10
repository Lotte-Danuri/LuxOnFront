export default{
    install(Vue){
        Vue.config.globalProperties.$comma = function(val){
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        Vue.config.globalProperties.$isLogin = function(){
            if (localStorage.getItem("token") == null) {
                return false;
              }
              return true;
        }
    }
}
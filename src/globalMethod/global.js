export default{
    install(Vue){
        Vue.config.globalProperties.$comma = function(val){
            return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}
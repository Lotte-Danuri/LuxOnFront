import mitt from 'mitt';
const emitter = mitt();

export default {
  install(Vue) {
    Vue.config.globalProperties.$comma = function (val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    Vue.config.globalProperties.$isLogin = function () {
      if (localStorage.getItem('token') == null) {
        return false;
      }
      return true;
    };
    Vue.config.globalProperties.$formatDatetime = function (date) {
      return date.getFullYear() + '년 ' + 
      (date.getMonth() + 1) + '월 ' + 
      date.getDate() + '일 ' + 
      date.getHours() + '시 ' + 
      date.getMinutes() + '분';
    };
    Vue.config.globalProperties.$emitter = emitter;
  },
};

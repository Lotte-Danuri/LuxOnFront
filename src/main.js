// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import mixins from './mixins';
import globals from '@/globalMethod/global.js';

// import 'bootstrap/dist/js/bootstrap.js';

// main.js
// import './index.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import VuePaginate from 'vue-pagination-2';

import VCalendar from 'v-calendar';

import YoutubeIframe from '@techassi/vue-youtube-iframe';

createApp(App)
  .use(YoutubeIframe)
  .use(VCalendar)
  .use(VueSweetalert2)
  .use(router)
  .use(globals)
  .mixin(mixins)
  .mount('#app');

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// createApp(App).use(router).use(IconsPlugin).use(BootstrapVue).mount('#app');

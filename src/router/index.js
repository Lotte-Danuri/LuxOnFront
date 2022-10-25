import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '@/views/luxon/HomeView.vue';
import LuxOn from '@/layouts/luxon/Index.vue';
import MyMain from '@/views/luxon/MyMain.vue';
import MyAdmin from '@/views/admin/DashBoard.vue';

const routes = [
  {
    path: '/',
    component: LuxOn,
    children: [
      {
        path: '/MyMain',
        name: 'MyMain',
        component: MyMain,
      },
    ],
  },
  {
    path: '/admin',
    component: MyAdmin,
    children: [
      {
        path: '/DashBoard',
        name: 'DashBoard',
        component: MyAdmin,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;

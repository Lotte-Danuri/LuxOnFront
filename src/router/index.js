import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '@/views/luxon/HomeView.vue';
import Index from '@/layouts/luxon/index.vue';
import MyMain from '@/views/luxon/myMain.vue';
import MyAdmin from '@/layouts/admin/adminIndex.vue';
import DashBoard from '@/views/admin/dashBoard.vue';
import MyLogin from '@/views/luxon/auth/myLogin.vue';
import MySignup from '@/views/luxon/auth/mySignup.vue';

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/main',
        name: 'MyMain',
        component: MyMain,
      },
      {
        path: '/login',
        name: 'login',
        component: MyLogin,
      },
      {
        path: '/signup',
        name: 'signup',
        component: MySignup,
      },
    ],
  },
  {
    path: '/admin',
    component: MyAdmin,
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: DashBoard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;

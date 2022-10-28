import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '@/views/luxon/HomeView.vue';
import Index from '@/layouts/luxon/index.vue';
import MyMain from '@/views/luxon/myMain.vue';
import MyList from '@/views/luxon/myList.vue';
import MyAdmin from '@/layouts/admin/adminIndex.vue';
import DashBoard from '@/views/admin/dashBoard.vue';
import MyLogin from '@/views/luxon/auth/myLogin.vue';
import MyLogout from '@/views/luxon/auth/myLogout.vue';
import MySignup from '@/views/luxon/auth/mySignup.vue';
import KaKaoLogin from '@/components/social_login/kakaoLogin.vue';
import NaverLogin from '@/components/social_login/naverLogin.vue';
import MyPage from '@/views/luxon/user/myPage.vue';
import MyOrder from '@/components/mypage/myOrder.vue';
import MyLike from '@/components/mypage/myLike.vue';

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
        path: '/list',
        name: 'MyList',
        component: MyList,
      },
      {
        path: '/login',
        name: 'login',
        component: MyLogin,
      },
      {
        path: '/logout',
        name: 'logout',
        component: MyLogout,
      },
      {
        path: '/login/kakao',
        name: 'kakaoLogin',
        component: KaKaoLogin,
      },
      {
        path: '/login/naver',
        name: 'naverLogin',
        component: NaverLogin,
      },
      {
        path: '/signup',
        name: 'signup',
        component: MySignup,
      },
      {
        path: '/mypage',
        name: 'mypage',
        component: MyPage,
        children: [
          {
            path:'order',
            name:'order',
            component: MyOrder
          },
          {
            path:'like',
            name:'like',
            component: MyLike
          },
        ]
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

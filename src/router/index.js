import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '@/views/luxon/HomeView.vue';
import Index from '@/layouts/luxon/index.vue';
import MyMain from '@/views/luxon/myMain.vue';
import MyList from '@/views/luxon/myList.vue';
import MyProduct from '@/views/luxon/product/myProduct.vue';
import MyAdmin from '@/layouts/admin/adminIndex.vue';
import DashBoard from '@/views/admin/dashBoard.vue';
import Analytics from '@/views/admin/analytics.vue';
import GridSystem from '@/views/admin/gridSystem.vue';
import Registration from '@/views/admin/registration.vue';
import RegiCoupon from '@/views/admin/regiCoupon.vue';
import GetCoupon from '@/views/admin/getCoupon.vue';
import MyLogin from '@/views/luxon/auth/myLogin.vue';
import MyLogout from '@/views/luxon/auth/myLogout.vue';
import MySignup from '@/views/luxon/auth/mySignup.vue';
import KaKaoLogin from '@/components/social_login/kakaoLogin.vue';
import NaverLogin from '@/components/social_login/naverLogin.vue';
import MyPage from '@/views/luxon/user/myPage.vue';
import MyOrder from '@/components/mypage/myOrder.vue';
import MyLike from '@/components/mypage/myLike.vue';
import MySystem from '@/layouts/system/systemIndex.vue';
import SystemView from '@/views/system/systemView.vue';
import GetProductChance from '@/views/admin/getProductChance.vue';
import GetProduct from '@/views/admin/getProduct.vue';
import UpdateProduct from '@/views/admin/updateProduct.vue';
import Test from '@/views/admin/test.vue';
import SysPromotion from '@/views/luxon/promotion/promotion.vue';
import SysNotification from '@/views/system/sysnotification.vue';
import SysRecommend from '@/views/system/sysrecommend.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
    children: [
      {
        path: '/promotion',
        name: 'SysPromotion',
        component: SysPromotion,
      },
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
        path: '/product/myProduct',
        name: 'MyProduct',
        component: MyProduct,
      },
      {
        path: '/product/order',
        name: 'initOrder',
        component: () => import('@/views/luxon/product/initOrder.vue'),
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
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/luxon/user/myCart.vue'),
      },
      {
        path: '/mypage',
        name: 'mypage',
        component: MyPage,
        children: [
          {
            path: 'order',
            name: 'order',
            component: MyOrder,
          },
          {
            path: 'like',
            name: 'like',
            component: MyLike,
          },
        ],
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
      {
        path: '/admin/analytics',
        name: 'Analytics',
        component: Analytics,
      },
      {
        path: '/admin/registration',
        name: 'Registration',
        component: Registration,
      },
      {
        path: '/admin/gridSystem',
        name: 'gridSystem',
        component: GridSystem,
      },
      {
        path: '/admin/regiCoupon',
        name: 'RegiCoupon',
        component: RegiCoupon,
      },
      {
        path: '/admin/getCoupon',
        name: 'GetCoupon',
        component: GetCoupon,
      },
      {
        path: '/admin/getProductChance',
        name: 'GetProductChance',
        component: GetProductChance,
      },
      {
        path: '/admin/getProduct',
        name: 'GetProduct',
        component: GetProduct,
      },
      {
        path: '/admin/updateProduct',
        name: 'UpdateProduct',
        component: UpdateProduct,
      },
      {
        path: '/admin/test',
        name: 'Test',
        component: Test,
      },
    ],
  },
  {
    path: '/system',
    component: MySystem,
    children: [
      {
        path: '/system/systemView',
        name: 'SystemView',
        component: SystemView,
      },
      {
        path: '/system/syspromotion',
        name: 'syspromotion',
        component: SysPromotion,
      },
      {
        path: '/system/sysnotification',
        name: 'notification',
        component: SysNotification,
      },
      {
        path: '/system/sysrecommend',
        name: 'recommend',
        component: SysRecommend,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;

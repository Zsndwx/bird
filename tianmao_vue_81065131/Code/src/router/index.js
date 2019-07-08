import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('pages/home'),
      children: [
        {
          path: 'product/:id',
          name: 'home-Product',
          component: () => import('pages/product')
        }
      ]
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('pages/category')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('pages/cart')
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('pages/personal')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('pages/search')
    }
  ]
});

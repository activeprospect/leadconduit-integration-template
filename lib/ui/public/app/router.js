import {createRouter, createWebHashHistory} from 'vue-router';
import Auth from './auth/Auth.vue';
import Page1 from './config/Page1.vue';
import Page2 from './config/Page2.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/!auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      alias: '/1',
      name: 'Page1',
      component: Page1
    },
    {
      path: '/2',
      name: 'Page2',
      component: Page2
    }
  ]
});

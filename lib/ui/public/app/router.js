import Vue from 'vue';
import Router from 'vue-router';
import Config from './config/Config.vue';
import Page1 from './config/Page1.vue';
import Page2 from './config/Page2.vue';
import Auth from './auth/Auth.vue';

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/!auth',
      name: 'Auth',
      component: Auth,
    },
    {
      path: '/',
      name: 'Default',
      component: Config,
      children: [
        {
          path: '',
          alias: '1',
          name: 'Page1',
          component: Page1,
        },
        {
          path: '2',
          name: 'Page2',
          component: Page2,
        }
      ],
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
import Config from './config/Config.vue';
import Page1 from './config/Page1.vue';
import Page2 from './config/Page2.vue';

Vue.use(Router);

/*
    {
      path: '/!auth',
      name: 'Auth',
      component: Auth,
    },
 */

export default new Router({
  routes: [
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

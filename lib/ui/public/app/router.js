import Vue from 'vue';
import Router from 'vue-router';
import Config from './config/Config.vue';
import PageOne from './config/PageOne.vue';
import PageTwo from './config/PageTwo.vue';

Vue.use(Router);

/*
If authentication is needed this file should be moved up a directory
and an auth route needs to be added:
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
          name: 'PageOne',
          component: PageOne,
        },
        {
          path: '2',
          name: 'PageTwo',
          component: PageTwo,
        }
      ],
    },
  ],
});

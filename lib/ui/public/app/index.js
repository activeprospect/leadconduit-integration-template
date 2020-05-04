import ui from 'leadconduit-integration-ui';
import Vue from 'vue';
import Config from './config/Config.vue';
import { sync } from 'vuex-router-sync';
import Vuex from 'vuex';
import initStore from './store';
import router from './router';

Vue.use(Vuex);

function init(config) {
  const store = initStore(config, ui);

  // init store
  sync(store, router);

  new Vue({
    render: h => h(Config),
    store,
    router
  }).$mount('#app');
}

ui.init(init);

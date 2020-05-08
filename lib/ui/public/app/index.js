import ui from 'leadconduit-integration-ui';
import Vue from 'vue';
import Main from './Main.vue';
import Vuex from 'vuex';
import initStore from './store';
import router from './router';

Vue.use(Vuex);

function init(config) {
  const store = initStore(config, ui);

  new Vue({
    render: h => h(Main),
    store,
    router
  }).$mount('#app');
}

ui.init(init);

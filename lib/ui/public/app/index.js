import ui from 'leadconduit-integration-ui';
import { createApp } from 'vue';
import Main from './Main.vue';
import initStore from './store';
import router from './router';

function init (config) {
  const app = createApp(Main);

  app.use(initStore(config, ui));
  app.use(router);

  app.mount('#app');
}

ui.init(init);

import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

import {
  reasonMap
} from './helpers';

const initStore = (config, ui) => new Vuex.Store({
  state: {
    apiKey: undefined,
    simpleResult: undefined,
    options: {
      first: false,
      second: false
    }
  },
  mutations: {
    setSimpleResult(state, result) {
      Vue.set(state, 'simpleResult', result);
    },
    toggleOptions(state, option) {
      Vue.set(state.options, option, !state.options[option]);
    }
  },
  actions: {
    simpleQuery(context) {
      const apiKey = context.state.apiKey;

      axios
        .get('simplequery?api_key=' + apiKey)
        .then((response) => {
          context.commit('setSimpleResult', response.status + '/' + response.data.outcome);
        })
    },
    cancel(context) {
      context.state.ui.cancel();
    },
    finish(context) {
      const flow = {
        fields: [],
        steps: [{
          type: 'recipient',
          entity: {
            name: config.entity.name,
            id: config.entity.id
          },
          integration: {
            module_id: config.integration || 'leadconduit-service_being_integrated.outbound.handle',
            mappings: []
          }
        }]
      }

      const options = context.state.options;
      Object.keys(options).forEach(key => {
        if(options[key]) {

          flow.steps.push({
            type: 'filter',
            reason: reasonMap[key],
            outcome: 'failure',
            rule_set: {
              op: 'and',
              rules: [{
                lhv: 'service_being_integrated.handle.' + key,
                op: 'is true'
              }],
            },
            description: 'Catch ' + key + ' leads',
            enabled: true
          });
        }
      });

    }
  }

});

export default initStore;

import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import ObjectID from 'bson-objectid';

import {
  reasonMap
} from './helpers';

const initStore = (config, ui) => new Vuex.Store({
  state: {
    ui: ui,
    selectedService: "service_1_plus",
    simpleResult: undefined,
    options: {
      first: false,
      second: false
    }
  },
  mutations: {
    setSimpleResult (state, result) {
      Vue.set(state, 'simpleResult', result);
    },
    toggleOptions (state, option) {
      Vue.set(state.options, option, !state.options[option]);
    }
  },
  getters: {
    getCredential: () => {
      return config.credential;
    }
  },
  actions: {
    saveCredential(context, credential) {
      if (!credential.id) credential.id = new ObjectID().toHexString();
      context.state.ui.create({ credential });
    },
    simpleQuery (context) {
      const selectedService = context.state.selectedService;

      axios
        .get('simplequery?service=' + selectedService)
        .then((response) => {
          context.commit('setSimpleResult', response.status + '/' + response.data.outcome);
        });
    },
    cancel (context) {
      context.state.ui.cancel();
    },
    finish (context) {
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
            mappings: [{
              property: 'credential_id',
              value: (config.credential) ? config.credential.id : undefined
            }]
          }
        }]
      };

      const options = context.state.options;
      Object.keys(options).forEach(key => {
        if (options[key]) {
          flow.steps.push({
            type: 'filter',
            reason: reasonMap[key],
            outcome: 'failure',
            rule_set: {
              op: 'and',
              rules: [{
                lhv: 'service_being_integrated.handle.' + key,
                op: 'is true'
              }]
            },
            description: 'Catch ' + key + ' leads',
            enabled: true
          });
        }
      });
      context.state.ui.create({ flow });
    }
  }

});

export default initStore;

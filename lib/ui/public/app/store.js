import { toRaw } from "vue";
import { createStore } from 'vuex';
import axios from 'axios';
import ObjectID from 'bson-objectid';

const initStore = (config, ui) => createStore({
  state: {
    config,
    ui: ui,
    selectedService: 'service_1_plus',
    simpleResult: undefined,
    failureAction: 'stop'
  },
  getters: {
    getCredential: () => {
      return config.credential;
    },
    getFailureAction: (state) => {
      return state.failureAction;
    }
  },
  mutations: {
    setFailureAction(state, failureAction) {
      state.failureAction = failureAction;
    }
  },
  actions: {
    saveCredential (context, credential) {
      if (!credential.id) credential.id = new ObjectID().toHexString();
      context.state.ui.create({ credential: toRaw(credential) });
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

      if(context.state.failureAction === 'stop') {
        flow.steps.push({
          type: 'filter',
          reason: '{{service_being_integrated.reason}}',
          outcome: 'failure',
          rule_set: {
            op: 'or',
            rules: [{
              lhv: 'service_being_integrated.outcome',
              op: 'is equal to',
              rhv: 'failure'
            }]
          },
          description: 'Stop on failure',
          enabled: true
        });
      }
      context.state.ui.create({ flow: toRaw(flow) });
    }
  }

});

export default initStore;

<template>
  <div>
    <header>
      Example Authentication
    </header>
    <section>
      <p>Enter your API Key here
      <form>
        <ul>
          <li>
            <label>API Key</label>
            <input type="text" v-model="credential.token">
          </li>
        </ul>
      </form>
    </section>
    <Navigation :onNext="next" :disableNext="!credential.token"/>
  </div>
</template>

<script>
import { Navigation } from '@activeprospect/integration-components';
export default {
  components: { Navigation },
  data () {
    return {
      credential: this.$store.getters.getCredential || {
        token: '',
        package: 'leadconduit-service_being_integrated',
        type: 'token'
      }
    };
  },
  methods: {
    next () {
      this.$store.dispatch('saveCredential', this.credential);
    }
  }
};
</script>

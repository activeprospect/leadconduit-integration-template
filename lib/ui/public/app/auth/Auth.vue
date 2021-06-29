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
    <footer>
      <button v-on:click="$store.dispatch('cancel')">Cancel</button>
      <button v-on:click="next" :disabled="!credential.token" class="primary">Continue</button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credential: this.$store.getters.getCredential || {
        token: '',
        package: 'leadconduit-service_being_integrated',
        type: 'token'
      }
    };
  },
  methods: {
    next() {
      this.$store.dispatch('saveCredential', this.credential);
    },
  },
};
</script>

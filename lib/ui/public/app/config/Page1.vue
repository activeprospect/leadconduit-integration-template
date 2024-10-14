<template>
  <div>
    <header>
      Set up Service_Being_Integrated
    </header>
    <section>
      <h5>Enter a made-up URL:</h5>
      <input
          v-model="url"
          type="text"
      >
    </section>
    <Navigation :on-confirm="confirm" :disable-confirm="!url"/>
  </div>
</template>
<script>
import { Navigation } from '@activeprospect/integration-components';
export default {
  data () {
    return {
      url: ''
    };
  },
  methods: {
    confirm () {
      this.$router.push('/2');
    }
  },
  components: { Navigation }
};
</script>

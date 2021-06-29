<template>
  <div>
    <form>
      <!-- todo: think of a better example; this would be auth -->
      <h5>Enter a made-up URL:</h5>
      <input
          v-model="url"
          type="text"
      >
    </form>
    <Navigation :onNext="next" :disableNext="!url"/>
  </div>
</template>
<script>
  import { Navigation } from '@activeprospect/integration-components';
  export default {
    data() {
      return {
        url: '',
      };
    },
    methods: {
      next() {
        this.$router.push('/2');
      }
    },
    components: { Navigation }
  }
</script>

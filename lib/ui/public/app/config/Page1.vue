<template>
  <div>
    <Navigation
      title="Set up Service_Being_Integrated"
      :disabled="!apiKey"
      >
      <form>
        <!-- todo: think of a better example; this would be auth -->
        <h5>Enter a made-up API key:</h5>
        <input
            v-model="apiKey"
            type="text"
        >
      </form>
    </Navigation>
  </div>
</template>
<script>
  import Navigation from "./components/Navigation.vue";
  export default {
    data() {
      return {
        apiKey: '',
      };
    },
    components: {Navigation}
  }
</script>

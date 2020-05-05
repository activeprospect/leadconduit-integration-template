<template>
  <div>
    <Navigation
      :disabled="apiKey"
      >
      <form>
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
  import Navigation from "./components/Navigation";
  export default {
    data() {
      return {
        apiKey: '',
      };
    },
    components: {Navigation}
  }
</script>
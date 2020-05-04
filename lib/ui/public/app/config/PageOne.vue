<template>
  <div>
    <Navigation
      :show-next="listId"
      >
      <form>
        <h5>Enter a made-up List ID:</h5>
        <input
            v-model="listId"
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
        listId: '',
      };
    },
    components: {Navigation}
  }
</script>
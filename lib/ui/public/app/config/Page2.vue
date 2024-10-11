<template>
  <div>
    <header>
      Set up Service_Being_Integrated
    </header>
    <section>
      <form>
        <p>When the response is a Failure:</p>
        <ul>
          <li>
            <label><input type="radio" v-model="failureAction" value="stop">Stop the lead flow and mark the lead a Failure
              (Recommended)</label>
          </li>
          <li>
            <label><input type="radio" v-model="failureAction" value="continue">Continue the lead flow</label>
          </li>
        </ul>
      </form>
    </section>
    <Navigation :on-confirm="finish"/>
  </div>
</template>
<script>
import { Navigation } from '@activeprospect/integration-components';
export default {
  data () {
    return {
      failureAction: this.$store.getters.getFailureAction
    };
  },
  methods: {
    finish () {
      this.$store.commit('setFailureAction', this.failureAction);
      this.$store.dispatch('finish');
    }
  },
  components: { Navigation }
};
</script>

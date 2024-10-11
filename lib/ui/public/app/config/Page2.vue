<template>
  <div>
    <header>
      Set up Service_Being_Integrated
    </header>
    <section>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Result of API call to S3: {{ simpleResult }}</p>

      <form>
        <p>When Service_Being_Integrated returns one of the following, stop processing the lead and mark the lead a Failure:</p>
        <ul>
          <li>
            <label><input type="checkbox" v-model="options.first"> First Problem - Something bad</label>
          </li>
          <li>
            <label><input type="checkbox" v-model="options.second"> Second Problem - Something else bad</label>
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
      simpleResult: '',
      options: {
        first: false,
        second: true
      }
    };
  },
  methods: {
    finish () {
      this.$store.dispatch('finish');
    }
  },
  components: { Navigation }
};
</script>

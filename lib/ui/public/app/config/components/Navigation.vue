<template>
  <div>
    <header>
      {{title}}
    </header>
    <section>
      <slot></slot>
    </section>
    <footer>
      <button @click="cancel" class="tertiary-control">Cancel</button>
      <button v-if="showPrev" @click="prev" class="tertiary-control">Prev</button>
      <slot name="footer"></slot>
      <button v-if="showNext" @click="next" class="primary" :disabled="disabled">Next</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    showNext: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: this.$router.currentRoute.path,
      showPrev: true,
    };
  },
  computed: {
    pageNo() {
      if (this.page === '/') return 1;
      return parseInt(this.page.slice(1), 10);
    },
  },
  methods: {
    cancel() {
      this.$store.dispatch('cancel');
    },
    prev() {
      this.$router.push(`/${this.pageNo - 1}`);
    },
    next() {
      this.$router.push(`/${this.pageNo + 1}`);
    },
  },
  mounted() {
    if (this.pageNo === 1) {
      this.showPrev = false;
    }
  },
};
</script>

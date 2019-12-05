<template>
  <section
    class="dankal-html"
    v-html="html"
  />
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    html: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .dankal-html{
    padding: .2rem;
    overflow-y: auto;
  }
  /deep/ img {
    max-width: 100%;
  }
</style>

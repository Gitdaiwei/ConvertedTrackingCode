<template>
  <section class="dankal-slider-group">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'DankalSliderGroup',

  data() {
    return {};
  },

  methods: {
    onSliderRstore() {
      // eslint-disable-next-line
      this.$children.forEach(element => {
        element.handlerRestone(element);
      });
    },
  },
};
</script>

<style lang="scss" >
</style>

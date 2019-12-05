<template>
  <section class="dankal-star-bar">
    <div
      v-for="(item, i) in quantity"
      :key="item"
      :class="{active: i < index}"
      @click="update(item)"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
    };
  },

  props: {
    value: {
      type: Number,
      require: true,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 5,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.index = this.value;
  },

  methods: {
    update(index) {
      if (this.readOnly) return;

      this.index = index;
      this.$emit('input', this.index);
    },
  },
};
</script>

<style lang="scss" >
.dankal-star-bar {
  display: inline-flex;

  div {
    width: 0.2rem;
    height: 0.2rem;
    background-image: url("~assets/images/ic_evaluate_unselected.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: all 0.3s;
  }

  .active {
    background-image: url("~assets/images/ic_evaluate_selected.png");
  }

  div + div {
    margin-left: 0.04rem;
  }
}
</style>

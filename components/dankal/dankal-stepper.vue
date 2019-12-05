<template>
  <section class="dankal-stepper">
    <div
      @click="miuns"
      class="miuns"
    >
      <img
        v-if="!$slots.prev"
        src="@/assets/images/button_less.png"
      >
      <slot name="prev" />
    </div>
    <input
      disabled
      v-model="value"
    >
    <div
      @click="plus"
      class="plus"
    >
      <img
        v-if="!$slots.next"
        src="@/assets/images/button_add.png"
      >
      <slot name="next" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      number: 1,
    };
  },

  props: {
    value: {
      type: Number,
      default: 1,
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 99,
    },
  },

  watch: {
    max(val, oldVal) {
      if (this.value > val) {
        this.$emit('input', val)
      }
    },
  },
  methods: {
    plus() {
      if (this.max && this.value >= this.max) return;
      this.$emit('input', this.value + 1)
    },

    miuns() {
      if (this.value <= this.min) return;
      this.$emit('input', this.value - 1)
    },
  },
};
</script>

<style lang="scss" >
  .dankal-stepper {
    display: flex;
    align-items: center;
    border: 1px solid #999;
    .miuns {
      border-right: 1px solid #999;
    }
    .plus {
      border-left: 1px solid #999;
    }
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
    input {
      width: 0.65rem;
      height: 100%;
      text-align: center;
      color: #333;
      background: #fff;
    }
  }
</style>

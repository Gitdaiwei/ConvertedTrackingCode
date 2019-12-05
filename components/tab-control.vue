<template>
  <div class="tab-control">
    <div
      class="li"
      v-for="(item,index) in options"
      :key="index"
      @click="getIndex(index)"
      :class="{'on':index == value}">
      {{ item }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getIndex(index) {
      this.$emit('input', index)
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        example: async () => {
          console.log('network');
        },
      };
    },
    handler() {
      return {
        example: () => {
          console.log('handle');
        },
      };
    },
  },
};
</script>
<style lang="scss" scoped>
  .tab-control {
    line-height: 1.26rem;
    background: #FFFFFF;
    font-size: 0.38rem;
    color: #999;
    white-space:nowrap;
    overflow-x: auto;
    text-align: center;

    .li {
      display: inline-block;
      vertical-align: middle;
      padding: 0 0.25rem;

      &.on {
        color: #000;
        font-weight: 500;
        /*background: #FFFFFF url("~assets/images/current/ic_classification_choose.png") 0 0.55rem*/
        /*no-repeat;*/
        background-size: 1.22rem 0.34rem;
      }
    }
  }
</style>

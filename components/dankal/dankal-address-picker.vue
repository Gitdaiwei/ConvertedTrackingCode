<template>
  <section @click="showAddressPicker">
    <slot />
  </section>
</template>

<script>
/* eslint-disable no-unused-vars,no-param-reassign,arrow-parens */
import Axios from 'axios';
import Vue from 'vue';

export default {
  name: 'AddressPicker',
  transitions: 'touchPoint',

  data() {
    return {
      addressPicker: '',
    };
  },

  props: {
    values: {
      type: Array,
      default: () => [],
    },
  },

  async mounted() {
    // 这个数据源与官方数据源有差异,快速滑动时会内部错误，避免nuxtjs框架自动跳转到错误页，需要复写全局处理器
    Vue.config.errorHandler = (err, vm, info) => {};

    const { data } = await Axios.get('https://cdn.dankal.cn/area.json');

    data.forEach(province => {
      province.children.forEach(city => {
        if (Array.isArray(city.children)) {
          city.children.forEach(area => {
            // eslint-disable-next-line no-param-reassign
            delete area.children;
          });
        }
      });
    });

    this.addressPicker = this.$createCascadePicker({
      title: '',
      data,
      onSelect: this.selectHandle,
    });
  },

  methods: {
    showAddressPicker() {
      this.addressPicker.show();
    },

    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$emit('input', selectedText);
    },
  },
};
</script>

<style scoped>
</style>

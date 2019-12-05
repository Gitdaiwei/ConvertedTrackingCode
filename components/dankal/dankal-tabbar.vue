<template>
  <div
    class="dankal-tabbar"
    :style="{backgroundColor,color}">
    <nuxt-link
      :to="item.router"
      class="tabbar-item"
      v-for="(item, i) in options"
      :key="i">
      <img
        v-if="item.iconPath"
        :src="$route.path == item.router ? item.iconPath : item.selectedIconPath"
        alt="">
      <span :style="{color: $route.path == item.router ? selectColor : color }">
        {{ item.text }}
      </span>
    </nuxt-link>
  </div>
</template>


<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: '#000000',
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    selectColor: {
      type: String,
      default: '#ffffff',
    },
  },
};
</script>

<style lang="scss" scoped>
  .dankal-tabbar {
    position: fixed;
    bottom: 0;
    z-index: 9;
    box-shadow: 0px -1px 10px rgba(0,0,0,0.2);
    width: 100%;
    height: 0.98rem;
    display: flex;

    .tabbar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      span{
        font-size: .2rem;
        line-height: .3rem;
      }
      img {
        width: 0.42rem;
        height: 0.42rem;
        margin-bottom: 0.02rem;
      }
    }
  }
</style>

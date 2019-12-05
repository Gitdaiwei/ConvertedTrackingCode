<template>
  <!-- 如果nuxt标签存在父标签，切记给父标签设置属性 height:100% -->
  <section class="screen">
    <nuxt/>
    <p
      v-if="isShowHolder"
      @test="updateHolder">没有数据喔～</p>
  </section>
</template>
<script>
/* eslint-disable no-undef,prefer-rest-params,no-param-reassign,prefer-destructuring */

let loading = ''
export default {
  created() {
    this.initGlobalCubeUi()
    window.vm.$on('test', (isShowHolder) => {
      this.isShowHolder = !this.isShowHolder
    })

    // const _mtac = {};
    // (function () {
    const mta = document.createElement('script');
    mta.src = '//pingjs.qq.com/h5/stats.js?v2.0.4';
    mta.setAttribute('name', 'MTAH5');
    mta.setAttribute('sid', '500678395');
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(mta, s);
    // }());
  },
  data() {
    return {
      isShowHolder: false,
    }
  },
  methods: {
    /**
       * 注入cube-ui常用组件到全局window对象
       */
    initGlobalCubeUi() {
      // type可选择:correct,error,warn,loading,txt
      window.toast = (msg, type = 'error') => {
        this.$createToast({
          txt: msg,
          type,
          time: 2000,
        }).show();
      };
      window.showLoading = () => {
        loading = this.$createToast({
          txt: 'Loading...',
          mask: true,
          time: 0,
        })
        loading.show()
      }
      window.hideLoading = () => {
        if (loading) {
          loading.hide()
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  // 如果nuxt标签存在父标签，切记给父标签设置属性 height:100%
  .screen{
    height: 100%;
    p{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      color: #fff;
    }
  }
</style>

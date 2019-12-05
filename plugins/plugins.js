/* eslint-disable import/no-extraneous-dependencies,no-new */
import '../jslibs/rem';
import Vue from 'vue';
import Cube from 'cube-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboard from 'vue-clipboard2';
import preview from 'vue-photo-preview'
import InfiniteLoading from 'vue-infinite-loading';
import VConsole from 'vconsole'
import Bitmap from './bitmap';
import WxJsSdk from '@/jslibs/wx-js-sdk'
// require styles
import 'swiper/dist/css/swiper.css'
import 'vue-photo-preview/dist/skin.css'

require('cube-ui/lib/cube.min.css');
require('vue2-animate/dist/vue2-animate.min.css')
require('~/filiters/vue-filiter');

// new VConsole() // 调试台
Vue.use(Cube);
Vue.use(Bitmap);
Vue.use(preview) // 图片预览插件
Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard)
Vue.use(WxJsSdk)
Vue.use(InfiniteLoading, { // 下拉加载更多插件
  props: {
    spinner: 'bubbles',
  },
  slots: {
    noMore: '没有更多数据了~', // you can pass a string value
    noResults: '没有更多数据了~',
  },
}) // 下拉加载更多插件

window.vm = new Vue()

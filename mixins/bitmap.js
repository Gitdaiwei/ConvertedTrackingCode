import image from '@/assets/images/ic_order_successful.png';

export default {
  data() {
    return {
      bitmap: null,
      icon: image,
      tips: '暂无数据',
      position: {},
    };
  },

  mounted() {
    const { icon, tips, position } = this;

    this.bitmap = this.$bitmap({
      icon,
      tips,
      position,
    });
  },

  destroyed() {
    // eslint-disable-next-line
    this.bitmap && this.bitmap.destory();
  },
};

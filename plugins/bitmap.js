import DankalBitmap from '../components/dankal/dankal-bitmap';

import { setProps } from './utils';

export default {
  // eslint-disable-next-line
  install(Vue, pluginOptions = {}) {
    const Instance = Vue.extend(DankalBitmap);

    function $bitmap(options) {
      const bitmap = new Instance();

      setProps(bitmap, options);

      bitmap.$mount();

      document.querySelector('body').appendChild(bitmap.$el);

      bitmap.initial();

      return bitmap;
    }

    // eslint-disable-next-line
    Vue.bitmap = Vue.prototype.$bitmap = $bitmap;
  },
};

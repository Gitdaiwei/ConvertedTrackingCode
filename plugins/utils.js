// eslint-disable-next-line
export const setProps = ($vm, options) => {
  const defaults = {};
  // eslint-disable-next-line
  Object.keys($vm.$options.props).forEach(item => {
    defaults[item] = $vm.$options.props[item].item;
  });

  // eslint-disable-next-line
  const _options = Object.assign({}, defaults, options);

  // eslint-disable-next-line
  for (let i in _options) {
    // eslint-disable-next-line
    $vm.$props[i] = _options[i];
  }
};

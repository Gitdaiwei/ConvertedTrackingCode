const Select = {
  single(target, index) {
    if (!(target instanceof Array)) {
      throw new Error('the parameter is not array !!!');
    }

    return target.map((item, i) => {
      if (i !== index) return Object.assign({}, item, { status: false });
      return Object.assign({}, item, {
        status: true,
      });
    });
  },

  all(target, status) {
    if (!(target instanceof Array)) {
      throw new Error('the parameter is not array !!!');
    }

    return target.map(
      item =>
        // eslint-disable-next-line
        Object.assign({}, item, {
          status,
        }),
      // eslint-disable-next-line
    );
  },

  multiple(target, index) {
    if (!(target instanceof Array)) {
      throw new Error('the parameter is not array !!!');
    }

    return target.map((item, i) => {
      if (i !== index) return item;
      return Object.assign({}, item, {
        status: !item.status,
      });
    });
  },
};

export default Select;

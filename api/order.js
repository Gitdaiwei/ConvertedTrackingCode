/* eslint-disable import/prefer-default-export */
/**
 * 订单模块
 */
import dkAxios from '@/jslibs/dk-axios';

// ===========================================普通订单模块

/**
 * 提交普通订单
 * @param data
 */
export const addOrder = data =>
  dkAxios({
    url: 'Order/single',
    method: 'POST',
    data,
  });

/**
 * 支付普通订单
 * @param data
 */
export const payOrder = data =>
  dkAxios({
    url: 'Order/pay',
    method: 'POST',
    data,
  });

/**
 * 订单列表
 */
export const orderList = params =>
  dkAxios({
    url: 'Order',
    method: 'GET',
    params,
  });
/**
 * 订单详情
 */
export const orderDetail = (uuid, params) =>
  dkAxios({
    url: `Order/${uuid}`,
    params,
  });

/**
 * 删除订单
 */
export const delOrder = (uuid) =>
  dkAxios({
    url: `Order/${uuid}`,
    method: 'PUT',
  });

/**
 * 确认收货
 */
export const confirmOrder = params =>
  dkAxios({
    url: 'Order/confirm',
    method: 'POST',
    params,
  });

/**
 * 售后订单
 * @param data
 */
export const afterList = data =>
  dkAxios({
    url: 'OrderAfter',
    method: 'GET',
    data,
  });

/**
 * 售后详情
 * @param data
 */
export const afterDetail = uuid =>
  dkAxios({
    url: `OrderAfter/${uuid}`,
    method: 'GET',
  });


/**
 * 删除售后订单
 * @param data
 */
export const delAfterList = uuid =>
  dkAxios({
    url: `OrderAfter/${uuid}`,
    method: 'DELETE',
  });

/**
 * 取消售后订单
 * @param data
 */
export const cancelAfterList = data =>
  dkAxios({
    url: 'OrderAfter/cancel',
    method: 'POST',
    data,
  });

/**
 * 申请售后订单
 * @param data
 */
export const addAfterList = data =>
  dkAxios({
    url: 'OrderAfter',
    method: 'POST',
    data,
  });

// ===========================================砍价订单模块
/**
 * 提交砍价订单
 * @param data
 */
export const addBargainOrder = data =>
  dkAxios({
    url: 'Bargain/single',
    method: 'POST',
    data,
  });

/**
 * 支付砍价订单
 * @param data
 */
export const payBargainOrder = data =>
  dkAxios({
    url: 'Bargain/pay',
    method: 'POST',
    data,
  });

/**
 * 支付砍价差价
 * @param data
 */
export const paySurplus = data =>
  dkAxios({
    url: 'Bargain/paySurplus',
    method: 'POST',
    data,
  });


/**
 * 砍价订单列表
 */
export const bargainOrderList = params =>
  dkAxios({
    url: 'Bargain',
    method: 'GET',
    params,
  });

/**
 * 帮砍详情|砍价详情
 * @param data
 */
export const getBargainUserDetail = (uuid, params) =>
  dkAxios({
    url: `BargainUser/${uuid}`,
    method: 'GET',
    params,
  });

/**
 * 重新砍价
 */
export const restartBargain = data =>
  dkAxios({
    url: 'Bargain/restart',
    method: 'POST',
    data,
  });

/**
 * 取消砍价单
 */
export const cancelBargain = data =>
  dkAxios({
    url: 'Bargain/cancel',
    method: 'POST',
    data,
  });

/**
 * 查订单状态
 */
export const spreadBargain = data =>
  dkAxios({
    url: 'Bargain/getlast',
    method: 'POST',
    data,
  });

/**
 * 定时器
 */
export const timerBargain = data =>
  dkAxios({
    url: 'Timer/bargain',
    method: 'POST',
    data,
  });

/**
 * 砍单取消
 */
export const abolishBargain = data =>
  dkAxios({
    url: 'Timer/cancelBargain',
    method: 'POST',
    data,
  });

// ===========================================帮砍订单模块
/**
 * 帮砍列表
 * @param data
 */
export const getBargainUser = data =>
  dkAxios({
    url: 'BargainUser',
    method: 'GET',
    data,
  });

/**
 * 删除帮砍
 * @param data
 */
export const delBargainUser = uuid =>
  dkAxios({
    url: `BargainUser/${uuid}`,
    method: 'DELETE',
  });


/**
 * 好友帮砍详情
 * @param data
 */
export const getBargainFirendDetail = uuid =>
  dkAxios({
    url: `Bargain/${uuid}`,
    method: 'GET',
  });

/**
 * 好友帮砍
 * @param data
 */
export const helpBargain = data =>
  dkAxios({
    url: 'BargainUser/help',
    method: 'POST',
    data,
  });

  /**
 * 添加物流
 */
export const addTheLogistics = data =>
  dkAxios({
    url: 'Order/fulfillrite',
    method: 'POST',
    data,
  });

  /**
 * 推送消息
 */
export const sendMessage = data =>
  dkAxios({
    url: 'Timer/zhifusms',
    method: 'POST',
    data,
  });

/**
 * 我们的承诺
 */
export const getOurPromise = data =>
  dkAxios({
    url: 'Home/getOurPromise',
    method: 'POST',
    data,
  });

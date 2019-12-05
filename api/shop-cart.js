/**
 * 购物车模块
 */
import dkAxios from '@/jslibs/dk-axios';


/**
 * 购物车列表
 */
export const getCartList = () =>
  dkAxios({
    url: 'cart',
  });
/**
 * 添加商品到购物车
 * @param data
 */
export const createCommodityToCart = data =>
  dkAxios({
    url: 'cart',
    method: 'POST',
    data,
  });

/**
 * 从购物车删除商品
 * @param uuid
 */
export const deleteCommodityFromCart = uuid =>
  dkAxios({
    url: `cart/${uuid}`,
    method: 'DELETE',
  });
/**
 * 批量删除商品
 * @param data
 */
export const multipleDelete = data =>
  dkAxios({
    url: 'cart/deleteList',
    method: 'POST',
    data,
  });
/**
 * 更新购物车商品信息
 * @param uuid
 * @param data
 */
export const updateCommodityToCart = (uuid, data) =>
  dkAxios({
    url: `cart/${uuid}`,
    method: 'PUT',
    data,
  });

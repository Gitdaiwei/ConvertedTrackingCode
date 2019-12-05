/**
 * 地址管理接口
 */
import dkAxios from '@/jslibs/dk-axios';

/**
 * 获取地址列表
 */
export const getAddressList = () =>
  dkAxios({
    url: 'Address',
  });

/**
 * 地址详情
 * @param uuid
 */
export const addressDetail = uuid =>
  dkAxios({
    url: `Address/${uuid}`,
  });

/**
 * 新增地址
 * @param data
 */
export const createAddress = data =>
  dkAxios({
    url: 'Address',
    method: 'POST',
    data,
  });

/**
 * 更新地址
 * @param uuid
 * @param data
 */
export const updateAddress = (uuid, data) =>
  dkAxios({
    url: `Address/${uuid}`,
    method: 'PUT',
    data,
  });

/**
 * 删除地址
 * @param uuid
 */
export const deleteAddress = uuid =>
  dkAxios({
    url: `Address/${uuid}`,
    method: 'DELETE',
  });


/**
 * 设置默认地址
 * @param data
 */
export const setDefaultAddress = data =>
  dkAxios({
    url: 'Address/setDefault',
    method: 'POST',
    data,
  });

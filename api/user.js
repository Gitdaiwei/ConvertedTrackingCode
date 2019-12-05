/**
 * 用户信息相关接口
 */
import dkAxios from '@/jslibs/dk-axios';

export const getUserInfo = data =>
  dkAxios({
    url: 'User',
    method: 'GET',
    data,
  });

export const updateUserInfo = data =>
  dkAxios({
    url: 'User/update',
    method: 'PUT',
    data,
  });


export const getStatistics = data =>
  dkAxios({
    url: 'User/statistics',
    method: 'POST',
    data,
  });

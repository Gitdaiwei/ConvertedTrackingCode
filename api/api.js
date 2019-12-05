/**
 * 首页相关接口
 */
import dkAxios from '@/jslibs/dk-axios';

export const getLogo = data =>
  dkAxios({
    url: `Logo/${data}`,
    method: 'GET',
    data,
  });

export const getHomeBanner = data =>
  dkAxios({
    url: 'Home/getHomeBanner',
    method: 'GET',
    data,
  });

export const getHomeShow = data =>
  dkAxios({
    url: 'Home/getHomeShow',
    method: 'GET',
    data,
  });

export const getProductBanner = data =>
  dkAxios({
    url: 'Home/getProductBanner',
    method: 'POST',
    data,
  });

export const getProductShow = data =>
  dkAxios({
    url: 'Home/getProductShow',
    method: 'GET',
    data,
  });

export const getProductInfo = data =>
  dkAxios({
    url: 'Product/getInfo',
    method: 'GET',
    data,
  });

export const getAboutAs = data =>
  dkAxios({
    url: 'Home/getAboutAs',
    method: 'GET',
    data,
  });

export const getMessage = data =>
  dkAxios({
    url: 'Message',
    method: 'GET',
    data,
  });

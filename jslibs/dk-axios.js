/* eslint-disable no-param-reassign,consistent-return */
/**
 * Created by IvanCai on 2017/4/19.
 */
import axios from 'axios';
import utils from './dk-utils';
import { apiDomain } from '@/configs/enviroment';

const dkAxios = axios.create({
  baseURL: apiDomain,
  timeout: 10000, // 设置超时时间
});
let time = null
dkAxios.interceptors.request.use(
  (config) => {
    // alert(utils.getCookie('X-Access-Token'))
    config.headers = { 'X-Access-Token': utils.getCookie('X-Access-Token') };
    // b4de5451313dd6d9326db81f3ff873ac
    if (!time) {
      time = setTimeout(e => {
        window.showLoading()
      }, 1000)
    }
    return config;
  },
  error => Promise.reject(error),
);

dkAxios.interceptors.response.use(
  response => {
    if (time) {
      clearTimeout(time)
      time = null
    }
    window.hideLoading()
    return response
  },
  (error) => {
    if (time) {
      clearTimeout(time)
      time = null
    }
    window.hideLoading()
    const { status, data } = error.response;
    switch (status) {
      case 401:
        console.log('没有登入401')
        // window.location.href = '/'
        break;
      case 412:
        console.log('没有登入412')
        localStorage.setItem('popUp', true);
        window.location.href = '/'
        break;
      default:
        window.toast(data.error.message, 'error')
        return Promise.reject(data);
    }
  },
);
export default dkAxios;

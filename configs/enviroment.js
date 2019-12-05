/* eslint-disable no-unused-vars */
// 开发环境api域名
const devApiDomain = 'https://api.trubrush.io/v1/app/';
// 测试环境api域名
const stageApiDomain = '';
// 生产环境api域名
const proApiDomain = 'https://api.trubrush.io/v1/app/';
// 七牛云华南区上传域名,华东去掉"-z2",华北改成"z1"
const uploadDomain = 'https://upload-na0.qiniup.com/';
const imgDomain = 'https://cdn-trubrush.dankal.cn/';

module.exports = {
  apiDomain: proApiDomain,
  imgDomain,
  uploadDomain,
};

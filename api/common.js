/* eslint-disable no-unused-vars,import/prefer-default-export */
import env from '~/configs/enviroment'
import dkAxios from '~/jslibs/dk-axios'

/**
 * 图片上传
 * @param data
 */
export const uploadImg = data => dkAxios({
  url: env.uploadDomain,
  headers: {
    'content-type': 'multipart/form-data',
  },
  method: 'POST',
  data,
})
/**
 * 获取uploadToken
 */
export const getUploadToken = () =>
  dkAxios({
    url: 'Qiniu',
  });

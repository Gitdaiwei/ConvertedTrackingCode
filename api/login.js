/*
* 登录、注册模块
* */
import dkAxios from '@/jslibs/dk-axios'

export const oauthLogin = data => dkAxios({
  url: 'User/oauthLogin',
  method: 'POST',
  data,
})

export const login = data => dkAxios({
  url: 'User/login',
  method: 'POST',
  data,
})

export const Ologin = data => dkAxios({
  url: 'User/login',
  method: 'POST',
  data,
})

export const getCode = params => dkAxios({
  url: 'Send',
  params,
})

export const validateCode = data => dkAxios({
  url: 'Send/validateCode',
  method: 'POST',
  data,
})

export const register = data => dkAxios({
  url: 'User/register',
  method: 'POST',
  data,
})

export const resetPassword = data => dkAxios({
  url: 'User/resetPassword',
  method: 'POST',
  data,
})

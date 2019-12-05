/* eslint-disable prefer-destructuring */
/* eslint-disable */
const axios = require('axios')
const { apiDomain } = require('../../configs/enviroment')
const {FINAL_URL ,APP_DOMAIN} = require('../../configs/wx-login')
module.exports = function (req, res, next) {
  if(req.originalUrl.indexOf('_nuxt')!== -1){ //如果是资源文件的请求，直接返回不做处理
    next()
    return
  }
  let token = '',
    url = req.path
  ua = req.headers['user-agent'] //通过ua是否包含MicroMessenger可以判断是不是在微信浏览器环境运行
  try {
    token = req.cookies.token
  } catch (e) {
  }
  const code = req.query.code
  if (!token) { // token为空,需要进行微信登录
    if (!code) { // code也为空,说明还没有进行登录授权重定向
      res.redirect(`${FINAL_URL}&redirect_uri=${encodeURIComponent(APP_DOMAIN+req.originalUrl)}#wechat_redirect`)
    } else { // 已进行登录授权,将获得code与我们服务器交换token
      console.log(code, 'code')
      console.log(req.originalUrl, 'url')
      axios({
        url: `${apiDomain}app/merchant/login_wx_h5`,
        method: 'POST',
        data: {code},
      }).then((response) => {
        const serverRes = response.data
        console.log(serverRes, 'response')
        if (response.status === 200) {
          res.cookie('token', serverRes.access_token, { expires: new Date(Date.now() + 7 * 24 * 3600 * 1000) });
          next()
        }
      }).catch((error) => {
        console.log(error.response, 'error')
        next()
      })
    }
  } else {
    axios.get(`${apiDomain}app/User`,{headers: { 'X-Access-Token': token } }).then(result => {
      console.log('success')
      next()
    }).catch(err=>{
      const status = err.response.status
      console.log(err.response.status,'err')
      if(status===401 || status ===412){
        res.redirect(`${FINAL_URL}&redirect_uri=${encodeURIComponent(APP_DOMAIN+req.originalUrl)}#wechat_redirect`)
      }
    })
  }
}

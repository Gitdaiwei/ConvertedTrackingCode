/* eslint-disable no-param-reassign,no-undef */
export default {
  install(Vue, options) {
    Vue.prototype.$initwxjssdk = function (signData, {
      title, link, imgUrl, desc,
    }) {
      console.log(signData, 'signData')
      console.log('initwxjssdk')
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: signData.appId, // 必填，公众号的唯一标识
        timestamp: signData.timeStamp, // 必填，生成签名的时间戳
        nonceStr: signData.nonceStr, // 必填，生成签名的随机串
        signature: signData.signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'], // 必填，需要使用的JS接口列表
      });
      wx.ready(() => {
        wx.onMenuShareTimeline({
          title, // 分享标题
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: () => {
            alert('分享成功')
          },
        })
        wx.onMenuShareAppMessage({
          title, // 分享标题
          desc, // 分享描述
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: () => {
            alert('分享成功')
          },
        });
      })
      wx.error((res) => {
        console.log(res, 'wx sdk error')
      });
    }
  },
}

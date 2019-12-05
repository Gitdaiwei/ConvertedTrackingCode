/* eslint-disable no-undef,camelcase */
export default {
  /**
   * 微信浏览器支付
   * @param paymentInfo
   * @param orderUUID
   * @param callback
   */
  wechatBrowserPay: (paymentInfo, callback) => {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: paymentInfo.appId, // 公众号名称，由商户传入
        timeStamp: String(paymentInfo.timeStamp), // 时间戳，自1970年以来的秒数
        nonceStr: paymentInfo.nonceStr, // 随机串
        package: paymentInfo.package,
        signType: paymentInfo.signType, // 微信签名方式：
        paySign: paymentInfo.paySign, // 微信签名
      },
      res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          if (callback) callback()
        }
      },
    );
  },
  wechatH5Pay: (mweb_url, redirectUrl) => {
    if (redirectUrl) {
      window.location.href = `${mweb_url}&redirect_url=${encodeURIComponent(redirectUrl)}`
    } else {
      window.location.href = mweb_url
    }
  },
  /**
   * 支付宝h5支付
   * @param form
   */
  aliH5Pay: (form) => {
    const div = document.createElement('div');
    div.setAttribute('id', 'alipaydiv')
    div.innerHTML = form;
    document.body.appendChild(div);
    document.getElementById('alipaysubmit').submit()
    document.getElementsByTagName('body')[0].removeChild(div)
  },
}

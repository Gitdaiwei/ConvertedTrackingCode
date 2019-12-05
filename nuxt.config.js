/* eslint-disable no-param-reassign */
const { resolve } = require('path')
const pkg = require('./package');

module.exports = {
  mode: 'spa', // 移动端项目都为spa模式
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=no',
      },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'google-signin-client_id', content: '874853493328-2tu90ambcfqggmvsooidm3a1kt5pjknu.apps.googleusercontent.com' },
      { name: 'twitter:title', content: 'TRUBTUSH SONIC TOOTHBRUSH' },
      { name: 'twitter:image', content: 'https://cdn-trubrush.dankal.cn/20190926104610.png' },
      { name: 'twitter:description', content: 'TRUBTUSH SONIC TOOTHBRUSH' },
      // { name: 'twitter:description', content: `Hey! I'd like to get this awesome sonic toothbrush at $19.8. Mind helping me get discount?` },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:url', content: '当前分享的链接---可要可不要' },
      // { name: 'og:image', content: 'https://cdn-trubrush.dankal.cn/1557383317.jpg' },
      { name: 'og:image', content: 'https://cdn-trubrush.dankal.cn/20190926104610.png' },
      { name: 'og:title', content: 'TRUBTUSH SONIC TOOTHBRUSH' },
      // { name: 'og:description', content: `Hey! I get 10% off this awesome sonic toothbrush EVERY time I have a new friend click on my link. Mind helping out?` },
      { name: 'og:description', content: 'TRUBTUSH SONIC TOOTHBRUSH' },
      { name: 'og:locale', content: 'en-US' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: '当前分享的链接--可要可不要' },
    ],
    script: [
      {
        src: 'https://apis.google.com/js/api:client.js',
      }, {
        src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=1135719260150934',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e8864c' },
  transition: {
    name: 'router-fade',
    mode: 'out-in',
  },
  /*
   ** Global CSS
   */
  css: ['assets/styles/app.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: 'plugins/plugins.js', ssr: false },
    { src: 'plugins/vuex-persistedstate.js', ssr: false },
    { src: '~plugins/ga.js', mode: 'client' },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    plugins: [],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['cube-ui'] = 'cube-ui/lib';
      config.resolve.alias['~assets'] = resolve('assets')
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};

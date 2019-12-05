import Vue from 'vue'
import env from '~/configs/enviroment'

const { imgDomain } = env
// Vue.filter('imgMapper', value => imgDomain + value)

Vue.filter('imgMapper', value => {
  if (value && value.indexOf('http') > -1) {
    return value
  }
  return imgDomain + value
})

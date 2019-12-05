<template>
  <div
    id="google-login"
    class="container">
    <div class="bt Google">
      <img
        class="ic normal"
        src="@/assets/images/current/ic_registered_Google_light.png">
      <!-- <img
        class="ic light"
        src="@/assets/images/current/ic_registered_Google_light.png"> -->
      <span
        data-onsuccess="onSignIn">Continue with Google </span>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Axios from 'axios'
import { imgDomain } from '@/configs/enviroment'
import { oauthLogin, login } from '@/api/login'
import utils from '@/jslibs/dk-utils';
import headerView from '@/components/header'

import { getUploadToken, uploadImg } from '@/api/common'

export default {
  head() {
    return {
      title: 'Sign up',
    }
  },
  data() {
    return {
      isShowNav: false,
      logo: '',
      token: '',
      uploadToken: '',
      faceBookAvatar: '',
      param: {
        email: '',
        password: '',
      },
      htmlStatus: {
        email: 0,
        pwd: 0,
      },
    };
  },
  components: { headerView },
  mounted() {
    this.network().getUploadToken()
    this.initGoogle()
  },
  methods: {
    clickPwd() {
      this.$nextTick(() => {
        this.$refs.pwd.focus();
      });
    },
    initGoogle() {
      let auth2 = ''
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
          client_id: '874853493328-2tu90ambcfqggmvsooidm3a1kt5pjknu.apps.googleusercontent.com',
          // Request scopes in addition to 'profile' and 'email'
          // scope: 'additional_scope'
        });
        auth2.attachClickHandler(document.getElementById('google-login'), {},
          (googleUser) => {
            console.log(googleUser.getBasicProfile(), 'googleUser')
            console.log(googleUser.getBasicProfile().getId())
            const res = googleUser.getBasicProfile()
            this.network().oauthLogin(res.getId(), 2, res.Paa, res.ig)
          }, (error) => {
            console.log(JSON.stringify(error, undefined, 2));
          });
      });
    },
    network() {
      return {
        oauthLogin: async (oauthId, oauthType, avatar, nickname) => {
          const { data } = await oauthLogin({
            oauth_id: oauthId,
            oauth_type: oauthType,
            avatar,
            nickname,
          })
          console.log('登录', data);
          utils.setCookie('X-Access-Token', data.token.access_token)
          if (this.$route.path === '/') {
            this.$store.commit('pcondition', false);
            this.$router.push('/user/bargain/detail');
          } else {
            window.history.go(0)
          }
        },
        getUploadToken: async () => {
          const { data } = await getUploadToken()
          if (data.token) {
            this.uploadToken = data.token
          }
          console.log(data, 'upLoadtoken')
        },
        uploadImg: async (formData) => {
          const { data, status } = await uploadImg(formData)
          if (status === 200) {
            this.faceBookAvatar = imgDomain + data.hash
          }
        },
      };
    },
    handler() {
      return {
        example: () => {
          console.log('handle');
        },
      };
    },
  },
};
</script>
<style lang="scss" scoped>
  .oHead{
    position:fixed;
    display: flex;
    justify-content:space-between;
    align-items:center;
    background: #73c9b3;
    height: 0.98rem;
    width: 100%;
    z-index:2;
    top: 0;
    left: 0;
    .logo{
          height: 0.45rem;
          max-width: 4rem;
        }
    .menu{
      color: #FFFFFF;
      margin-left: 0.2rem;
    }
    .shop{
      color: #FFFFFF;
      padding: 0 0.2rem;
      border-radius:0.22rem;
      border: solid 0.01rem #FFFFFF;
      margin-right: 0.2rem;
    }
  }
  .ul{
        position: absolute;
        top: 0.98rem;
        left: 0;
        width: 100%;
        background: #FFFFFF;
        .li{
          text-align:left;
          border-bottom: 1px solid #E5E5E5;
          padding: 0.2rem 0.28rem;
          color: #8D99A1;
          font-size: 0.26rem;
        }
      }
  .container{
    width: 100%;
    padding: 0 .6rem;
    margin-top: 0.98rem;
    .bt{
      width: 8.5rem;
      height: 1rem;
      // border: 1px solid #B4C4CC;
      // border-radius: 0.45rem;
      display: flex;
      // justify-content: center;
      align-items: center;
      font-size: 0.32rem;
      color: #8D99A1;
      margin:0 auto;
      margin-bottom: 0.3rem;
      padding-left: 2.25rem;
      font-size: 0.25rem;
      .ic{
        width: 0.42rem;
        height: 0.42rem;
        object-fit: contain;
        margin-right: 0.22rem;
        &.light{display: none;
        background-color: #4267b2;
        }
      }
      // &:active{
      //   background:linear-gradient(90deg,rgba(126,223,198,1) 0%,rgba(115,201,179,1) 100%);
      //   box-shadow:0px 2px 10px 0px rgba(115,201,179,0.8);
      //   color: #FFFFFF;
      //   .light{display: inline-block}
      //   .normal{display: none}
      // }
    }
    .Facebook{
      background-color: #4267b2;
      color: #fff;
    }
    .Google{
      background-color: #dc4b3e;
      color: #fff;
    }
    .login-title {
    width: 100%;
    padding: 0.6rem 0 0.34rem;
    b {
      font-size: 0.6rem;
      line-height: 0.8rem;
      color: #73c9b3;
      margin-bottom: 0.04rem;
      letter-spacing: -0.02rem;
    }
    h2 {
      font-size: 0.32rem;
      line-height: 0.48rem;
      margin-top: 0.12rem;
    }
    h2 span {
      color: #73c9b3;
    }
    }
    .form {
    width: 100%;
    .form-group {
      margin-bottom: 0.26rem;
      position: relative;
      .form-group-label {
        position: relative;
        top: 0.6rem;
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
        font-size: 0.32rem;
        font-weight: 300;
        line-height: 0.34rem;
        margin: 0;
        padding-left: 0.04rem;
        color: #838383;
      }
      .form-group-input {
        width: 100%;
        height: 0.72rem;
        padding: 0.14rem 0.02rem;
        border-radius: 0;
        box-shadow: none;
        font-weight: 400;
        font-size: 0.32rem;
        line-height: 0.34rem;
        color: #222b37;
        border: none;
        border-bottom: 0.02rem solid #aaaeb3;
      }
    }
    .form-group.checked {
      .form-group-label {
        top: 0.08rem;
        left: -0.04rem;
        font-size: 0.24rem;
      }
    }
  }
  }
  .login-buttom {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    color: #fff;
    background-color: #73c9b3;
    text-align: center;
    font-weight: 500;
    font-size: 0.36rem;
    margin-top: 0.96rem;
    margin-bottom: 0.56rem;
    border-radius: 0.08rem;
  }
  p {
    color: #222b37;
    text-align: center;
  }
  .login-or {
    position: relative;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
    span {
      text-align: center;
      display: block;
      margin: 0 auto;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      border: 0.02rem solid #979797;
      font-size: 0.2rem;
      font-weight: 500;
      text-transform: uppercase;
      position: relative;
      background-color: #fff;
      color: #222;
      line-height: 0.46rem;
    }
  }
  .login-or:before {
    content: "";
    position: absolute;
    top: calc(50% - 0.02rem);
    left: 0;
    right: 0;
    border-top: 0.02rem solid #979797;
  }
</style>

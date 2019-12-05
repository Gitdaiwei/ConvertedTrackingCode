<template>
  <div class="container">
    <login-logo/>
    <div class="form">
      <div class="li">
        <div class="attr">Please enter your password </div>
        <div class="main">
          <input
            class="inp"
            type="password"
            placeholder="Please re-enter your password "
            v-model="param.password">
        </div>
      </div>
      <div class="li">
        <div class="attr">Confirm your password   </div>
        <div class="main">
          <input
            class="inp"
            type="password"
            placeholder="Please re-enter your password "
            v-model="confirmPassword">
        </div>
      </div>
    </div>
    <div
      class="submit"
      @click="submit">SUBMIT</div>
  </div>
</template>

<script>
import { register, resetPassword } from '@/api/login'
import loginLogo from '@/components/login-logo'
import utils from '@/jslibs/dk-utils';

export default {
  head() {
    return {
      title: this.$route.query.type === 'register' ? 'Sign up' : 'Choose Password',
    };
  },
  data() {
    return {
      type: this.$route.query.type,
      param: {
        email: this.$route.query.email,
        code: this.$route.query.code,
        password: '',
      },
      confirmPassword: '',
    };
  },
  components: { loginLogo },
  mounted() {
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    submit() {
      if (!this.param.password) {
        this.$createToast({
          txt: 'Please enter the password',
          type: 'txt',
          time: 1000,
        }).show()
      } else if (this.param.password !== this.confirmPassword) {
        this.$createToast({
          txt: 'Please enter the correct confirmation password',
          type: 'txt',
          time: 1000,
        }).show()
      } else if (this.param.password.length < 6) {
        this.$createToast({
          txt: 'Password must be at least 6 characters.',
          type: 'txt',
          time: 1000,
        }).show()
      } else {
        switch (this.type) {
          case 'register':
            this.network().register()
            break
          case 'pass':
            this.network().resetPassword()
            break
          default:
        }
      }
    },
    network() {
      return {
        register: async () => {
          const { data } = await register(this.param)
          console.log('注册', data);
          // this.navigateTo('./email-login')
          utils.setCookie('X-Access-Token', data.token.access_token)
          window.history.go(-4)
        },
        resetPassword: async () => {
          const { data } = await resetPassword(this.param)
          console.log('重设密码', data);
          this.navigateTo('./email-login')
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
  @import './template.scss';
</style>

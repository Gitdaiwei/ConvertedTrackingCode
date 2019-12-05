<template>
  <div class="container">
    <headerView/>
    <div class="ul">
      <div class="li">
        <span>Profile Picture</span>
        <img
          class="pic"
          :src="userInfo.avatar | imgMapper">
        <input
          class="cover"
          ref="input"
          type="file"
          id="file"
          accept="image/*"
          @change="onFileChanged">
      </div>
      <div class="li">
        <span>Nickname</span>
        <input
          class="val"
          type="text"
          placeholder="Please enter your nickname"
          v-model="userInfo.nickname">
      </div>
    </div>
    <div
      class="btn-primary bt"
      @click="updateUserInfo">保存</div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/user'
import ImageCompressor from 'image-compressor.js';
import { uploadImg, getUploadToken } from '@/api/common';
import { imgDomain } from '@/configs/enviroment'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'information',
    };
  },
  data() {
    return {
      userInfo: {},
      qiniuToken: '',
    };
  },
  components: { headerView },
  mounted() {
    this.network().getUserInfo()
    this.network().getUploadToken()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    updateUserInfo() {
      const { nickname, avatar } = this.userInfo
      if (!nickname || !avatar) return
      this.network().updateUserInfo(nickname, avatar)
    },
    onFileChanged(event) {
      console.log('onFileChanged')
      const file = event.target.files[0];

      if (!file) return;

      // eslint-disable-next-line
      new ImageCompressor(file, {
        quatity: 0.8,
        // eslint-disable-next-line
        success: result => {
          this.network().upload(result);
        },
        // eslint-disable-next-line
        error: error => {
        },
      });
    },
    network() {
      return {
        getUserInfo: async () => {
          const { data } = await getUserInfo()
          console.log('获取用户信息', data)
          this.userInfo = data
        },
        getUploadToken: async () => {
          const { data } = await getUploadToken()
          console.log('七牛参数', data)
          this.qiniuToken = data.token
        },
        updateUserInfo: async (nickname, avatar) => {
          const { data } = await updateUserInfo({ nickname, avatar })
          console.log('更改用户信息', data)
          this.$router.go(-1)
        },
        upload: async (file) => {
          const formData = new FormData();
          formData.append('token', this.qiniuToken);
          formData.append('file', file);
          const res = await uploadImg(formData).catch(() => {});
          if (res.status === 200) {
            this.userInfo.avatar = res.data.hash
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
    @import '~@/assets/styles/mixins.scss';
    .container {
      height: 100vh;
      background: #F5F5F5;

      .ul {
        margin-top: 1rem;
        padding: 0 0.32rem;
        background: #FFFFFF;
        margin-bottom: 0.2rem;

        .li {
          display: flex;
          justify-content: space-between;
          align-content: center;
          padding: 0.3rem 0;
          position: relative;

          .cover{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }

          & + .li {
            border-top: 1px solid #e5e5e5;
          }

          .pic {
            width: 1rem;
            height: 1rem;
            background: #f5f5f5;
            border-radius: 100%;
            object-fit: cover;
          }

          .val {
            line-height: 0.4rem;
            margin-left: auto;
            margin-right: 0.05rem;
            text-align: right;
            flex: 1;
          }
        }
      }
      .bt{
        width: 6.9rem;
        margin-top: 0.5rem;
      }
    }
</style>

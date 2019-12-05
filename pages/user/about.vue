<template>
  <div class="container">
    <headerView/>
    <div class="top">.</div>
    <div class="content">
      <div class="til">“{{ detail.title }}” </div>
      <div class="line"/>
      <div class="main ql-bubble">
        <div class="ql-snow">
          <div
            v-html="detail.content"
            class="ql-editor"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAboutAs } from '@/api/api'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'About Us ',
    };
  },
  data() {
    return {
      detail: {},
    };
  },
  components: { headerView },
  mounted() {
    this.network().getAboutAs()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        getAboutAs: async () => {
          const { data } = await getAboutAs()
          console.log('获取关于我们', data)
          this.detail = data.data
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
  .container{
    padding-bottom: 0.2rem;
    .top{
      /*height: 2.15rem;*/
      background: #73C9B3;
      padding: 0.54rem 0.64rem 1.12rem;
      .logo{
        /*height: 0.4rem;*/
        width: 33%;
      }
    }
    .content{
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 18px 0px rgba(0,0,0,0.1);
      margin: 0 auto;
      margin-top: -0.7rem;
      width: 6.9rem;
      padding: 0.38rem 0.34rem;
      .til{
        font-size: 0.36rem;
        font-weight: 500;
      }
      .line{
        width: 0.5rem;
        height: 1px;
        background: #666666;
        margin: 0.2rem 0 0.3rem;
      }
      .main{
        font-size: 0.24rem;
        color: #666666;
        line-height: 0.42rem;
      }
    }
  }
</style>

<template>
  <div class="container-gray container">
    <div class="box">
      <div class="name">{{ messageInfo.title }}</div>
      <div class="main ql-bubble">
        <div class="ql-snow">
          <div
            v-html="messageInfo.content"
            class="ql-editor"/>
        </div>
      </div>
      <div class="time">{{ messageInfo.release_time }}</div>
    </div>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: 'Details',
    };
  },
  data() {
    return {
      messageInfo: {},
    };
  },
  mounted() {
    this.messageInfo = window.messageInfo
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        example: async () => {
          console.log('network');
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
    @import '~@/assets/styles/variables.scss';
    .container {
      padding-top: 0.2rem;
      .box{
        width: 100%;
        background: #FFFFFF;
        padding: 0.42rem 0.5rem;
        .name{
          font-size:0.32rem ;
          font-weight: 500;
        }
        .main{
          font-size: 0.28rem;
          margin: 0.28rem 0 0.4rem;
        }
        .time{
          font-size: 0.24rem;
        }
      }
    }
</style>

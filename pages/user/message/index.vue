<template>
  <div class="container-gray container">
    <headerView/>
    <div class="ul">
      <div
        class="li"
        v-for="(item, index) in list"
        :key="index"
        @click="navigateTo('./message/detail',item)">
        <div class="top">
          <div class="name">{{ item.title }} </div>
          <div
            class="main"
            v-html="item.content"/>
          <div class="time">{{ item.release_time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/api/api'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'Notifications',
    };
  },
  data() {
    return {
      list: [],
    };
  },
  components: { headerView },
  mounted() {
    this.network().getMessage()
  },
  methods: {
    navigateTo(path, item) {
      window.messageInfo = item
      this.$router.push(path);
    },
    network() {
      return {
        getMessage: async () => {
          const { data } = await getMessage()
          console.log('消息中心', data)
          this.list = data.data
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
  .container{
    .ul{
      margin-top: 0.9rem;
      padding: 0.3rem;
      .li{
        width: 100%;
        padding: 0.3rem;
        background: #FFFFFF;
        margin-top: 0.2rem;
        border-radius:5%;
        box-shadow: 0 0.02rem 0.06rem #888888;
        .top{
          align-items: center;
          .name{
            font-size: 0.32rem;
            font-weight: bolder;
          }
          .main{
            font-size: 0.3rem;
            color:rgba(141,153,161,1);
          }
          .time{
            font-size: 0.24rem;
            color: rgba(180,196,204,1);
            border-top: 0.01rem solid #eee;
            margin-top: 0.3rem;
            padding-left: 4rem;
          }
        }
      }
    }
  }
</style>

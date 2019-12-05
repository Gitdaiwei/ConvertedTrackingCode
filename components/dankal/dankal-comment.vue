<template>
  <section class="dankal-comment">
    <div class="header-block">
      <img
        class="pic"
        :src="comment.userAvatar">
      <span class="name">{{ comment.userName }}</span>
      <dankal-star-bar
        :quantity="5"
        :read-only="true"
        v-model="comment.star"/>
      <span class="time">{{ comment.commentTime }}</span>
    </div>
    <div class="unit">{{ comment.unit }}规格</div>
    <div class="review">{{ comment.content }}</div>
    <div class="img-container">
      <img
        :preview="previewIndex"
        :src="item"
        v-for="(item,index) in comment.images"
        :key="index">
    </div>
  </section>
</template>

<script>
import DankalStarBar from './dankal-star-bar';

export default {
  data() {
    return {
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    previewIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    DankalStarBar,
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/mixins.scss';

  .dankal-comment {
    width: calc(100% - 0.6rem);
    margin: 0 auto;
    background-color: #ffffff;
    padding: 0.25rem 0 0.12rem;
    & + & {
      border-top: 1px soild #f2f2f2;
    }

    .header-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      font-size: 0.24rem;

      .pic {
        width: 0.6rem;
        height: 0.6rem;
        object-fit: cover;
        border-radius: 100%;
      }

      .name {
        color: #333;
        margin: 0 0.2rem;
        @include line-limit-n(1)
      }

      .time {
        margin-left: auto;
        color: #999999;
        text-align: right;
        @include line-limit-n(1)
      }
    }

    .unit {
      font-size: 0.22rem;
      color: #999999;
      margin-bottom: 0.15rem;
    }

    .review {
      font-size: 0.24rem;
    }

    .img-container {
      margin-top: 0.1rem;
      img {
        height: 2.2rem;
        width: 32%;
        margin-right: 2%;
        margin-bottom: 0.18rem;
        object-fit: cover;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
</style>

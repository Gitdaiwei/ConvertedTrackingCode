<template>
  <section class="container">
    <div class="comment-label">
      <span
        v-for="(item, i) in labels"
        :key="i"
        :class="{active: type === item.type}"
        @click="handlerSelectLabel(item.type)">
        {{ item.label }}
      </span>
    </div>
    <div class="comment-list">
      <dankal-comment
        v-for="(item,index) in commentList"
        :key="index"
        :preview-index="index"
        :comment="item"/>
    </div>
  </section>
</template>

<script>
import DankalComment from '@/components/dankal/dankal-comment';

export default {
  data() {
    return {
      labels: [
        {
          label: '全部',
          type: 0,
        },
        {
          label: '最新',
          type: 1,
        },
        {
          label: '好评',
          type: 2,
        },
        {
          label: '中评',
          type: 3,
        },
        {
          label: '差评',
          type: 4,
        },
        {
          label: '有图',
          type: 5,
        },
      ],
      commentList: [
        {
          userName: 'ivancai',
          userAvatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3377302992,3361149372&fm=27&gp=0.jpg',
          star: 5,
          commentTime: '2018-12-10 12:00:00',
          content: '很不错',
          images: [
            'http://img.hb.aicdn.com/6af04574cdaa0ad06afc611fabbfde782b281f2e5539e-bkptqh',
            'http://img.hb.aicdn.com/2988863e2ea2579d1899aea4df846229f49f0d4c6bb1a-77e5tR',
            'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',
            'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',

          ],
        },
        {
          userName: 'miracle',
          userAvatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=27&gp=0.jpg',
          star: 3,
          commentTime: '2018-12-12 12:00:00',
          content: '一般般',
          images: [
            'http://img.hb.aicdn.com/6af04574cdaa0ad06afc611fabbfde782b281f2e5539e-bkptqh',
            'http://img.hb.aicdn.com/2988863e2ea2579d1899aea4df846229f49f0d4c6bb1a-77e5tR',
            'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',
          ],
        },
      ],
      type: 0,
    };
  },

  components: {
    DankalComment,
  },

  methods: {
    handlerSelectLabel(type) {
      this.type = type;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  @import '~@/assets/styles/mixins.scss';
  .container{
    height: 100%;
    background-color: #F5F5F5;
  }
  .comment-label {
    @include flex-container;
    background: #FFFFFF;
    flex-wrap: wrap;

    margin-bottom: 0.2rem;
    padding: 0.3rem 0.3rem 0.12rem;

    span {
      display: inline-block;
      width: 2.18rem;
      height: 0.72rem;

      font-size: 0.26rem;
      text-align: center;
      line-height: 0.72rem;

      margin-bottom: 0.18rem;
      border-radius: 4px;
      background-color: #f5f5f5;

      transition: all 0.3s ease-in-out;
    }

    span + span {
      margin-left: 0.18rem;
    }

    span:nth-child(4) {
      margin-left: 0rem;
    }

    .active {
      color: $primary-color;
      background:rgba(178,140,108,0.1);
    }
  }

  .comment-list {
    background: #FFFFFF;
    .dankal-comment + .dankal-comment {
      border-top: 1px solid $border-color;
    }
  }
</style>

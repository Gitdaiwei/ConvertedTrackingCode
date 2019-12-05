<template>
  <div class="list">
    <div class="li">
      <div class="line">
        <div class="name">PK夺冠</div>
        <div class="time">2018-04-16 13:01:23</div>
      </div>
      <div class="line">
        <div class="award">积分：420</div>
        <div class="income">+20</div>
      </div>
    </div>
    <div class="li">
      <div class="line">
        <div class="name">PK夺冠</div>
        <div class="time">2018-04-16 13:01:23</div>
      </div>
      <div class="line">
        <div class="award">积分：420</div>
        <div class="income">+20</div>
      </div>
    </div>
    <div class="li">
      <div class="line">
        <div class="name">PK夺冠</div>
        <div class="time">2018-04-16 13:01:23</div>
      </div>
      <div class="line">
        <div class="award">积分：420</div>
        <div class="income">+20</div>
      </div>
    </div>
    <div class="li">
      <div class="line">
        <div class="name">PK夺冠</div>
        <div class="time">2018-04-16 13:01:23</div>
      </div>
      <div class="line">
        <div class="award">积分：420</div>
        <div class="income">+20</div>
      </div>
    </div>
    <div class="li">
      <div class="line">
        <div class="name">PK夺冠</div>
        <div class="time">2018-04-16 13:01:23</div>
      </div>
      <div class="line">
        <div class="award">积分：420</div>
        <div class="income">+20</div>
      </div>
    </div>
    <div class="li">
      <div class="line">
        <div class="name">PK夺冠</div>
        <div class="time">2018-04-16 13:01:23</div>
      </div>
      <div class="line">
        <div class="award">积分：420</div>
        <div class="income">+20</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '积分详情',
    };
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    network() {
      return {
        example: async () => {
          console.log('network');
        },
      };
    },
    handle() {
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
  .list{
    height: 100%;
    background: #FFFFFF;
    overflow: hidden;
    .li{
      border-bottom: 1px solid #E5E5E5;
      padding: 0.25rem 0.4rem;
      .line{
        display: flex;
        justify-content: space-between;
        align-content: center;
        line-height:0.52rem;
        .name{font-size: 0.3rem;font-weight: bolder;}
        .time{font-size: 0.26rem;color: #999999}
        .award{font-size: 0.26rem;color: #666666}
        .income{font-size: 0.38rem;color: #333333;font-weight: bolder; }
      }
    }
  }

</style>

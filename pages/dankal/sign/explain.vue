<template>
  <div class="content">
    <div class="tip">坚持每天签到，每天都能获得相应的积分奖励；如遇忘记签到的情况，签到起始日重新开始计算。</div>
    <div class="ul">
      <div class="li">
        <span>连续签到5日</span>
        <span class="fr">额外奖励0.10个积分；</span>
      </div>
      <div class="li">
        <span>连续签到10日</span>
        <span class="fr">额外奖励0.15个积分；</span>
      </div>
      <div class="li">
        <span>连续签到15日</span>
        <span class="fr">额外奖励0.20个积分；</span>
      </div>
      <div class="li">
        <span>连续签到20日</span>
        <span class="fr">额外奖励0.25个积分；</span>
      </div>
      <div class="li">
        <span>连续签到25日</span>
        <span class="fr">额外奖励0.30个积分；</span>
      </div>
      <div class="li">
        <span>连续签到30日</span>
        <span class="fr">额外奖励0.40个积分；</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '签到说明',
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
  .content {
    color: #666666;
    line-height: 1.6;
    background: #ffffff;
    padding: 0.68rem 0 0.5rem;
  }

  .tip {
    padding: 0 0.30rem;
  }

  .ul {
    padding: 0 0.86rem 0 0.56rem;
    margin-top: 0.40rem;
  }

  .li:before {
    content: "";
    display: inline-block;
    width: 0.10rem;
    height: 0.10rem;
    border-radius: 100%;
    background: #B28C6C;
    vertical-align: middle;
    margin-right: 0.20rem;
  }

  .li .fr {
    width: 3.20rem;
  }
</style>

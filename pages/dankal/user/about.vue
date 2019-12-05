<template>
  <section class="container">
    <div class="icon-item">
      <img
        src="@/assets/images/favicon.png"
        alt=""
      >
      <span>Dankal Tamplate</span>
      <span>版本：v1.00</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #ffffff;
  height: 100vh;
}

.icon-item {
  text-align: center;

  font-size: 0rem;

  img {
    width: 1.92rem;
    height: 1.92rem;

    margin-bottom: 0.3rem;
  }

  span {
    display: block;
  }

  span:nth-of-type(1) {
    font-size: 0.4rem;
    margin-bottom: 0.15rem;
  }

  span:nth-of-type(2) {
    font-size: 0.28rem;
    color: #666666;
  }
}
</style>

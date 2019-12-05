<template>
  <section class="container">
    <div class="textarea-block">
      <div class="textarea-item">
        <textarea
          name="feedback"
          placeholder="* 我们懂得聆听，请在此写下您的建议"
          maxlength="200"
        />
        <p class='text-item'>
          <span>{{ number }}</span>/<span>200</span>
        </p>
      </div>
      <dankal-image-upload
        class="upload-item"
        :limit="limit"
        :domain="domain"
        :token="token"
        v-model="images"
      />
    </div>
    <div
      class="action-button"
    >
      保存
    </div>
    <dankal-modal v-model="active">
      <div class="modal-content">
        <img src="@/assets/images/ic-feedback-success.png" >
        <span>反馈成功</span>
      </div>
    </dankal-modal>
  </section>
</template>

<script>
import DankalImageUpload from '@/components/dankal/dankal-image-upload';
import DankalModal from '@/components/dankal/dankal-modal';

export default {
  head() {
    return {
      title: '意见反馈',
    };
  },

  data() {
    return {
      domain: '',
      token: '',
      images: [],
      limit: 3,
      number: 0,
      active: false,
    };
  },

  components: {
    DankalImageUpload,
    DankalModal,
  },
};
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables.scss';

.container {
  padding-top: 0.2rem;
}

.textarea-block {
  background-color: #ffffff;
  margin-bottom: 0.32rem;
  padding: 0.32rem 0.32rem 0.32rem 0.32rem;

  .textarea-item {
    position: relative;
    border-bottom: 1px solid $border-color;
    // height: 3rem;

    textarea {
      width: 100%;
      height: 2.88rem;
      box-sizing: border-box;
      margin-bottom: 0.32rem;
      background: #ffffff;
      font-size: 0.28rem;
      color: $primary-text-color;
      line-height: 0.4rem;
    }

    .text-item {
      display: inline-block;
      width: 100%;

      color: $secondary-text-color;
      text-align: right;
      font-size: 0.28rem;
      line-height: 0.4rem;

      span:nth-of-type(1) {
        color: $primary-color;
      }
    }
  }

  .upload-item {
    margin-top: 0.24rem;
  }
}

.action-button {
  display: block;

  width: 6.76rem;
  height: 0.92rem;

  text-align: center;
  font-size: 0.32rem;
  color: #ffffff;
  line-height: 0.92rem;

  margin: 0 auto;
  background: $primary-color;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 4.8rem;
  height: 4.2rem;

  border-radius: 0.1rem;
  background-color: #ffffff;

  img {
    width: 2.24rem;
    margin-bottom: 0.32rem;
  }

  text {
    font-size: 0.36rem;
  }
}
</style>

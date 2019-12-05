<template>
  <transition name="router-fade">
    <section
      class="dankal-modal"
      v-if="value">
      <div
        class="modal-shadows"
        @click="handlerModalClose"/>
      <div
        class="modal-content"
        :class="direction"
        :style="'background:'+background+';border-radius:'+borderRadius"
        v-if="value">
        <div
          class="modal-close"
          @click="handlerModalClose(true)"
          v-if="buttonCloseAble"/>
        <slot />
      </div>
    </section>
  </transition>

</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    cornerCloseAble: {
      type: Boolean,
      default: true,
    },
    buttonCloseAble: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'center',
    },
    background: {
      type: String,
      default: '#FFFFFF',
    },
    borderRadius: {
      type: String,
      default: '0',
    },
  },

  methods: {
    handlerModalClose(isButton) {
      if (!this.cornerCloseAble && !isButton) return
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" >
  @import '~@/assets/styles/mixins.scss';
  .dankal-modal {
    @include pos-box(fixed,0,auto,auto,0);
    z-index: 2;
    width: 100%;
    height: 100%;

    .modal-shadows {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      position: absolute;
      &.center{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &.left{
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &.right{
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &.top{
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      &.bottom{
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .modal-close {
         @include pos-box(absolute, 0, 0, auto, auto);
         width: 1rem;
         height: 1rem;
         background: url(~assets/images/ic_close.png) no-repeat center;
         background-size: 0.25rem;
       }
    }
  }
</style>

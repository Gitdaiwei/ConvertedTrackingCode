<template>
  <div class="dankal-image-upload">
    <div
      class="img"
      v-for="(item,index) in list"
      :key="index">
      <img
        class="upload_img"
        :src="domain + item"
        alt="">
      <img
        class="close"
        src="@/assets/images/ic_del.png"
        @click="onDeleted(index)">
    </div>
    <img
      v-if="list.length < limit"
      @click='onSelected'
      class="add"
      src="@/assets/images/ic_add_pic.png"
      alt="">
    <input
      ref="input"
      type="file"
      id="file"
      accept="image/*"
      style="display:none;"
      @change="onFileChanged">
  </div>
</template>

<script>
import ImageCompressor from 'image-compressor.js';
import { uploadImg } from '@/api/common';

export default {
  name: 'DankalImageUpload',

  data() {
    return {
      list: [],
      toast: '',
    };
  },

  created() {
    this.toast = this.$createToast({
      txt: '上传中...',
      mask: true,
    });
  },

  props: {
    value: {
      type: Array,
      required: true,
    },
    limit: {
      type: Number,
      default: 3,
    },
    domain: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    quatity: {
      type: Number,
      default: 0.6,
    },
  },

  watch: {
    value(n) {
      this.list = n;
    },
  },

  mounted() {
    this.list = this.value;
  },

  methods: {
    onSelected() {
      const { limit, list } = this;

      if (limit && list.length >= limit) {
        this.$createToast({ txt: `只能上传${limit}张图片`, time: 1500 }).show();
        this.toast.show();
        return;
      }

      this.$refs.input.click();
    },

    onDeleted(index) {
      this.list.splice(index, 1)
      this.$emit('input', this.list);
    },

    onFileChanged(event) {
      const file = event.target.files[0];

      if (!file) return;

      // eslint-disable-next-line
      new ImageCompressor(file, {
        quatity: this.quatity,
        // eslint-disable-next-line
        success: result => {
          this.upload(result);
        },
        // eslint-disable-next-line
        error: error => {
          this.$createToast({ txt: error.message, time: 1500 }).show();
        },
      });

      this.toast.show();
    },

    async upload(file) {
      const formData = new FormData();
      formData.append('token', this.token);
      formData.append('file', file);
      const res = await uploadImg(formData).catch(() => {});
      this.toast.hide();

      if (res.status === 200) {
        this.list.push(res.data.hash);
        this.$emit('input', this.list);
      }
    },
  },
};
</script>

<style lang="scss" >
.dankal-image-upload {
  .img {
    position: relative;
    width: 1rem;
    height: 1rem;
    margin-right: 0.4rem;
    float: left;

    .upload_img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .close {
      width: 0.3rem;
      height: 0.3rem;
      position: absolute;
      top: -0.15rem;
      right: -0.15rem;
    }
  }

  .add {
    width: 1rem;
    height: 1rem;
  }
}
</style>

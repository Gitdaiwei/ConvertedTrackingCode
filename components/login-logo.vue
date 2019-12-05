<template>
  <img
    class="logo"
    :src="logo | imgMapper">
</template>

<script>
import { getLogo } from '@/api/api';

export default {
  data() {
    return {
      logo: '',
    };
  },
  mounted() {
    this.network().getLogo()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        getLogo: async () => {
          const { data } = await getLogo('login')
          console.log('获取logo', data)
          this.logo = data.logo
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

<style scoped>
    /*公用样式*/
    .bs4-lg, .bs4-xl, .bs4-md, .bs4-sm, .bs4-xs {

    }

    /*pc样式*/
    .bs4-lg, .bs4-xl, .bs4-md {

    }

    /*h5样式*/
    .bs4-sm, .bs4-xs {

    }
</style>

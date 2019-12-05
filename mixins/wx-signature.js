import { getWXSignature } from '@/api/common';

export default {
  data() {
    return {
      wxSignature: '',
    }
  },
  created() {
  },
  methods: {
    async getWXSignature(params) {
      const { status, data } = await getWXSignature(encodeURIComponent(window.location.href))
      if (status === 200) {
        this.wxSignature = data
        this.$initwxjssdk(data, params)
      }
    },
  },
}

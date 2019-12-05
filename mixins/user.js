import { getUserInfo } from '@/api/user';

export default {
  data() {
    return {
      user: {},
    };
  },

  created() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      const { data } = await getUserInfo();
      this.user = data.user_info;
    },
  },
};

<template>
  <div class="user-wrap">
    <header class="user-info">
      <img class="user-avatar" src="../../assets/images/avatar.jpg" alt="" />
      <div class="user-detail">
        <h4 class="user-email">{{ userName }}</h4>
        <span class="user-number">文明驾驶分 <strong>0</strong></span>
      </div>
    </header>
    <main>
      <ul class="sider-list">
        <router-link :to="{ name: 'My' }">
          <i class="icon icon-user-link-1"></i>
          我的帐户
        </router-link>
        <router-link :to="{ name: 'Order' }">
          <i class="icon icon-user-link-2"></i>
          租车订单
        </router-link>
        <router-link :to="{ name: 'Authentication' }">
          <i class="icon icon-user-link-3"></i>
          实名认证
        </router-link>
        <router-link :to="{ name: 'Safe' }">
          <i class="icon icon-user-link-4"></i>
          安全设置
        </router-link>
        <router-link :to="{ name: 'Index' }">
          <i class="icon icon-user-link-5"></i>
          帮助中心
        </router-link>
      </ul>
    </main>
    <footer>
      <a href="javascript: void(0);" class="logout-btn" @click="logout">登出</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      userName: this.$store.state.login.accountName
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("login/accountLogout").then(() => {
        this.$router.replace({
          name: "Index"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/views/user";
</style>

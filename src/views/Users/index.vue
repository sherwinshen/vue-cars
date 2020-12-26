<template>
  <div class="user-wrap">
    <div class="user-info">
      <img class="user-avatar" src="./../../assets/images/avatar.jpg" />
      <div class="user-detail">
        <h4 class="user-email">sw1234@qq.com</h4>
        <span class="user-number">文明驾驶分 <strong>0</strong></span>
      </div>
    </div>
    <div class="user-select">
      <ul>
        <router-link :to="{ name: 'Home' }">
          <i class="icon icon-user-link-1"></i>
          我的帐户
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <i class="icon icon-user-link-2"></i>
          租车订单
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <i class="icon icon-user-link-3"></i>
          实名认证
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <i class="icon icon-user-link-4"></i>
          安全设置
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <i class="icon icon-user-link-5"></i>
          帮助中心
        </router-link>
      </ul>
    </div>
    <a href="javascript: void(0);" class="logout-btn">登出</a>
  </div>
</template>

<script>
export default {
  name: "User"
};
</script>

<style scoped lang="scss">
@import "src/styles/views/user";
</style>

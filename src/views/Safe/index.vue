<template>
  <div class="safe-wrap">
    <sider-header title="安全设置"></sider-header>
    <div>
      <ul class="sider-list">
        <router-link :to="{ name: 'Password' }">
          修改登陆密码
        </router-link>
        <router-link :to="{ name: 'Capital' }">
          设置支付密码
        </router-link>
        <router-link :to="{ name: 'Bank' }">
          绑定银行卡
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import SiderHeader from "@/components/SiderHeader/index";

export default {
  name: "Safe",
  components: {
    SiderHeader
  }
};
</script>

<style scoped></style>

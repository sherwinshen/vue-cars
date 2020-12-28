<template>
  <div class="safe-wrap">
    <sider-header title="安全设置"></sider-header>
    <div>
      <ul class="sider-list">
        <router-link :to="{ name: 'Index' }">
          修改登陆密码
        </router-link>
        <router-link :to="{ name: 'Index' }">
          设置支付密码
        </router-link>
        <router-link :to="{ name: 'Index' }">
          绑定手机号
        </router-link>
        <router-link :to="{ name: 'Safe' }">
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

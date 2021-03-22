<template>
  <div class="safe-wrap">
    <BackHeader />
    <div>
      <ul class="sider-list">
        <router-link :to="{ name: 'Password' }">
          重置密码
        </router-link>
        <router-link :to="{ name: 'Capital' }">
          设置资金密码
        </router-link>
        <router-link :to="{ name: 'Bank' }">
          绑定银行卡
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";

export default {
  name: "Safe",
  components: {
    BackHeader
  }
};
</script>

<style scoped></style>

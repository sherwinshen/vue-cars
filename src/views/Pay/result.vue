<template>
  <div class="result-wrap">
    <BackHeader />
    <div
      class="icon"
      :class="status === 'success' ? 'icon-success' : 'icon-fail'"
    ></div>
    <p
      class="text"
      :class="status === 'success' ? 'color-success' : 'color-fail'"
    >
      支付{{ status === "success" ? "成功" : "失败" }}
    </p>
    <div class="blank-40"></div>
    <div>
      <el-button type="primary" round class="button-block" @click="goToIndex"
        ><strong>返回首页</strong></el-button
      >
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";

export default {
  name: "Result",
  components: { BackHeader },
  data() {
    return {
      status: this.$route.query.status
    };
  },
  methods: {
    goToIndex() {
      this.$router.push({
        name: "User"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  width: 40px;
  height: 40px;
  margin: auto;
  background-size: cover;
}
.text {
  text-align: center;
  padding: 15px 0;
  font-size: 20px;
}
</style>

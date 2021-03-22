<template>
  <div class="authentication-wrap">
    <BackHeader />
    <ul class="menu">
      <li :class="{ current: type === 'identity' }" @click="tab('identity')">
        身份证上传
      </li>
      <li :class="{ current: type === 'drive' }" @click="tab('drive')">
        驾驶证上传
      </li>
    </ul>
    <div class="upload-wrap">
      <UploadImg />
      <p class="text">正面</p>
    </div>
    <div class="upload-wrap">
      <UploadImg />
      <p class="text">反面</p>
    </div>
    <div class="upload-wrap" v-if="type === 'identity'">
      <UploadImg />
      <p class="text">手持免冠</p>
    </div>
    <div class="blank-40"></div>
    <el-button type="primary" class="button-block" round
      >提交{{ type === "identity" ? "身份证" : "驾驶证" }}</el-button
    >
    <p class="tip">本页面仅供展示</p>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import UploadImg from "@/components/UploadImg";

export default {
  name: "Authentication",
  components: { BackHeader, UploadImg },
  data() {
    return {
      type: "identity"
    };
  },
  methods: {
    tab(type) {
      this.type = type;
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  text-align: center;
  margin-bottom: 40px;
  li {
    display: inline-block;
    position: relative;
    font-size: 14px;
    opacity: 0.5;
    padding: 0 40px 15px;
    color: #fff;
    cursor: pointer;
    &.current {
      opacity: 1;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -15px;
        width: 30px;
        height: 4px;
        border-radius: 10px;
        background-color: #00a3ff;
      }
    }
  }
}
.upload-wrap {
  .text {
    padding: 15px 0;
    color: #fff;
    opacity: 0.5;
    text-align: center;
  }
}
</style>

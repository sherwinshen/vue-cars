<template>
  <div class="sider-header-wrap">
    <i class="icon"></i>
    <h4 class="title text-align-center">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  name: "SiderHeader",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.sider-header-wrap {
  position: relative;
  margin: 10px 0 60px 0;

  .title {
    font-size: 16px;
    margin-left: 33px;
    color: #fff;
    line-height: 60px;
  }

  .icon {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0;
    &:before {
      content: "";
      position: absolute;
      left: 25px;
      top: 25px;
      display: block;
      width: 12px;
      height: 12px;
      border-left: 2px solid #00a3ff;
      border-top: 2px solid #00a3ff;
      @include webkit(transform, rotate(-45deg));
      cursor: pointer;
    }
  }
}
</style>

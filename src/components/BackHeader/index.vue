<template>
  <div class="back-header-wrap">
    <header class="nav-header">
      <div class="back-wrap" @click="goBack">
        <i class="icon"></i>
        <h4 class="title">{{ title }}</h4>
      </div>
      <div class="right-wrap">
        <slot name="headerRight"></slot>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "BackHeader",
  computed: {
    title() {
      return this.$store.state.app.routerName; // 如果要监听某个变量的数据变化，只需要放置变量在computed对象里即可
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.back-header-wrap {
  position: relative;
  padding-bottom: 147px;
}

.nav-header {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
}

.back-wrap {
  float: left;

  .title {
    font-size: 16px;
    margin-left: 30px;
    color: #fff;
  }

  .icon {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      display: block;
      width: 10px;
      height: 10px;
      border-left: 2px solid white;
      border-top: 2px solid white;
      @include webkit(transform, rotate(-45deg));
      cursor: pointer;
    }
  }
}

.right-wrap {
  float: right;
}
</style>

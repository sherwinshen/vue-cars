<template>
  <ul class="navbar-wrap">
    <li><i class="icon icon-select icon-help"></i></li>
    <li><i class="icon icon-select icon-search"></i></li>
    <li class="navbar-logo">
      <span>在线</span>
      <i class="icon icon-car"></i>
      <span>租车</span>
    </li>
    <li><i class="icon icon-select icon-location"></i></li>
    <li><i class="icon icon-select icon-user" @click="goToUser"></i></li>
  </ul>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    goToUser() {
      this.$router.push({ name: "User" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/views/navBar.scss";

.navbar-wrap {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  li {
    display: inline-block;
  }

  .icon-select {
    background-color: $color-main;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    margin: 0 10px;
    cursor: pointer;
    @include webkit(transition, all 0.3s ease 0s);

    &:hover {
      background-color: #fff;
    }
  }

  .navbar-logo {
    background-color: $color-main;
    color: #fff;
    font-size: 24px;
    width: 200px;
    height: 60px;
    border-radius: 60px;
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;

    .icon-car {
      width: 36px;
      height: 36px;
      margin: 0 5px;
      background-image: url(~@/assets/images/icons/icon-car.png);
    }
  }
}
</style>

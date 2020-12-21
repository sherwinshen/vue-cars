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

<style scoped lang="scss">
.navbar-wrap {
  z-index: 100;
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

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
    transition: all 0.3s ease 0s;

    &:hover {
      background-color: #fff;
    }
  }

  .navbar-logo {
    background-color: $color-main;
    color: #fff;
    font-size: 26px;
    width: 220px;
    height: 70px;
    border-radius: 70px;
    line-height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;

    .icon-car {
      width: 40px;
      height: 40px;
      margin: 0 5px;
      background-image: url(~@/assets/images/icons/icon-car.png);
    }
  }
}
</style>

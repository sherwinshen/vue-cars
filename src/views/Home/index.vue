<template>
  <div class="home-wrap">
    <div id="sider-wrap" :class="{ open: show }">
      <router-view />
    </div>
    <Car />
    <Navbar></Navbar>
    <Map />
  </div>
</template>

<script>
import Car from "@/views/Cars/index";
import Map from "@/views/Map/index";
import Navbar from "@/components/Navbar/index";

export default {
  name: "Home",
  components: {
    Navbar,
    Map,
    Car
  },
  computed: {
    show() {
      return this.$route.name !== "Home";
    }
  },
  mounted() {
    document.addEventListener("mouseup", e => {
      const sider = document.getElementById("sider-wrap");
      if (sider && this.show && !sider.contains(e.target)) {
        this.$router.push({ name: "Home" });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.home-wrap {
  #sider-wrap {
    z-index: 102;
    position: fixed;
    right: -500px;
    top: 0;
    bottom: 0;
    width: 360px;
    background-color: $color-main;
    transition: all 0.3s ease 0s;
    @include webkit-prefix(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, 0.4));

    &.open {
      right: 0;
    }
  }
}
</style>

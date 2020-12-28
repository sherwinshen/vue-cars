<template>
  <div class="index-wrap">
    <div class="sider-wrap" id="sider" :class="{ open: show }">
      <router-view />
    </div>
    <Car />
    <Navbar></Navbar>
    <Map />
  </div>
</template>

<script>
import Car from "@/views/Index/Car";
import Map from "@/views/Index/Map";
import Navbar from "@/views/Index/Navbar";

export default {
  name: "Index",
  components: {
    Car,
    Map,
    Navbar
  },
  computed: {
    show() {
      return this.$route.name !== "Index";
    }
  },
  mounted() {
    document.addEventListener("mouseup", e => {
      const sider = document.getElementById("sider");
      if (sider && this.show && !sider.contains(e.target)) {
        this.$router.push({ name: "Index" });
      }
    });
  }
};
</script>

<style lang="scss">
.index-wrap {
  position: relative;

  .car-wrap {
    z-index: 98;
  }

  .map-wrap {
    z-index: 97;
  }

  .navbar-wrap {
    z-index: 99;
  }

  .sider-wrap {
    z-index: 100;
    position: fixed;
    right: -500px;
    top: 0;
    bottom: 0;
    width: 360px;
    background-color: $color-main;
    transition: all 0.3s ease 0s;
    @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, 0.4));

    &.open {
      right: 0;
    }
  }
}
</style>

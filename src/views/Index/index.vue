<template>
  <div class="index-wrap">
    <div class="sider-wrap" id="sider" :class="{ open: show }">
      <router-view />
    </div>
    <!--    <Car />-->
    <Navbar></Navbar>
    <Map @callback="callback" />
  </div>
</template>

<script>
// import Car from "@/views/Index/Car";
import Map from "@/views/Map/Map";
import Navbar from "@/views/Index/Navbar";

import { Parking } from "@/api/parking";

export default {
  name: "Index",
  components: {
    // Car,
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
  },
  methods: {
    // 公共 - 子组件回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName] && this[params.funcName](params.data);
      }
    },
    // 地图加载完毕回调
    loadMap() {
      this.getParking();
    },
    // 获取停车场数据
    getParking() {
      Parking().then(response => {
        const data = response.data.data;
        console.log(data);
      });
    }
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

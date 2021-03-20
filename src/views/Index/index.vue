<template>
  <div class="index-wrap">
    <div class="sider-wrap" id="sider" :class="{ open: show }">
      <router-view />
    </div>
    <Car ref="car" @callback="callback" />
    <Navbar></Navbar>
    <Map ref="map" @callback="callback" />
  </div>
</template>

<script>
import Car from "@/views/Index/Car";
import Map from "@/views/Map/Map";
import Navbar from "@/views/Index/Navbar";
import sha1 from "js-sha1";

import { Parking } from "@/api/parking";
import { GetCode } from "@/api/login";

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
    // 登陆后台管理账户（为了对应后台管理系统的数据，实际应用中不需要）
    const requestData = {
      username: "sw1@qq.com",
      password: sha1("sw1234"),
      code: ""
    };
    // 1.获取验证码
    GetCode({
      username: requestData.username,
      module: "login"
    }).then(response => {
      const msg = response.data.message;
      requestData.code = msg.split("：")[1];
      // 2. 登陆
      this.$store.dispatch("login/adminLogin", requestData);
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
        const data = response.data.data.data;
        data &&
          data.forEach(item => {
            item.position = item.lnglat.split(",");
            item.content = `<img src='${require("@/assets/images/parking_location_img.png")}' alt=""/>`;
            item.offset = [-35, -60];
            item.offsetText = [-30, -55];
            item.label = { content: "11", offset: [10, 10] };
            item.text = `<div style="width: 60px; font-size: 20px; color: #fff; text-align: center;line-height: 50px; height: 60px;">${item.carsNumber}</div>`;
            item.events = {
              click: e => {
                this.$store.commit("app/SET_CARS_LIST_REQUEST", true);
                this.walking(e);
                this.getCarsList(e);
              }
            };
          });
        // 停车场覆盖物渲染
        this.$refs.map.parkingData(data);
      });
    },
    // 绘制停车场路径
    walking(e) {
      const data = e.target.getExtData();
      // 先存储某些数据
      this.$refs.map.saveData({
        key: "parkingData",
        value: data
      });
      // 在处理路径绘制
      this.$refs.map.handlerWalking(data.lnglat.split(","));
    },
    // 清除停车场路径
    clearWalking() {
      this.$refs.map.clearWalking();
    },
    // 获取停车场数据
    getCarsList(e) {
      const data = e.target.getExtData();
      this.$refs.car && this.$refs.car.getCarsList(data.id);
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

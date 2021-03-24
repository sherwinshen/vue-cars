<template>
  <div class="index-wrap">
    <div class="sider-wrap" id="sider" :class="{ open: show }">
      <router-view />
    </div>
    <Car ref="car" @callback="callback" />
    <Navbar></Navbar>
    <Map ref="map" @callback="callback" />
    <div class="operation-group">
      <el-button
        type="success"
        size="small"
        class="cars_activation"
        v-if="cars_active_data && cars_active_data.order_no"
        @click="goToCur()"
      >
        进行中的订单
      </el-button>
      <div
        class="button-group"
        v-if="cars_active_data && cars_active_data.order_no"
      >
        <el-button
          type="primary"
          size="small"
          @click="carsGet"
          v-if="cars_active_data.order_status === 'WAIT'"
          >取车</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="carsReturn"
          v-if="cars_active_data.order_status === 'RETURN'"
          >还车</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="carsCancel"
          v-if="cars_active_data.order_status === 'WAIT'"
          >取消</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Car from "@/views/Index/Car";
import Map from "@/views/Map/Map";
import Navbar from "@/views/Index/Navbar";
import sha1 from "js-sha1";

import { Parking } from "@/api/parking";
import { GetCode } from "@/api/login";
import {
  GetCarsActivation,
  CarsGet,
  CarsCancel,
  CarsReturn
} from "@/api/order";

export default {
  name: "Index",
  components: {
    Car,
    Map,
    Navbar
  },
  data() {
    return {
      cars_active_data: JSON.parse(localStorage.getItem("cars_active")),
      order_no: ""
    };
  },
  computed: {
    show() {
      return this.$route.name !== "Index";
    }
  },
  watch: {
    "$store.state.app.isReset": {
      handler(newValue) {
        if (!newValue) {
          !this.order_no && this.getCarsActivation();
        }
        this.$store.commit("app/SET_INDEX_RESET", false);
      }
    }
  },
  beforeMount() {
    !this.order_no && this.getCarsActivation();
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
    },
    // 获取正在进行中的订单
    getCarsActivation() {
      GetCarsActivation().then(response => {
        const data = response.data.data;
        if (data) {
          this.cars_active_data = data;
          localStorage.setItem("cars_active", JSON.stringify(data));
        }
      });
    },
    // 跳转正在进行中订单详情
    goToCur() {
      this.$router.push({
        path: "/orderDetailed",
        query: { order_no: this.cars_active_data.order_no }
      });
    },
    // 取车
    carsGet() {
      CarsGet({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id
      }).then(response => {
        const data = response.data.data;
        if (data && data.order_status) {
          this.$set(this.cars_active_data, "order_status", data.order_status);
          localStorage.setItem(
            "cars_active",
            JSON.stringify(this.cars_active_data)
          );
        }
      });
    },
    // 还车
    carsReturn() {
      CarsReturn({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id
      }).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
      });
    },
    // 取消
    carsCancel() {
      CarsCancel({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id
      }).then(response => {
        this.$message({
          message: response.data.message,
          type: "success"
        });
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
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
.cars_activation {
  position: fixed;
  left: 20px;
  top: 20px;
  padding: 10px 20px;
}
.button-group {
  position: fixed;
  left: 20px;
  top: 80px;
}
</style>

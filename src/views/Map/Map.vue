<template>
  <div class="map-wrap">
    <el-amap
      :vid="'amapVue'"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :events="events"
    >
      <!--遮盖物-圆-->
      <el-amap-circle
        v-for="item in circle"
        :key="item.id"
        :center="item.center"
        :radius="item.radius"
        :fillColor="item.color"
        :strokeColor="item.color"
        :strokeOpacity="item.strokeOpacity"
        :strokeWeight="item.strokeWeight"
      ></el-amap-circle>
      <!--覆盖物 - 停车场-->
      <el-amap-marker
        v-for="(item, index) in parking"
        :key="item.id + index"
        :content="item.content"
        :offset="item.offset"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>
      <!--覆盖物 - 停车场（车辆数）-->
      <el-amap-marker
        v-for="(item, index) in parking"
        :extData="item"
        :events="item.events"
        :key="item.id"
        :content="item.text"
        :offset="item.offsetText"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>
      <!--覆盖物 - 停车场（距离信息）-->
      <el-amap-marker
        v-for="(item, index) in parkingInfo"
        zIndex="1000"
        :key="item.id"
        :content="item.text"
        :offset="item.offset"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { DrawPath } from "@/views/Map/utils";

let amapManager = new AMapManager();

export default {
  name: "Map",
  data() {
    const _this = this;
    return {
      map: null,
      amapManager,
      zoom: 15,
      center: [121.212077, 31.279661],
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        }
      },
      self_lng: "",
      self_lat: "",
      // 遮盖物数据-圆
      circle: [],
      // 遮盖物数据-停车场
      parking: [],
      // 遮盖物数据-停车场距离
      parkingInfo: []
    };
  },
  watch: {
    "$store.state.location.selfLocation": {
      handler() {
        this.setLocation();
      }
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      this.map = amapManager.getMap();
      // 地图初始化完成回调
      this.$emit("callback", {
        funcName: "loadMap"
      });
      this.setLocation();
    },
    // 地图定位
    setLocation() {
      // 本地调试中 getCurrentPosition() and watchPosition() 在 insecure origins 环境下无法使用了，此处定位直接写死了
      // selfLocation({
      //   map: this.map,
      //   onComplete: val => this.selfLocationComplete(val)
      // });
      this.selfLocationComplete({
        position: {
          lng: 121.210077,
          lat: 31.289661
        }
      });
    },
    // 地图定位完成回调
    selfLocationComplete(val) {
      const lng = val.position.lng;
      const lat = val.position.lat;
      this.self_lng = lng;
      this.self_lat = lat;
      const center = [lng, lat];
      this.center = center;
      const circle_item = {
        center: [0, 0],
        radius: 4,
        color: "#393e43",
        strokeOpacity: "0.2",
        strokeWeight: "30"
      };
      circle_item.center = center;
      this.circle.push(circle_item);
    },
    // 停车场数据
    parkingData(value) {
      this.parking = value;
    },
    // 存储数据
    saveData(params) {
      if (this[params.key]) {
        this[params.key] = params.value;
      }
    },
    // 路径绘制
    handlerWalking(lnglat) {
      DrawPath({
        map: this.map,
        position_start: [this.self_lng, this.self_lat],
        position_end: lnglat,
        complete: val => this.handlerWalkingComplete(val)
      });
    },
    // 路径绘制完成回调
    handlerWalkingComplete(val) {
      this.parkingInfo = [
        {
          position: this.parkingData.lnglat.split(","),
          text: `<div style="color: white; border-radius: 100px; padding: 0 12px; font-size: 12px; background-color: #34393f; line-height: 48px; height: 50px; width: 150px;">
                    <span style="font-size: 20px;">${this.parkingData.carsNumber}</span>
                    辆车
                    <span style="display: inline-block; height: 15px; width: 1px; background-color: white; opacity: 0.3; margin: 0 5px -3px;"></span>
                    <span>距离您${val.routes[0].distance}米</span>
                  </div>`,
          offset: [-24, -54]
        }
      ];
    }
  }
};
</script>

<style scoped lang="scss">
.map-wrap {
  width: 100vw;
  height: 100vh;
}
</style>

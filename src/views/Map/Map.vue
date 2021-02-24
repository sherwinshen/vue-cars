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
      <!--覆盖物 - 车辆数-->
      <el-amap-marker
        v-for="(item, index) in parking"
        :key="item.id"
        :content="item.text"
        :offset="item.offsetText"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { selfLocation } from "@/views/Map/utils";

let amapManager = new AMapManager();

export default {
  name: "Map",
  data() {
    const _this = this;
    return {
      map: null,
      amapManager,
      zoom: 13,
      center: [0, 0],
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        }
      },
      // 遮盖物数据-圆
      circle: [
        {
          center: [0, 0],
          radius: 4,
          color: "#393e43",
          strokeOpacity: "0.2",
          strokeWeight: "30"
        }
      ],
      // 遮盖物数据-停车场
      parking: []
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
      selfLocation({
        map: this.map,
        onComplete: val => {
          const lng = val.position.lng;
          const lat = val.position.lat;
          const center = [lng, lat];
          this.center = center;
          this.circle[0].center = center;
        }
      });
    },
    // 停车场数据
    parkingData(value) {
      this.parking = value;
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

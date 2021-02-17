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
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
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
      ]
    };
  },
  methods: {
    // 初始化地图
    initMap() {
      this.map = amapManager.getMap();
      // 地图初始化完成回调
      this.$emit("callback", {
        funcName: "loadMap"
      });
      // 浏览器定位
      // eslint-disable-next-line no-undef
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        markerOptions: {
          content: " "
        }
      });
      this.map.addControl(geolocation);
      geolocation.getCurrentPosition((status, result) => {
        if (status === "complete") {
          const lng = result.position.lng;
          const lat = result.position.lat;
          const center = [lng, lat];
          this.center = center;
          this.circle[0].center = center;
        }
      });
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

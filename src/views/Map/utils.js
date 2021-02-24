// 地图定位获取（浏览器定位）
let geolocation = null;
export function selfLocation(params) {
  if (!geolocation) {
    // eslint-disable-next-line no-undef
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000, //超过10秒后停止定位，默认：5s
      zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
      showMarker: false,
      showButton: false
    });
  }
  params.map.addControl(geolocation);
  // 定位成功
  geolocation.getCurrentPosition();
  if (params.onComplete && typeof params.onComplete == "function") {
    // eslint-disable-next-line no-undef
    AMap.event.addListener(geolocation, "complete", params.onComplete); // 返回定位信息
  }
}

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

// 地图路径
let path = null;
export function DrawPath(params) {
  if (!path) {
    // eslint-disable-next-line no-undef
    path = new AMap.Walking({
      map: params.map,
      hideMarkers: true
    });
  }
  //根据起终点坐标规划步行路线
  path.search(params.position_start, params.position_end, (status, result) => {
    // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
    if (status === "complete") {
      if (params.complete && typeof params.complete == "function") {
        params.complete(result); //定位成功
      }
      console.log("绘制步行路线完成");
    } else {
      console.log("步行路线数据查询失败" + result);
    }
  });
}

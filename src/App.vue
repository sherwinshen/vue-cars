<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.addEventListener("mouseup", e => {
      // 右侧栏
      const sider = document.getElementById("sider");
      if (sider && this.$route.name !== "Index" && !sider.contains(e.target)) {
        this.$router.push({ name: "Index" });
      }

      // 车辆
      const cars = document.getElementsByClassName("car-wrap")[0];
      if (cars && !cars.contains(e.target)) {
        /**
         * 1. 点击地图时判断是否点击的是请求车辆list，用 isRequestCarsList 做标记，true：是停车场，false：不是停车场
         * 2. 判断 isRequestCarsList 为 false 时，修改 isClickCarsList 为 false，点击的不是车辆列表。
         * **/
        const isRequestCarsList = this.$store.state.app.isRequestCarsList;
        if (!isRequestCarsList) {
          // false 不是停车场
          this.$store.commit("app/SET_CARS_LIST_STATUS", false);
        }
      }
    });
  }
};
</script>

<style lang="scss">
#app {
}
</style>

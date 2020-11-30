<template>
  <div class="index">
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index"
};
</script>

<style lang="scss" scoped>
.index {
  .amap-wrapper {
    width: 100vw;
    height: 100vh;
  }
}
</style>

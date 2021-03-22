<template>
  <el-upload class="avatar-uploader" action="" :show-file-list="false">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  name: "UploadImg",
  data() {
    return {
      imageUrl: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>

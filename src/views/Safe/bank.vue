<template>
  <div class="bank-wrap">
    <BackHeader />
    <div class="blank margin-bottom-20">
      <div class="item boc">
        <h4 class="name">中国银行</h4>
        <p class="id">3568 **** **** 8888</p>
      </div>
      <div class="item ccb">
        <h4 class="name">建设银行</h4>
        <p class="id">3568 **** **** 8888</p>
      </div>
      <router-link to="/bankAdd">
        <div class="avatar-uploader">
          <div tabindex="0" class="el-upload el-upload--text">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
      </router-link>
    </div>
    <p class="tip">本页面仅供展示</p>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";

export default {
  name: "Bank",
  components: {
    BackHeader
  }
};
</script>

<style lang="scss" scoped>
.blank {
  .item {
    height: 190px;
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 25px;
    @include webkit(box-sizing, border-box);
    color: #fff;
  }
  .name {
    font-size: 18px;
    font-weight: bold;
  }
  .id {
    margin-top: 60px;
    font-size: 30px;
  }
}
.boc {
  background-color: #a41d27;
}
.ccb {
  background-color: #0c4f9e;
}
</style>

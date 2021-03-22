<template>
  <div class="bankAdd-wrap">
    <BackHeader />
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="开户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.phone" placeholder="预留手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="button-vcode">获取验证码</button>
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-black"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <p class="tip">本页面仅供展示</p>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";

export default {
  name: "BankAdd",
  components: {
    BackHeader
  },
  data() {
    return {
      form: {
        name: "",
        phone: "",
        code: ""
      }
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
.button-black {
  width: 100%;
}
</style>

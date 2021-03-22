<template>
  <el-form-item
    prop="email"
    class="login-form-item"
    label="邮箱"
    :rules="rules"
  >
    <el-input
      id="email"
      type="email"
      autocomplete="off"
      v-model="email"
      v-on:input="enterInput"
    ></el-input>
  </el-form-item>
</template>

<script>
import { emailRule } from "@/utils/validate";

export default {
  name: "UsernameComp",
  watch: {
    value: {
      handler(newValue) {
        this.email = newValue;
      }
    }
  },
  data() {
    return {
      rules: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error("邮箱不能为空"));
            } else if (emailRule(value)) {
              return callback(new Error("邮箱格式有误"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ],
      email: ""
    };
  },
  methods: {
    enterInput(value) {
      this.$emit("update:value", value);
    },
    init(data) {
      this.email = data;
    }
  }
};
</script>

<style lang="scss" scoped></style>

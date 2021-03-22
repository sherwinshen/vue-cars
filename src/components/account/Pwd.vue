<template>
  <el-form-item
    :prop="prop"
    class="login-form-item"
    :label="label"
    :rules="isRepeat ? repeatRules : rules"
  >
    <el-input
      type="password"
      v-model="password"
      autocomplete="off"
      v-on:input="enterInput"
    ></el-input>
  </el-form-item>
</template>

<script>
import { passwordRule } from "@/utils/validate";

export default {
  name: "Pwd",
  props: {
    label: {
      type: String,
      default: "密码"
    },
    prop: {
      type: String,
      default: "password"
    },
    cur_password: {
      type: String,
      default: ""
    },
    isRepeat: {
      type: Boolean,
      default: false
    },
    curPassword: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      password: "",
      rules: [
        {
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请输入密码"));
            } else if (passwordRule(value)) {
              return callback(new Error("密码为6至20位的数字和字母"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ],
      repeatRules: [
        {
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请再次输入密码"));
            } else if (value !== this.curPassword) {
              callback(new Error("与密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    };
  },
  methods: {
    enterInput(value) {
      this.$emit("update:value", value);
    },
    init(data) {
      this.password = data;
    }
  }
};
</script>

<style lang="scss" scoped></style>

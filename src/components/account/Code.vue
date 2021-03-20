<template>
  <el-form-item
    prop="code"
    :rules="rules"
    class="login-form-item"
    label="验证码"
  >
    <el-row :gutter="10" style="display: inline-block; width: 100%;">
      <el-col :span="14" style="padding-left: 0;">
        <el-input
          id="code"
          type="text"
          v-model="code"
          autocomplete="off"
          minlength="6"
          maxlength="6"
          v-on:input="enterInput"
        ></el-input>
      </el-col>
      <el-col :span="10" style="padding-right: 0;">
        <el-button
          class="block"
          type="success"
          @click="getSms()"
          :disabled="codeButton.disabled"
          >{{ codeButton.text }}
        </el-button>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script>
import { codeRule, emailRule } from "@/utils/validate";
import { GetCode } from "@/api/login";

export default {
  name: "Code",
  props: {
    email: {
      type: String,
      default: ""
    },
    module: {
      type: String,
      default: "login"
    }
  },
  data() {
    return {
      code: "",
      codeButton: {
        text: "获取验证码",
        disabled: false
      },
      rules: [
        {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback(new Error("请输入验证码"));
            } else if (codeRule(value)) {
              return callback(new Error("验证码为6位的数字或字母"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ],
      timer: null
    };
  },
  methods: {
    enterInput(value) {
      this.$emit("update:value", value);
    },
    // 验证码按钮属性更新
    updateCodeBtn(params) {
      this.codeButton = params;
    },
    // 获取验证码
    getSms() {
      // 先验证邮箱是否填写和是否有效
      if (this.email === "") {
        this.$message.error("邮箱不能为空");
        return false;
      } else if (emailRule(this.email)) {
        this.$message.error("邮箱格式有误");
        return false;
      }
      //禁用按钮并显示发送中
      this.updateCodeBtn({
        text: "发送中",
        disabled: true
      });
      // 获取验证码
      let requestData = {
        username: this.email,
        module: this.module
      };
      GetCode(requestData)
        .then(response => {
          const msg = response.data.message;
          const cur_code = msg.split("：")[1];
          this.code = cur_code;
          this.$emit("update:value", cur_code);
          // 启用登录按钮
          this.$emit("callback", {
            funcName: "enabledLoginBtn"
          });
          // 倒计时60s
          this.countdown(60);
        })
        .catch(() => {
          this.updateCodeBtn({
            text: "获取验证码",
            disabled: false
          });
        });
    },
    // 倒计时
    countdown(num) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      let i = num;
      this.timer = setInterval(() => {
        if (i > 0) {
          i--;
          this.codeButton.text = `倒计时${i}秒`;
        } else {
          clearInterval(this.timer);
          this.updateCodeBtn({
            disabled: false,
            text: "重新获取"
          });
        }
      }, 1000);
    }
    // // 清除倒计时
    // clearCountDown() {
    //   this.updateCodeBtn({
    //     status: false,
    //     text: "获取验证码"
    //   });
    //   clearInterval(this.timer);
    // }
  }
};
</script>

<style lang="scss" scoped></style>

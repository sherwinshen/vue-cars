<template>
  <div class="login-wrap">
    <BackHeader>
      <template v-slot:headerRight>
        <router-link to="/login" class="color-white opacity-4"
          >登录</router-link
        >
      </template>
    </BackHeader>
    <div class="form-wrap">
      <el-form class="form-content" ref="form" :model="form" size="medium">
        <Username :value.sync="form.email" />
        <Pwd :value.sync="form.password" />
        <Pwd
          prop="passwordRepeat"
          :value.sync="form.passwordRepeat"
          label="确认密码"
          :is-repeat="true"
          :cur-password="form.password"
        />
        <Code
          :value.sync="form.code"
          :email="form.email"
          :module="'forget'"
          @callback="callback"
        />
        <el-form-item>
          <el-button
            class="block login-btn"
            type="danger"
            @click="submitForm('form')"
            :disabled="loginButton.disabled"
            >确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import Username from "@/components/account/Username";
import Pwd from "@/components/account/Pwd";
import Code from "@/components/account/Code";
import { Forget } from "@/api/account";
import sha1 from "js-sha1";

export default {
  name: "Forget",
  components: { BackHeader, Username, Pwd, Code },
  data() {
    return {
      form: {
        email: "",
        password: "",
        passwordRepeat: "",
        code: ""
      },
      loginButton: {
        disabled: true
      }
    };
  },
  methods: {
    // 公共回调
    callback(params) {
      if (params.funcName) {
        this[params.funcName](params.data);
      }
    },
    // 启用loginBtn
    enabledLoginBtn() {
      this.$set(this.loginButton, "disabled", false);
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.forgetPassword();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    forgetPassword() {
      const requestData = {
        username: this.form.username,
        password: sha1(this.form.password),
        code: this.form.code
      };
      Forget(requestData).then(() => {
        this.$router.push({
          name: "Login"
        });
      });
    }
  }
};
</script>

<style lang="scss">
.login-wrap {
  height: 100vh;
  padding: 0 20px;
  position: relative;
}

.form-wrap {
  position: absolute;
  left: 50%;
  top: 100px;
  text-align: center;
  @include webkit(transform, translateX(-50%));
}

.form-title {
  display: inline-block;
  text-align: center;
  position: relative;
  margin-bottom: 30px;

  li {
    display: inline-block;
    height: 30px;
    width: 80px;
    margin: 0 10px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    line-height: 30px;
  }

  .active-tab {
    @include webkit(transition, all 0.3s ease 0s);
  }

  .login-active {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    height: 30px;
    width: 80px;
    border-radius: 5px;
  }

  .register-active {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100px;
    background-color: rgba(0, 0, 0, 0.1);
    height: 30px;
    width: 80px;
    border-radius: 5px;
  }
}

.form-content {
  width: 300px;

  .login-form-item {
    margin-bottom: 12px;
  }

  .block {
    display: block;
    width: 100%;
  }

  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
  }

  .el-form-item__label {
    color: #fff;
  }

  input {
    display: inline-block;
    width: 100%;
  }

  .login-btn {
    margin-top: 20px;
  }
}
</style>

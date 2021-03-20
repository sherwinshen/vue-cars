<template>
  <div class="login-wrap">
    <BackHeader>
      <template v-slot:headerRight>
        <router-link to="/register" class="color-white opacity-4"
          >注册</router-link
        >
      </template>
    </BackHeader>
    <div class="form-wrap">
      <el-form class="form-content" ref="form" :model="form" size="medium">
        <Username :value.sync="form.email" />
        <Pwd :value.sync="form.password" />
        <Code
          :value.sync="form.code"
          :email="form.email"
          module="login"
          @callback="callback"
        />
        <el-form-item>
          <el-button
            class="block login-btn"
            type="danger"
            @click="submitForm('form')"
            :disabled="loginButton.disabled"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="text-right">
        <router-link to="/forget" class="color-white opacity-4"
          >忘记密码</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/BackHeader";
import Username from "@/components/account/Username";
import Pwd from "@/components/account/Pwd";
import Code from "@/components/account/Code";
import sha1 from "js-sha1";

export default {
  name: "Login",
  components: { Code, BackHeader, Username, Pwd },
  data() {
    return {
      form: {
        email: "sw1@qq.com",
        password: "sw1234",
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
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录
    login() {
      let requestData = {
        username: this.form.email,
        password: sha1(this.form.password),
        code: this.form.code
      };
      this.$store
        .dispatch("login/accountLogin", requestData)
        .then(() => {
          // 页面跳转
          this.$router.push({ name: "User" });
        })
        .catch(() => {
          console.log("登录失败");
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

<template>
  <div class="login-box">
    <img
      class="logo"
      src="../../assets/images/login-inner-box-bg-img.png"
      alt
    />

    <div class="login-inner-box">
      <div class="right">
        <div class="inner-form">
          <el-form
            :model="loginForm"
            status-icon
            ref="loginForm"
            class="demo-loginForm"
            :rules="rules"
          >
            <el-form-item prop="userName">
              <el-input
                prefix-icon="iconfont icon-icon-user"
                type="text"
                v-model="loginForm.userName"
                autocomplete="off"
                size="medium"
                clearable
                placeholder="账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="iconfont icon-pwd"
                v-model="loginForm.password"
                autocomplete="off"
                clearable
                size="medium"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" class="code-box">
              <el-input
                prefix-icon="iconfont icon-vertify"
                v-model="loginForm.verificationCode"
                autocomplete="off"
                clearable
                size="medium"
                placeholder="验证码"
              ></el-input>
              <div class="img-box">
                <img :src="codeImg" alt="图片加载失败" @click="getKaptcha" />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userSubmitForm('loginForm')"
                >登录</el-button
              >
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-checkbox v-model="loginForm.checked">记住密码</el-checkbox>
              </el-col>
              <el-col :span="12">
                <router-link to="/forget">忘记密码?</router-link>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>

    <div class="footer">
      <!-- <div class="img-box">
        <img src="../../assets/images/登录页联合logo.svg" alt />
      </div> -->
      <div class="copy-right">
        Copyright © 成都红星数字科技有限公司 版权所有
      </div>
    </div>
  </div>
</template>

<script>
import { login, baseLine } from "@/api/api";
import { accountReg, passwordReg } from "@/utils/validator";
import session from "@/utils/session";
import local from "@/utils/local";
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      loginForm: {
        password: "",
        userName: "",
        checked: false,
        verificationCode: "",
      },
      rules: {
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        userName: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      codeImg: "",
      uid: "",
    };
  },
  created() {
    if (session.get("shenji-2020-system")) {
      this.$router.push("/home");
    }
    this.getKaptcha();
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    async getPer() {
      let res = await baseLine.menuNav();
      if (res.code === 200) {
        session.save("permission", res.permissions);
        this.$router.push("/home");
      }
    },
    userSubmitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = {
            authName: this.loginForm.userName,
            authAccessToken: this.loginForm.password,
            verifyCode: this.loginForm.verificationCode,
            uid: this.uid,
          };
          let res = await login.login(params);
          if (res === undefined) {
            this.getKaptcha();
            this.loginForm.verificationCode = "";
          }
          if (res.code === 200) {
            // res = res.data;
            //   保存token
            session.save("shenji-2020-system", res.data);
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getPer();
            //记住密码
            if (this.loginForm.checked) {
              let userName = this.loginForm.userName,
                password = this.loginForm.password,
                checked = this.loginForm.checked;
              //传入账号，密码，保存天数
              this.setCookie(userName, password, checked, 30);
            } else {
              //清空Cookie
              this.clearCookie();
            }
            // this.$router.push("/home");
            local.save("currentIndex", "/home");
          } else if (res.code === 500) {
            this.getKaptcha();
            this.loginForm.verificationCode = "";
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //设置cookie
    setCookie(user, password, checked, days) {
      var text = CryptoJS.AES.encrypt(password, "shenji 2020 web"); //使用CryptoJS方法加密
      var saveDays = new Date();
      saveDays.setTime(saveDays.getTime() + 24 * 60 * 60 * 1000 * days); //保存的天数
      //字符串拼接存入cookie
      window.document.cookie = `user=${user};path=/;expires=${saveDays.toGMTString()}`;
      window.document.cookie = `password=${text};path=/;expires=${saveDays.toGMTString()}`;
      window.document.cookie = `checked=${checked};path=/;expires=${saveDays.toGMTString()}`;
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //这里会切割出以user为第0项的数组、以password为第0项的数组，判断查找相对应的值
          if (arr2[0] == "user") {
            this.loginForm.userName = arr2[1]; //拿到账号
          } else if (arr2[0] == "password") {
            //拿到拿到加密后的密码arr2[1]并解密
            var bytes = CryptoJS.AES.decrypt(
              arr2[1].toString(),
              "shenji 2020 web"
            );
            var plaintext = bytes.toString(CryptoJS.enc.Utf8); //拿到解密后的密码（登录时输入的密码）
            this.loginForm.password = plaintext;
          } else if (arr2[0] == "checked") {
            this.loginForm.checked = Boolean(arr2[1]); //拿到勾选状态
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //账号密码置空，天数置0
    },
    async getKaptcha() {
      let res = await login.captcha();
      if (res.code === 200) {
        this.codeImg = `data:image/jpg;base64,${res.captcha}`;
        this.uid = res.uid;
      }
    },
  },
};
</script>

<style lang="less">
@import "./login.less";
</style>
<template>
  <div>
    <el-dialog title="重置密码" :visible.sync="dialogFormVisible" width="40%" @close='$emit("update:dialogVisible",false);'>
      <el-form :model="passwordForm" :rules="rules" label-width="120px" ref="passwordForm">
        <el-form-item prop="authAccessToken" label="旧密码">
          <el-input v-model="passwordForm.authAccessToken" size="small" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="newAuthAccessToken" label="新密码">
          <el-input
            type="password"
            v-model="passwordForm.newAuthAccessToken"
            auto-complete="new-password"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="再次输入新密码">
          <el-input
            type="password"
            v-model="passwordForm.checkPass"
            size="small"
            auto-complete="new-password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="passWordSubmit('passwordForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { telReg, passwordReg } from "@/utils/validator";
import { commonApi } from "@/api/api";
import session from "@/utils/session";
export default {
  props: ["dialogVisible"],
  data() {
    // 密码验证
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空")); //输出错误提示
      } else if (!passwordReg(value)) {
        callback(new Error("密码长度在6-30之间")); //输出错误提示
      } else if (value === this.passwordForm.authAccessToken) {
        callback(new Error("新密码不能和原密码一致")); //输出错误提示
      } else {
        if (this.passwordForm.checkPass) {
          this.$refs.passwordForm.validateField("checkPass");
        }
        callback(); //成功回调
      }
    };
    // 确认密码验证
    const validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空")); //输出错误提示
      } else if (value !== this.passwordForm.newAuthAccessToken) {
        callback(new Error("两次输入不一致")); //输出错误提示
      } else {
        callback(); //成功回调
      }
    };
    return {
      rules: {
        // 旧密码验证
        authAccessToken: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        // 密码验证
        newAuthAccessToken: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        // 确认密码验证
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: "blur" },
        ],
      },
      passwordForm: {
        authAccessToken: "",
        newAuthAccessToken: "",
        checkPass: "",
      },
      dialogFormVisible: this.dialogVisible,
    };
  },
  methods: {
    passWordSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = {
            authAccessToken: this.passwordForm.authAccessToken,
            newAuthAccessToken: this.passwordForm.newAuthAccessToken,
          };
          let res = await commonApi.userPassword(params);
          if (res.code === 200) {
            // 清除存储
            // local.remove("tianfuyun-2019-system");
            session.clear();
            window.location.reload();
            // this.dialogFormVisible=false;
            // 跳转路由
            setTimeout(() => {
              this.$router.push({ name: "login" });
              this.$message({
                type: "warning",
                message: "请重新登录",
              });
            }, 500);
          } else {
            return false;
          }
        }
      });
    },
  },
  watch:{
    dialogVisible(val){
      this.dialogFormVisible=val;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
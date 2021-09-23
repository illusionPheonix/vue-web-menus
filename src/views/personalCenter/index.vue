<template>
  <div class="common-list-style">
    <el-form
      :model="userinfo"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      style="width:40%"
      class="demo-ruleForm"
    >
      <el-form-item label="所属公司">
        <el-input v-model="userinfo.companyName" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userinfo.fullName" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userinfo.mobile"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="userinfo.authName" disabled></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm">修改密码</el-button>
      </el-form-item>
    </el-form>
    <forgetPwd :dialogVisible.sync="dialogVisible"/>
  </div>
</template>

<script>
import { commonApi } from "@/api/api";
import { telReg } from "@/utils/validator";
import forgetPwd from "@/components/forgetPwd";
export default {
  components: {
    forgetPwd,
  },
  data() {
    // 电话号码验证
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!telReg(value)) {
        callback(new Error("电话号码不合法"));
      } else {
        callback(); //成功回调
      }
    };
    return {
      ruleForm: {
        mobile: "",
      },
      rules: {
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }],
      },
      dialogVisible: false,
    };
  },
  methods: {
    //   关闭弹框
    closeDialog(){
        this.dialogVisible=false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = {
            mobile: this.userinfo.mobile,
          };
          let res = await commonApi.userUpdate(params);
          if (res.code === 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.dialogVisible = true;
    },
  },
  computed: {
    userinfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
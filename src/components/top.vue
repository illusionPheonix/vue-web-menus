<template>
  <div class="top">
    <!-- 分栏 -->
    <el-row :gutter="20">
      <!-- 标题 -->
      <el-col :span="20">
        <h3>
          <span :class="iconClass" @click="toggleCollapse"></span>
        </h3>
        <div
          class="tag"
          :class="{'active':index===currentIndex}"
          v-for="(item,index) in menus"
          :key="index"
          @click="tagClickEvent(index,item)"
        >{{item.name}}</div>
      </el-col>
      <!-- 头像&设置 -->
      <el-col :span="4" class="user-info">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="avatarUrl" alt />
        </div>
        <el-dropdown @command="handleCommand" placement="top">
          <span class="el-dropdown-link">
            <span class="userBox">{{userInfo?userInfo.authName:''}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-col :span="12">
           
        </el-col>-->
        <!-- 下拉菜单 -->
        <!-- <el-col :span="12">
           
        </el-col>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入local
import session from "@/utils/session";
// import {} from "@/api/api";
export default {
  data() {
    return {
      avatarUrl: require("./img_head.png"),
      user: "",
      iconClass: "el-icon-s-fold",
      currentIndex: 0,
      topMenu: ["采购审计", "系统管理"],
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    tagClickEvent(index, item) {
      this.currentIndex = index;
      this.$store.commit({
        type: "getCurrentTopMenu",
        data: item.menuId,
      });
    },
    toggleCollapse() {
      this.iconClass =
        this.iconClass === "el-icon-s-fold"
          ? "el-icon-s-unfold"
          : "el-icon-s-fold";
      this.$store.commit("toggleCollapse");
    },
    // 下拉菜单
    handleCommand(command) {
      // 判断点击的是哪个框
      // 个人中心
      if (command === "personalCenter") {
        // 跳转路由
        this.$router.push({
          name: "personalCenter",
        });
      } else if (command === "logout") {
        //退出登录
        session.clear();
        window.localStorage.clear();
        this.$message({
          type: "success",
          message: "退出成功",
          duration: 200,
        });
        window.location.reload();
        this.$store.commit("clearMenuList");
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    },
    // 获取用户信息
    fetchUserInfo() {
      if(!this.userInfo||JSON.stringify(this.userInfo)==='{}'){
        this.$store.dispatch("getUserInfo");
      }
    },
  },
  computed: {
    menus() {
      return this.$store.state.menuList;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  line-height: 60px;
  background-color: #fff;
  .el-row {
    display: flex;
    align-items: center;
    .el-col {
      text-align: left;
      padding: 0 !important;
      overflow: hidden;
      height: 100%;
      display: flex;
      .user-info {
        display: flex;
        align-items: center;
        padding: 10px !important;
        text-align: right;
        // justify-content: end;
        .avatar {
          margin-right: 10px;
        }
      }
      .tag {
        padding: 0 20px;
        color: #909399;
        cursor: pointer;
      }
      .active {
        color: #333;
        &::after {
          content: "";
          display: block;
          width: 64px;
          height: 2px;
          background: rgba(72, 153, 250, 1);
        }
      }
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
      .userBox {
        display: inline-block;
        overflow: hidden;
        max-width: 60px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      h3 {
        font-size: 20px;
        text-align: left;
        font-weight: bold;
        border-right: 1px solid #f2f6fc;
        padding-right: 10px;
        margin-right: 20px;

        span {
          margin-right: 10px;
          cursor: pointer;
        }
      }

      .avatar {
        width: 40px;
        height: 40px;
        text-align: right;
        margin-right: 10px;
        margin: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 3px 0;
        margin-right: 10px;
      }

      .el-dropdown {
        .el-dropdown-link {
          cursor: pointer;
          color: #32446e;
        }

        cursor: pointer;
      }

      .el-icon-s-fold,
      .el-icon-s-unfold {
        color: #c0c4cc;
        padding-left: 10px;
      }
    }
  }
}
</style>



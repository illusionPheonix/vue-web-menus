<template>
  <div class="asideNav">
    <!-- logo -->
    <div class="logo">
      <img v-if="!isCollapse" src="./LOGO.png" alt />
      <span>红星慧审</span>
    </div>
    <!-- 导航目录 -->
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#666"
      active-text-color="#4899FA"
      router
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      @select="selectEvent"
      :default-openeds="currentPath"
    >
      <!-- 子菜单模板 -->
      <el-submenu :index="(index+1)+''" v-for="(menu,index) in menus" :key="index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item :index="submenu.url" v-for="(submenu,i) in menu.children" :key="i">
          <span>{{submenu.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { baseLine } from "@/api/api";
import session from "@/utils/session";
export default {
  data() {
    return {
      leftImg: "",
      logo: "",
      currentPath: [],
      currentIndex: "",
      // menus: [
      //   {
      //     icon: "",
      //     name: "供应商管理",
      //     children: [
      //       {
      //         url: "/supplyManage/supply",
      //         name: "供应商管理",
      //       },
      //     ],
      //   },
      //   {
      //     icon: "",
      //     name: "采购设置",
      //     children: [
      //       {
      //         url: "/basedataManage/basedata",
      //         name: "基本信息设置",
      //       },
      //     ],
      //   },
      //   {
      //     icon: "",
      //     name: "组织管理",
      //     children: [
      //       {
      //         url: "/system/company",
      //         name: "公司管理",
      //       },
      //       {
      //         url: "/system/department",
      //         name: "成员与部门",
      //       },
      //       {
      //         url: "/system/approvalRole",
      //         name: "审批角色",
      //       },
      //     ],
      //   },
      //   {
      //     icon: "",
      //     name: "权限管理",
      //     children: [
      //       {
      //         url: "/system/role",
      //         name: "角色管理",
      //       },
      //       {
      //         url: "/system/user",
      //         name: "用户",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    // 点击菜单事件
    selectEvent(a, b) {
      this.currentIndex = a;
      session.save("currentIndex", a);
      this.$store.commit({
        type: "setRouteName",
        data: a,
      });
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    routeName() {
      return this.$store.state.routeName;
    },
    menus() {
      return this.$store.state.currentTopMenu;
    },
  },
  watch: {
    routeName(val, oldVal) {
      this.currentIndex = val;
    },
  },
  created() {
    this.currentIndex = session.get("currentIndex");
    if (!this.menus||this.menus.length === 0) {
      this.$store.dispatch("getMenuTree");
    }
  },
};
</script>

<style lang="less">
.asideNav {
  text-align: left;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .logo {
    margin-bottom: 30px;
    margin-right: 20px;
    margin-left: 20px;
    padding: 18px;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    color: #4899fa;
    border-bottom: 1px solid #f2f6fc;
    img {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }

  .el-menu {
    border-right: none;
    background: none;

    i {
      display: inline-block;
      width: 16px;
      height: 16px;
      color: #666;
      margin-right: 5px;
    }
    .system {
      background: url("../assets/images/defaultAsideIcon/system.svg") no-repeat
        center/cover;
    }
    .setting {
      background: url("../assets/images/defaultAsideIcon/system.svg") no-repeat
        center/cover;
    }
    .authority {
      background: url("../assets/images/defaultAsideIcon/authority.svg")
        no-repeat center/cover;
    }
    .diagram {
      background: url("../assets/images/defaultAsideIcon/diagram.svg") no-repeat
        center/cover;
    }
    .journal {
      background: url("../assets/images/defaultAsideIcon/journal.svg") no-repeat
        center/cover;
    }
    .supplier {
      background: url("../assets/images/defaultAsideIcon/supplier.svg")
        no-repeat center/cover;
    }
    .organization {
      background: url("../assets/images/defaultAsideIcon/organization.svg")
        no-repeat center/cover;
    }
    .purchase {
      background: url("../assets/images/defaultAsideIcon/purchase.svg")
        no-repeat center/cover;
    }

    .svg-icon {
      color: #fff;
    }

    .el-submenu__title {
      &:hover {
        // background: rgba(72, 153, 250, 1);
        // opacity: 0.04;
        // color: #4899fa !important;
      }
    }

    .el-menu-item {
      &:hover {
        // background: rgba(72, 153, 250, 1);
        // opacity: 0.04;
        // color: #4899fa !important;
      }
    }

    .el-submenu__title {
      height: 54px;
    }

    .el-menu--vertical {
      transition: all 0.3s;
    }
  }
}
</style>

<template>
  <div class="home">
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="asideWidth">
        <navigation></navigation>
      </el-aside>
      <!-- 右侧内容 -->
      <el-container>
        <!-- 头 -->
        <el-header>
          <top ref="top"></top>
        </el-header>
        <!-- 主要内容 -->
        <el-main ref="mainBox" class="scrollBox">
          <!-- 面包屑 -->
          <div class="flex aic">
            <span
              style="cursor:pointer;font-weight:bold"
              class="pbt10"
              v-if="$route.meta.isBack"
              @click="back"
            >返回</span>
            <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{name:$route.meta.routeName}">{{$route.meta.title}}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="$route.meta.subTitle">{{$route.meta.subTitle}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 路由出口 -->
          <div class="mainContent">
            <keep-alive>
              <router-view ref="circle" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from "@/components/top.vue";
import navigation from "@/components/navigation.vue";
import session from "@/utils/session";
export default {
  components: {
    top,
    navigation,
  },

  data() {
    return {};
  },
  created() {
    let currentIndex = this.$route.path;
    if (this.menus) {
      let url = this.menus[0].children[0].url;
      if (currentIndex === '/home') {
        this.$router.push(url);
        this.$store.commit({
          type: "setRouteName",
          data: url,
        });
        session.save("currentIndex", url);
      }
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  computed: {
    asideWidth() {
      return this.$store.state.asideWidth;
    },
    menus() {
      return this.$store.state.currentTopMenu;
    },
  },
  watch: {
    menus(val) {
      // let currentIndex = this.$route.path;
      // let url = val[0].children[0].url;
      // if (currentIndex==='/home') {
      //   this.$router.push(url);
      //   this.$store.commit({
      //     type: "setRouteName",
      //     data: url,
      //   });
      //   session.save("currentIndex", url);
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  // 最外层容器
  .el-container {
    height: 100%;
    // 左侧边栏
    .el-aside {
      background: #fff;
      color: #333;
      text-align: center;
      transition: all 0.3s;
      overflow: hidden;
      overflow-y: auto;
    }
    // 右边容器
    .el-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      // 头部和底部
      .el-header,
      .el-footer {
        background-color: #fff;
        color: #32446e;
        line-height: 60px;
      }
      // .el-header {
      //   border-bottom: 1px solid #ccc;
      // }
      .el-footer {
        border-top: 1px solid #ccc;
      }
      //  核心组件部分
      .el-main {
        background-color: #f6f6f6;
        color: #32446e;
        flex: 1;
        display: flex;
        flex-direction: column;
        .mainContent {
          flex: 1 !important;
        }
      }
    }
  }

  //面包屑
  .bread {
    padding-bottom: 15px;
  }
}
</style>

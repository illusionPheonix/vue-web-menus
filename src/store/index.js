import Vue from 'vue'
import Vuex from 'vuex'
import { login, baseLine, projectApi } from "@/api/api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    asideWidth: "200px",
    routeName: '',
    userInfo: {},
    menuList: [],
    currentTopMenu: null,
    projectId: null,
    alarmObj: {
      projectSupplierAlarmList: [],
    },
  },
  mutations: {
    getCurrentTopMenu(state, data) {
      // state.currentTopMenu = data.data;
      state.currentTopMenu = state.menuList.filter(ele => ele.menuId === data.data);
      state.currentTopMenu = state.currentTopMenu[0].children;
    },
    // 保存预警信息
    setAlarmObj(state, obj) {
      state.alarmObj = obj.data;
    },
    // 清空预警信息
    clearAlarmObj(state) {
      state.alarmObj = {
        projectSupplierAlarmList: [],
      }
      console.log(state.alarmObj );
    },
    toggleCollapse(state, obj) {
      state.isCollapse = !state.isCollapse;
      state.asideWidth = state.isCollapse ? '60px' : '200px';
    },
    setRouteName(state, data) {
      state.routeName = data.data;
    },
    saveUserInfo(state, data) {
      state.userInfo = data.data;
    },
    saveMenuList(state, data) {
      state.menuList = data.data;
      if (state.menuList.length > 0) {
        state.currentTopMenu = state.menuList[0].children;
      }
    },
    clearMenuList(state) {
      state.menuList = [];
      state.currentTopMenu = null;
    },

    /* 保存项目id */
    saveProjectId(state, data) {
      state.projectId = data
    },
  },
  actions: {
    async getUserInfo(context) {
      let res = await login.userInfo();
      if (res.code === 200) {
        context.commit({
          type: 'saveUserInfo',
          data: res.data
        })
      }
    },
    async getMenuTree(context) {
      let res = await baseLine.menuNav();
      if (res.code === 200) {
        context.commit({
          type: 'saveMenuList',
          data: res.menuList
        })
      }
    },
  
    // 获取预警信息
    async getAlarmData(context, data) {
      // let id = session.get("projectId");
      console.log(data);
      let res = await projectApi.getProjectAlarm(data.id);
      if (res.code === 200) {
        context.commit({
          type: 'setAlarmObj',
          data: res.data
        })
      }
    }
  },
  modules: {
  }
})

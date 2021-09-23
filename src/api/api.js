//api.js
import { getData, postData, upload, downloadFile } from './axios';

export const commonApi = {
  //采购方式或者采购类别的列表  1采购方式 2采购类别
  getDictInfo(params) {
    return getData('/sys/dict/getDictInfo', params)
  },

  //权限树
  authorityTree(params) {
    return getData('/sys/user/authorityTree', params)
  },

  //批量文件上传
  fileUpload(params) {
    return postData('/common/file/upload', params)
  },

  //文件下载
  downloadFile(url, params) {
    return downloadFile(url, params)
  },
  // 系统操作日志-分页
  logPage(params) {
    return getData('/sys/log/page', params)
  },
  // 个人中心-修改用户信息
  userUpdate(params) {
    return postData('/sys/user/i/update', params)
  },
  // 个人中心-重置密码
  userPassword(params) {
    return postData('/sys/user/password', params)
  },
}


/* 登录页面 */
export const login = {
  captcha() {
    return getData('/system/captcha')
  },
  // 登录
  login(data) {
    return postData('/system/login', data)
  },
  // 当前登录用户信息
  userInfo() {
    return getData('/sys/user/info')
  },
  // 忘记密码获取验证码
  getVerificationCode(params) {
    return postData('/system/getVerificationCode', params)
  },
  // 忘记密码验证
  checkVerificationCode(params) {
    return postData('/system/checkVerificationCode', params)
  },
  // 忘记密码修改密码
  updatePassword(params) {
    return postData('/system/updatePassword', params)
  },
}


/* 登录页面 */
export const register = {
  userLogin(params) {
    return postData('/system/login', params)
  }
}

/*基础模块 */
export const baseLine = {
  menuTree() {
    return getData('/sys/menu/tree')
  },
  menuNav() {
    return getData('/sys/menu/nav')
  }
}

/*公司*/
export const companyApi = {
  companyTree(params) {
    return getData('/sys/company/tree', params)
  },
  companySave(params) {
    return postData('/sys/company/save', params)
  },
  companyUpdate(params) {
    return postData('/sys/company/update', params)
  },
  companyDelete(id) {
    return postData(`/sys/company/delete/${id}`)
  },
  companyResetPassword(authName) {
    return postData(`/sys/company/resetPassword/${authName}`)
  },
  companyInfo(id) {
    return getData(`/sys/company/info/${id}`)
  }
}
/*部门*/
export const departmentApi = {
  deptTree(params) {
    return getData('/sys/dept/tree', params)
  },
  deptSave(params) {
    return postData('/sys/dept/save', params)
  },
  deptUpdate(params) {
    return postData('/sys/dept/update', params)
  },
  deptDelete(id) {
    return postData(`/sys/dept/delete/${id}`)
  }
}
/*成员*/
export const deptUserApi = {
  queryUserList(params) {
    return getData('/sys/dept/queryUserList', params)
  },
  deptSaveUser(params) {
    return postData('/sys/dept/saveUser', params)
  },
  deptUpdateUser(params) {
    return postData('/sys/dept/updateUser', params)
  },
  deptUserDelete(id) {
    return postData(`/sys/auditRole/deleteUser/${id}`)
  },
  userDelete(id) {
    return postData(`/sys/dept/deleteUser/${id}`)
  },
  userStatus(id) {
    return postData(`/sys/dept/update/${id}/userStatus`)
  },
  deptUserInfo(id) {
    return getData(`/sys/dept/userInfo/${id}`)
  },
  importUser(params) {
    return upload(`/sys/dept/importUser`, params)
  },
}
/*审批角色*/
export const auditRoleApi = {
  auditRoleList(id) {
    return getData(`/sys/auditRole/list/${id}`)
  },
  auditRoleSave(params) {
    return postData('/sys/auditRole/save', params)
  },
  auditRoleUpdate(params) {
    return postData('/sys/auditRole/update', params)
  },
  auditRoleDelete(id) {
    return postData(`/sys/auditRole/delete/${id}`)
  },
  saveUser(params) {
    return postData(`/sys/auditRole/saveUser`, params)
  },
  deleteUser(id) {
    return postData(`/sys/auditRole/deleteUser/${id}`)
  },
  queryUserList(params) {
    return getData(`sys/auditRole/queryUserList`, params)
  },
  choseUser(params) {
    return getData(`sys/auditRole/queryAuditRoleUserPage`, params)
  },
  saveAuditUser(params) {
    return postData(`sys/auditRole/saveUser`, params)
  },
}
/*角色*/
export const roleApi = {
  rolePage(params) {
    return getData('/sys/role/page', params)
  },
  roleList() {
    return getData('/sys/role/list')
  },
  rolesave(params) {
    return postData('/sys/role/save', params)
  },
  roleUpdate(params) {
    return postData('/sys/role/update', params)
  },
  roleInfo(id) {
    return getData(`/sys/role/info/${id}`)
  },
  roleDelete(params) {
    return postData(`/sys/role/delete`, params)
  }
}
/*用户*/
export const userApi = {
  page(params) {
    return getData('/sys/user/page', params)
  },
  queryUserPageByCompanyId(params) {
    return getData('/sys/user/queryUserPageByCompanyId', params)
  },
  list() {
    return getData('/sys/user/list')
  },
  save(params) {
    return postData('/sys/user/save', params)
  },
  update(params) {
    return postData('/sys/user/update', params)
  },
  info(id) {
    return getData(`/sys/user/info/${id}`)
  },
  delete(id) {
    return postData(`/sys/user/delete/${id}`)
  },
  updateStatus(id) {
    return postData(`/sys/user/update/${id}/status`)
  }
}

/* 供应商模块 */
export const supplyApi = {
  //列表
  list(params) {
    return getData('/nssupplier/page', params)
  },
  //新增
  add(params) {
    return postData('/nssupplier/save', params)
  },
  //编辑
  update(params) {
    return postData('/nssupplier/update', params)
  },
  //删除
  del(id) {
    return postData(`/nssupplier/delete/${id}`)
  },
  //详情
  info(id) {
    return getData(`/nssupplier/info/${id}`)
  },
  //集团供应商列表
  group(params) {
    return getData(`/nssupplier/allpage/`, params)
  },

  //判断公司是否存在当前供应商
  exist(id) {
    return postData(`/nssupplier/isExist/${id}`)
  },
  //加入公司供应商库
  copy(id) {
    return postData(`/nssupplier/copy/${id}`)
  },
  //覆盖公司供应商库
  change(id) {
    return postData(`/nssupplier/change/${id}`)
  },
}

// 项目
export const projectApi = {
  // 发出整改
  reformSave(params) {
    return postData(`project/reform/save`, params)
  },
  // 导出的接口
  prjEnterTimeExport(params) {
    return downloadFile(`/project/prjEnterTimeExport`,params)
  },

  // 项目采购报告
  report(params) {
    return getData(`/project/getPurchaseReportPage`, params)
  },
  // 导出的接口
  prjReformExport() {
    return downloadFile(`/project/reform/prjReformExport`)
  },
  // 项目采购整改
  reformPageNew(params) {
    return getData(`/project/reform/pageNew`, params)
  },
  // 汇总信息-内审
  collectInfo(projectId) {
    return getData(`/project/collectInfo/${projectId}`)
  },
  //项目供应商-详情使用
  getDetailList(projectId) {
    return getData(`/project/supplier/getDetailList/${projectId}`)
  },
  // 获取详情预警信息
  getProjectAlarm(projectId) {
    return getData(`/project/getProjectAlarm/${projectId}`)
  },
  // 采购整改/修改列表-分页
  reformPage(params) {
    return getData(`/project/reform/page`, params)
  },
  // 采购整改/修改列表-分页
  getPurchaseTypePhase(id) {
    return getData(`/project/getPurchaseTypePhase/${id}`)
  },
  // 处理修改/整改
  handleReform(params) {
    return postData(`/project/reform/handleReform`, params)
  },
  // 操作(项目制度)日志-分页
  baseeventPage(params) {
    return getData(`/baseevent/page`, params)
  },
  // 采购项目文件列表-分页
  getAllFile(params) {
    return getData(`/project/getAllFile`, params)
  },
  //完成阶段详情
  finishInfo(projectId) {
    return getData(`/project/settle/list/${projectId}`)
  },
  getQuotedType(projectId) {
    return getData(`/project/org/getQuotedType/${projectId}`)
  },
  // 供应商列表
  supplierList(projectId, isWin = 0) {
    return getData(`/project/supplier/list/${projectId}/${isWin}`)
  },
  // 实施阶段评审情况-详情
  reviewInfo(projectId) {
    return getData(`/project/review/info/${projectId}`)
  },
  // 实施阶段评审小组-详情
  reviewTeamInfo(projectId) {
    return getData(`/project/reviewTeam/list/${projectId}`)
  },
  // 实施阶段合同签订-详情
  contractInfo(projectId) {
    return getData(`/project/contract/list/${projectId}`)
  },
  // 第三步保存
  supplierSaveOrUpdate(params) {
    return postData(`/project/supplier/saveOrUpdate`, params)
  },
  // 第四部保存
  reviewTeamSaveOrUpdate(params) {
    return postData(`/project/reviewTeam/saveOrUpdate`, params)
  },
  // 第五步保存
  projectReviewSave(params) {
    return postData(`/project/review/save`, params)
  },
  // 第五步修改
  projectReviewUpdate(params) {
    return postData(`/project/review/update`, params)
  },
  // 合同签订保存
  contractSave(params) {
    return postData(`/project/contract/save`, params)
  },
  // 合同签订修改
  contractUpdate(params) {
    return postData(`/project/contract/update`, params)
  },
  // 完成阶段保存
  settleSave(params) {
    return postData(`/project/settle/save`, params)
  },
  //  完成阶段修改
  settleUpdate(params) {
    return postData(`/project/settle/update`, params)
  },
  //  完成阶段详情
  settleList(id) {
    return getData(`/project/settle/list/${id}`)
  },
  //详情第1步
  oneInfo(id) {
    return getData(`/project/info/${id}`)
  },

  //保存第1步
  saveOne(params) {
    return postData(`/project/save`, params)
  },

  //修改第1步
  updateOne(params) {
    return postData(`/project/update`, params)
  },

  //详情第2步
  twoInfo(id) {
    return getData(`/project/org/info/${id}`)
  },
  //保存第2步
  saveTwo(params) {
    return postData(`/project/org/save`, params)
  },
  //修改第2步
  updateTwo(params) {
    return postData(`/project/org/update`, params)
  },
  //列表
  list(params) {
    return getData(`/project/page`, params)
  },
  //列表 - 内审
  auditList(params) {
    return getData(`/project/auditPage`, params)
  },


  //项目维护人列表
  miantainerList(params) {
    return getData(`/project/maintainer/queryUserPage`, params)
  },
  //新增项目维护人
  saveMaintain(params) {
    return postData(`/project/maintainer/save`, params)
  },
  //删除项目维护人
  delMaintain(projectId, maintainerId) {
    return postData(`/project/maintainer/delete/${projectId}/${maintainerId}`)
  },
  //删除项目
  delProject(projectId) {
    return postData(`/project/delete/${projectId}`)
  },
  // 获取项目阶段
  getProjectPhase(id) {
    return getData(`/project/getProjectPhase/${id}`)
  },

}

/* 采购基本信息模块 */
export const baseApi = {
  //列表
  list(params) {
    return getData(`/sys/dict/page`, params)
  },
  //新增
  add(params) {
    return postData(`/sys/dict/save`, params)
  },
  //详情
  info(id) {
    return getData(`/sys/dict/info/${id}`)
  },
  //编辑
  update(params) {
    return postData(`/sys/dict/update`, params)
  },
  //删除
  del(id) {
    return postData(`/sys/dict/delete/${id}`)
  },
}

/* 采购制度模块 */
export const regularApi = {
  //列表
  list(params) {
    return getData(`/nsregulation/page`, params)
  },
  //保存整个制度
  save(params) {
    return postData(`/nsregulation/save`, params)
  },
  //制度-保存采购方式
  saveWay(params) {
    return postData(`/nsregulationtype/saveorupdate`, params)
  },
  //制度-保存审批权限
  saveAuth(params) {
    return postData(`/nsregulationaudit/saveorupdate`, params)
  },
  //制度-保存评审小组
  saveReview(params) {
    return postData(`/nsregulationreview/saveorupdate`, params)
  },
  //制度-保存文件
  saveFile(params) {
    return postData(`/basefiles/saveorupdate`, params)
  },
  //制度操作  0 撤回审核 1 提交审核 2 通过 3 驳回 4 删除
  operate(params) {
    return postData(`/nsregulation/updateStatus`, params)
  },
  //编辑回显
  info(id) {
    return getData(`/nsregulation/info/${id}`)
  },
  //复制采购制度
  copy(id) {
    return postData(`/nsregulation/copy/${id}`)
  },


  //内审列表
  page(params) {
    return getData(`/nsregulation/auditpage`, params)
  },
  //详情
  detail(id) {
    return getData(`/nsregulation/detail/${id}`)
  },
  //   采购日志
  log(params) {
    return getData(`/baseevent/page`, params)
  },
}

/* 项目预警相关 */
export const alarmApi = {
  //单个项目预警
  singleList(params) {
    return getData(`/nsalarm/alarmListPage`, params)
  },
  //tab分类总数 - 项目
  tabCount(id) {
    return getData(`/nsalarmproject/alarmcount/${id}`)
  },
  //tab分类总数 - 整体
  entiretyCount() {
    return getData(`/nsalarmproject/alarmmulcount`)
  },
  //预警 - 项目预警
  alarmList(params) {
    return getData(`/nsalarm/prjAlarmPage`, params)
  },
  //预警 - 项目预警
  newCount(params) {
    return getData(`/nsalarm/prjAlarmCount`, params)
  },
  //预警 - 整体预警
  entiretyList(params) {
    return getData(`/nsalarm/mulAlarmListPage`, params)
  },
  //预警操作 1解除预警 2要求整改 3要求修改 6无法整改
  operate(params) {
    return postData(`/nsalarm/updateHandleStatus`, params)
  },
  //预警操作 1解除预警 2要求整改 3要求修改  - 整体
  entireOperate(params) {
    return postData(`/nsalarm/updateMulHandleStatus`, params)
  },
  //整体预警详情
  entireInfo(params) {
    return getData(`/nsalarmproject/page`, params)
  },
  //新详情
  newDetail(params) {
    return getData(`/project/reform/getReformDetail`, params)
  },
  //整改操作
  reformHandle(params) {
    return postData(`/project/reform/handleReform`, params)
  },
}

/*数据统计*/
export const statisticsApi = {
  //采购项目统计
  purchaseProject(params) {
    return getData(`/statistics/purchase/project`, params)
  },
  //采购方式统计
  purchaseType(params) {
    return getData(`/statistics/purchase/purchaseType`, params)
  },
  //采购类型统计
  purchaseClass(params) {
    return getData(`/statistics/purchase/purchaseClass`, params)
  },
  //采购方式预警分布
  getPtByComAndYear(params) {
    return getData(`/nsalarm/getPtByComAndYear`, params)
  },
  //公司预警数量分布
  getComAlarmByYear(params) {
    return getData(`/nsalarm/getComAlarmByYear`, params)
  },
  //项目预警排行榜
  getAllCompanyAlarmByYear(params) {
    return getData(`/nsalarm/getAllCompanyAlarmByYear`, params)
  },
  //采购方式整改分布
  getPtReformByComAndYear(params) {
    return getData(`/project/reform/getPtReformByComAndYear`, params)
  },
  //公司整改数量分布
  getCompanyReformByYear(params) {
    return getData(`/project/reform/getCompanyReformByYear`, params)
  },
  //项目整改排行榜
  getAllCompanyReformByYear(params) {
    return getData(`/project/reform/getAllCompanyReformByYear`, params)
  },


}
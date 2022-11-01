const getters = {
  token: (state: any) => state.user.token,
  basicData: (state: any) => state.basic.basicData,
  userInfo: (state: any) => state.user.userInfo,
  userNav: (state: any) => state.user.userNav,
  userRoutes: (state: any) => state.user.userRoutes,
  userButtons: (state: any) => state.user.userButtons,
  roles: (state: any) => state.user.roles,
  dataPermissions: (state: any) => state.user.dataPermissions,
  hasManage: (state: any) => state.user.hasManage
}
export default getters
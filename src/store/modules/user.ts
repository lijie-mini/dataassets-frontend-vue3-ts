
import { getToken, setToken, removeToken } from '@/utils/auth';
import { loginIn, logout, getInfo, logSave } from '@/api/login';

const authType = (window as any).config.VUE_APP_AUTH_TYPE || process.env.VUE_APP_AUTH_TYPE;
const casUrl = (window as any).config.VUE_APP_AUTH_TYPE_CAS_URL || process.env.VUE_APP_AUTH_TYPE_CAS_URL;
const frontUrl = (window as any).config.VUE_APP_AUTH_TYPE_FRONT_URL || process.env.VUE_APP_AUTH_TYPE_FRONT_URL;

interface IState {
  userInfo: object,
  token: string | null,
  roles: string[],
  dataPermissions: string[],
  userRoutes: string[],
  userButtons: string[],
  hasManage: boolean
}
interface IUserInfo {
  username: string,
  password: string
}
const user = {
  state: {
    userInfo: {},
    token: getToken(),
    roles: [],
    dataPermissions: [],
    userRoutes: [],
    userButtons: [],
    hasManage: false
  },
  mutations: {
    SET_TOKEN: (state: IState, token: string) => {
      state.token = token
      setToken(token);
    },
    GET_TOKEN: (state: IState) => {
      state.token = getToken();
    },
    SET_USER_INFO: (state: IState, userInfo: object) => {
      state.userInfo = userInfo;
    },
    SET_ROLES: (state: IState, roles: string[]) => {
      state.roles = roles;
    },
    SET_DATA_PERMISSIONS: (state: IState, dataPermissions: string[]) => {
      state.dataPermissions = dataPermissions;
    },
    // 路由
    SET_USER_ROUTES: (state: IState, data: string[]) => {
      state.userRoutes = data;
    },
    // 按钮
    SET_USER_BUTTONS: (state: IState, data: string[]) => {
      state.userButtons = data;
    },
    // 是否具有管理端权限
    SET_HAS_MANAGE: (state: IState, value: boolean) => {
      state.hasManage = value;
    }
  },
  actions: {
    // user login
    login({ commit, state }: { commit: any, state: any }, userInfo: IUserInfo) {
      return new Promise((resolve, reject) => {
        const { username, password } = userInfo;
        loginIn(username.trim(), password)?.then((res: any) => {
          const { data } = res;
          commit('SET_TOKEN', data.token);
          logSave({ operateType: '登录系统', operateContent: '' }).then(res => { });
          resolve('登录成功');
        }).catch((error: any) => {
          reject(error);
        });
      });
    },

    // get user info
    getInfo({ commit }: { commit: any }) {
      return new Promise((resolve, reject) => {
        getInfo().then((res: any) => {
          const data = res.data;
          if (!data || !data.roles || !data.roles.length) {
            reject('获取用户信息失败，请重新登录。');
          }
          commit('SET_USER_INFO', data);
          commit('SET_ROLES', data.roles);
          commit('SET_DATA_PERMISSIONS', data.permissions);
          commit('SET_USER_ROUTES', data.serveMenus); // 用户路由
          commit('SET_USER_BUTTONS', data.buttons); // 用户按钮
          commit('SET_HAS_MANAGE', data.menus.length > 0);// 是否具有管理端权限
          resolve(data);
        }).catch(error => {
          removeToken();
          reject(error);
        });
      });
    },

    // user logout
    logout({ commit, state }: { commit: any, state: any }) {
      return new Promise((resolve, reject) => {
        if (authType === 'jwt') {
          logout().then(() => {
            logSave({ operateType: '退出登录', operateContent: '' }).then(res => {
              // resetRouter();
              commit('resetToken');
              resolve("退出成功");
            });
          }).catch(error => {
            reject(error);
          });
        } else if (authType === 'jwt-cas') {
          logSave({ operateType: '退出登录', operateContent: '' }).then(res => {
            let token = state.token;
            let State = window.btoa((Math.random() * 1000000000).toString());
            window.location.href = casUrl + '/logout?redirect_uri=' + frontUrl + '&token=' + token + '&state=' + State;
            commit('resetToken');
            resolve("退出成功");
          });
        } else if (authType === 'jwt-uniauth') {
          logSave({ operateType: '退出登录', operateContent: '' }).then(res => {
            window.location.href = casUrl + '/logout?redirect_uri=' + encodeURIComponent(frontUrl);
            commit('resetToken');
            resolve("退出成功");
          });
        }
      });
    },

    // remove token
    resetToken({ commit }: { commit: any }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('SET_USER_INFO', []);
        removeToken();
      });
    }
  }
};

export default user;

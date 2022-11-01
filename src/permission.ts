import router, { asyncRoutes } from "@/router"
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth';
import { ElMessage } from "element-plus";
import { logSave } from '@/api/login';

const whiteList = ['/sign', '/auth-redirect'];
const appName = (window as any).config.VUE_APP_NAME || process.env.VUE_APP_NAME;
const authType = (window as any).config.VUE_APP_AUTH_TYPE || process.env.VUE_APP_AUTH_TYPE;
const frontUrl = (window as any).config.VUE_APP_AUTH_TYPE_FRONT_URL || process.env.VUE_APP_AUTH_TYPE_FRONT_URL;
const casUrl = (window as any).config.VUE_APP_AUTH_TYPE_CAS_URL || process.env.VUE_APP_AUTH_TYPE_CAS_URL;
const clientId = (window as any).config.VUE_APP_AUTH_TYPE_CLINENT_ID || process.env.VUE_APP_AUTH_TYPE_CLINENT_ID;

NProgress.configure({
  showSpinner: false
});

function getQueryString(name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
function rand(start: number, end: number) {
  return parseInt((Math.random() * (end - start) + start).toString());
}

function vercode(num: number) {
  var arr = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];
  var str = '';

  for (var i = 0; i < num; i++) {
    var a = rand(0, 63);
    str += arr[a];
  }
  return str;
}

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  // set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${appName}`;
  }

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (authType === 'jwt') {
      if (to.path === '/sign') {
        // if is logged in, redirect to the home page
        next({
          path: '/'
        });
        NProgress.done();
      } else {
        let roles = JSON.parse(JSON.stringify(store.getters.roles));
        const hasRoles = roles && roles.length > 0;
        if (hasRoles) {
          next();
        } else {
          store.dispatch('getInfo').then(() => {
            // 动态添加可访问的路由
            let userRoutes = JSON.parse(JSON.stringify(store.getters.userRoutes));
            let userRoutesCodeList: string[] = [];
            userRoutes.forEach((item: any) => {
              userRoutesCodeList.push(item.code);
            });
            asyncRoutes.forEach((item: any) => {
              if (item.children && userRoutesCodeList.indexOf(item.children[0].name) > -1
              ) {
                router.addRoute(item);
              }
            });
            router.replace(to.fullPath)
          }).catch(error => {
            ElMessage.error(error || '用户信息获取失败，请重新登录。');
            store.dispatch('logout');
          });
        }
      }
    } else if (authType === 'jwt-cas' || authType === 'jwt-uniauth') {
      let roles = JSON.parse(JSON.stringify(store.getters.roles));
      const hasRoles = roles && roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        store.dispatch('getInfo').then(() => {
          // 动态添加可访问的路由
          let userRoutes = JSON.parse(
            JSON.stringify(store.getters.userRoutes)
          );
          let userRoutesCodeList: string[] = [];
          userRoutes.forEach((item: any) => {
            userRoutesCodeList.push(item.code);
          });
          asyncRoutes.forEach((item: any) => {
            if (item.children && userRoutesCodeList.indexOf(item.children[0].name) > -1) {
              router.addRoute(item);
            }
          });
          router.replace(to.fullPath)
        })
          .catch(error => {
            ElMessage.error(error || '用户信息获取失败，请重新登录。');
            store.dispatch('logout');
          });
      }
    }
  } else {
    if (authType === 'jwt') {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        next(`/sign`);
        NProgress.done();
      }
    } else if (authType === 'jwt-cas') {
      if (getQueryString('token')) {
        logSave({ operateType: '登录系统', operateContent: '' }).then(res => { });
        var token = getQueryString('token');
        store.commit('SET_TOKEN', token);
        NProgress.done();
        //next({ path: "/" });
        window.location.href = frontUrl;
      } else {
        let state = window.btoa((Math.random() * 1000000000).toString());
        window.location.href = casUrl + '/login?redirect_uri=' + frontUrl + '&state=' + state;
      }
    } else if (authType === 'jwt-uniauth') {
      if (getQueryString('id_token')) {
        logSave({ operateType: '登录系统', operateContent: '' }).then(res => { });
        var token = getQueryString('id_token');
        store.commit('SET_TOKEN', token);
        NProgress.done();
        window.location.href = frontUrl;
      } else {
        let state = window.btoa((Math.random() * 1000000000).toString());
        let nonce = vercode(7);
        window.location.href = casUrl + '/login?redirect_uri=' + encodeURIComponent(frontUrl) + '&state=' + state + '&client_id=' + clientId + '&nonce=' + nonce;
      }
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
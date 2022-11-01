import request from "@/utils/request";
let base64 = require("js-base64").Base64;

const authType = (window as any).config.VUE_APP_AUTH_TYPE ? (window as any).config.VUE_APP_AUTH_TYPE : process.env.VUE_APP_AUTH_TYPE;
const loginUrl = (window as any).config.VUE_APP_AUTH_TYPE_LOGIN_URL ? (window as any).config.VUE_APP_AUTH_TYPE_LOGIN_URL : process.env.VUE_APP_AUTH_TYPE_LOGIN_URL;
const api = (window as any).config.VUE_APP_SYSTEM_API ? (window as any).config.VUE_APP_SYSTEM_API : process.env.VUE_APP_SYSTEM_API;

export function loginIn(username?: string, password?: string) {
  if (authType === "basic") {
    let token = base64.encode(username + ":" + password);
    let data = {
      code: 20000,
      data: {
        token: token // 'emhhbmdiaW4wMDEwOjExMQ=='
      }
    };
    return new Promise(resolve => {
      resolve(data);
    });
  } else if (authType === "jwt") {
    return request({
      url: loginUrl + '?username=' + username + '&password=' + password,
      method: "post",
      headers: { Accept: "text/plain" },
      responseType: "text"
    }).then(token => {
      let data = {
        code: 20000,
        data: {
          token: token
        }
      };
      return new Promise(resolve => {
        resolve(data);
      });
    });
  }
}

export function getInfo() {
  return request({
    url: api + "/api/system/user/info",
    method: "get"
  }).then(res => {
    let data = res.data;
    data.introduction = "I am a super administrator";
    let result = {
      code: 20000,
      data: data
    };
    return new Promise(resolve => {
      resolve(result);
    });
  });
}

export function logout() {
  let data = {
    code: 20000,
    data: {}
  };
  return new Promise(resolve => {
    resolve(data);
  });

}

//用户登录登出日志
export function logSave(data: object) {
  return request({
    url: api + '/api/service/system/log/save',
    method: 'post',
    data
  })
}

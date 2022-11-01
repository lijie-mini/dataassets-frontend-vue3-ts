import axios from "axios";
import store from "@/store";

const authType = (window as any).config.VUE_APP_AUTH_TYPE
  ? (window as any).config.VUE_APP_AUTH_TYPE
  : process.env.VUE_APP_AUTH_TYPE;

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 1000 * 60 * 100// request timeout
});

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    if (store.getters.token) {
      let Authorization = "";
      //根据认证方式修改token
      switch (authType) {
        case 'basic':
          Authorization = `Basic ${store.getters.token}`;
          break;
        case 'jwt':
        case 'jwt-cas':
        case 'jwt-uniauth':
          Authorization = `Bearer ${store.getters.token}`;
          break;
      }

      config.headers["Authorization"] = Authorization;
    }

    let url = config.url;
    // get参数编码
    if (config.method === "get" && config.params) {
      url += "?";
      let keys = Object.keys(config.params);
      for (let key of keys) {
        if (
          config.params[key] != null ||
          typeof config.params[key] !== "undefined"
        ) {
          url += `${encodeURIComponent(key)}=${encodeURIComponent(
            config.params[key]
          )}&`;
        }
      }
      url = url.substring(0, url.length - 1);
      config.params = {};
    }
    config.url = url;

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.config.responseType === "blob" && response.data.type != 'application/octet-stream') {
      return '';
    }
    return response.data;
  },
  error => {
    switch (error.response.status) {
      case 403:
        store.dispatch('resetToken').then(() => {
          window.location.reload();
        })
        return Promise.reject("验证过期请重新登录");
      case 502:
        return Promise.reject("网关错误，请联系管理员。");
    }
  }
);

export default service;

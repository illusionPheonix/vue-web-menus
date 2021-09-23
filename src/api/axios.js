/**
* axios封装
* @author: MaJinFeng
* @date：2020-7-1
*/

import axios from "axios";
import { Message, MessageBox, Loading } from "element-ui";
import baseUrl from './constans';
import session from '../utils/session.js';
import router from "../router/index";

// 加载ing....
const options = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
}
let loadingInstance;


axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf8"
  // token: Cookies.get("system_token") || ""
};
// console.log("process.env.VUE_APP_API", process.env.VUE_APP_API);

axios.defaults.baseURL = baseUrl;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    //   if (UserModule.token) {
    //     config.headers["authorization"] = `Bearer ${token}`;
    //   }
    // 获取token
    const token = session.get('shenji-2020-system')
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    loadingInstance = Loading.service(options);
    return config;
  },
  error => {
    Promise.reject(error);
  }

);


axios.interceptors.response.use(
  response => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    loadingInstance.close()
    // 过滤非标准json数据
    const res = response.data;

    //特殊错误处理，状态为10002时为登录超时
    if (res.code === 10002) {
      Message({
        message: "请重新登录",
        type: "error"
      });
      // 跳转到主页
      router.push({
        path: "/"
      });

      //其余错误状态处理
    } else if (res.code === 500 || res.code === 401) {
      let msg = res.msg;
      if (res && res.msg) {
        Message.error(msg);
        if (res.code === 401) {
          session.remove('shenji-2020-system');
          session.clear();
          window.sessionStorage.clear()
          // 跳转到主页
          router.push({
            path: "/"
          });
        }
        return Promise.reject(new Error(res.message || "Error"));
      }
      //请求成功
    } else if (res.code === 403) {
      // 跳转到403页面
      router.push({
        path: "/403"
      });
      return Promise.reject(new Error(res.message || "Error"));
      //请求成功
    } else if (res.code === 200) {
      return response;
    } else if (res.code === undefined) {
      return response;
    }
    else {
      Message.error(msg);
    }
  },
  error => {
    loadingInstance.close()
    Message({
      message: `服务器错误 : ${error.message}`,
      type: "error",
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

// 处理url地址
export function formateURLOnlyGet(link, json) {
  let url = link;
  if (json !== undefined) {
    var data = Object.entries(json);

    if (data.length) {
      url += url.indexOf("?") == -1 ? "?" : "";
      url += Object.entries(data)
        .map(item => {
          return item[1].join("=");
        })
        .join("&");
    }
  }

  return url;
}


/**
* GET请求方法
* @param {String} url 请求地址
* @param {json} json 请求参数
*/
export function getData(url, json = null) {
  return axios({
    url,
    method: "get",
    params: json
    // data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}

export function postData(url, json) {
  return axios({
    url,
    method: "post",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}
export function upload(url, json) {
  return axios({
    url,
    method: "post",
    data: json,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => res.data)
    .catch(error => error.response);
}
export function deleteData(url, json) {
  return axios({
    url: formateURLOnlyGet(url, json),
    method: "delete"
    // data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}
export function deleteJSON(url, json) {
  return axios({
    url: url,
    method: "delete",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}
export function putData(url, json) {
  return axios({
    url,
    method: "put",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}

export function downloadFile(url, json) {
  return axios({
    url,
    method: "get",
    params: json,
    withCredentials: true,
    responseType: "blob",
  })
    .then(res => res)
    .catch(error => error.response);
}



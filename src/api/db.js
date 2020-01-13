/*
 * @Author: ningbo.kang
 * @Date: 2019-02-24 15:06:45
 * @LastEditors: ningbo.kang
 * @LastEditTime: 2019-11-27 17:50:11
 * @Description: 数据请求
 */

import axios from 'axios';

import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc,
} from '@/config/interceptors/axios';

/**
 * [dbFactory 返回一个对象，包括get、post、all，提供给外部做请求和并发]
 * @param  {[type]} instance [axios 实例]
 * @return {[Object]} [对外提供get,post,delete 异步方法]
 */
function dbFactory(instance) {
  return {
    /**
     * 对外提供get 方法
     * @param {*} url 地址
     * @param {*} params 参数
     * @param {*} config 额外配置
     */
    get(url, params, config) {
      return new Promise((resolve, reject) => {
        instance
          .get(url, { params, ...config })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 对外提供 post 方法
     * @param {String} url 地址
     * @param {Object} params post数据
     * @param {Object} config 额外配置
     */
    post(url, params, config) {
      return new Promise((resolve, reject) => {
        instance
          .post(url, params, config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 对外提供 delete 方法
     * @param {*} url
     * @param {*} config
     */
    delete(url, config) {
      return new Promise((resolve, reject) => {
        instance
          .delete(url, config)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 并行任务
     * @param {object} tasks 并行任务数组
     */
    all(tasks) {
      return axios.all(tasks);
    },
  };
}

/**
 * [dbInstance 实例化一个axios,设置baseUrl域名、拦截器]
 * @return {[type]} [description]
 */
function dbInstance() {
  const baseURL = process.env.VUE_APP_API_BASE_URL;
  /**
   * [instance 实例化一个默认实例]
   * @type {[type]}
   */
  const instance = axios.create({
    baseURL,
    timeout: 60000,
  });
  // instance.defaults.headers.common.Authorization = `AUTH_${localStorage.token}`;
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // 拦截请求和响应
  instance.interceptors.request.use(requestSuccessFunc, requestFailFunc);
  instance.interceptors.response.use(responseSuccessFunc, responseFailFunc);
  return instance;
}

export default dbFactory(dbInstance());
// 另一台 API 域名
// export const db2 = dbFactory(dbInstance2());

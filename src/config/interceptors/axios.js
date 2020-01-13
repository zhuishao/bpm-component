import { message } from 'ant-design-vue';

/**
 * 请求成功
 * @param {*} config
 */
export function requestSuccessFunc(config) {
  return config;
}

/**
 * 请求失败
 * @param {*} err
 */
export function requestFailFunc(err) {
  // 自定义发送请求失败逻辑，断网，请求发送监控等
  return Promise.reject(err);
}

/**
 * 响应成功
 * @param {*} res
 */
export function responseSuccessFunc(res) {
  // 自定义响应成功逻辑，全局拦截接口，根据不同业务做不同处理，响应成功监控等
  const { headers, data: resData } = res;
  // 服务器接口头部认证通过时，将 token 存储在客户端
  // 针对文件下载，如果是文件流，直接返回
  if (
    headers['content-type'] === 'application/octet-stream;charset=utf-8'
    || headers['content-type'] === 'application/vnd.ms-excel;charset=utf-8'
  ) {
    // TODO: {filename:'abc.xls',data:resData }
    return resData;
  }

  // 此处 meta 是前后端约定
  const {
    meta: { code, success, message: msg },
  } = resData;
  switch (code) {
    case 200: // 如果业务成功，直接进成功回调
      return { success, msg, ...resData.content };
    case 400: // 前端提交数据重复，后台抛出错误
      return { success, msg, ...resData.content };
    case 404:
      // 如果业务失败，根据不同 code 做不同处理
      // 比如最常见的授权过期跳登录
      // 特定弹窗
      // 跳转特定页面等
      message.error(msg);
      break;
    case 500:
      message.error(msg);
      break;
    default:
  }
  return Promise.reject(resData);
}

/**
 * 忽略以下地址检查
 * @param {*} reqUrl
 */
function ignoreMessage(reqUrl) {
  const whiteList = [
    '/login',
    '/logout',
    '/sys/user/getUser',
    '/sys/menu/userMenus',
  ]; // 不重定向白名单
  let flag = false;
  whiteList.forEach((url) => {
    if (reqUrl.endsWith(url)) {
      flag = true;
    }
  });
  return flag;
}

/**
 * 响应失败，对http 状态非200情况处理
 * @param {*} err
 */
export function responseFailFunc(err) {
  // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
  const { message: msg, response, config } = err;
  if (response) {
    const { status, data } = response;
    switch (status) {
      case 403:
      case 401:
        if (!ignoreMessage(config.url)) {
          if (!window.messageShow) {
            window.messageShow = true;
            message.error(
              (data.meta && data.meta.message) || data.message,
              3,
              () => {
                window.location.reload();
              },
            );
          }
        }
        break;
      case 404:
        message.error((data.meta && data.meta.message) || data.message);
        break;
      case 500:
        message.error((data.meta && data.meta.message) || data.message);
        break;
      default:
        message.error(msg);
    }
  }
  return Promise.reject(err);
}

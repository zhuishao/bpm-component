/*
 * @Author: ningbo.kang
 * @Date: 2020-01-10 17:23:54
 * @LastEditors  : ningbo.kang
 * @LastEditTime : 2020-01-11 13:49:39
 * @Description: 描述
 */
import db from '@/api/db';

// import jsonData from '@/components/wg-form/data/form.json';
import jsonData from '@/components/wg-form/data/user.json';

/**
 * [model 用户管理模块]
 * @type {Object}
 */
const model = {
  /**
   * 流程表单接口：包括表单配置接口，表单实例数据
   */
  // 表单配置结构
  formConfig(param) {
    // TODO:
    // const { hostname, port, pathname } = window.location;
    // return db.get(`//${hostname}:${port}${pathname}mock/bpm/form.json`, param);
    // return db.post('', param);
    console.log('formConfig', param);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: jsonData });
      }, 1000);
    });
  },
  // 表单数据
  formValue(param) {
    // TODO:
    return db.post(
      'http://rap2api.taobao.org/app/mock/232772/bpm/getFormValue',
      param,
    );
  },
  // 提交表单数据
  submitFormValue(param) {
    // TODO:
    return db.post(
      'http://rap2api.taobao.org/app/mock/232772/bpm/getFormValue',
      param,
    );
  },
  // 保存表单数据
  saveFormValue(param) {
    // TODO:
    return db.post(
      'http://rap2api.taobao.org/app/mock/232772/bpm/getFormValue',
      param,
    );
  },
  // 上传文件
  uploadFile(param) {
    // TODO:
    return db.post(
      'http://rap2api.taobao.org/app/mock/232772/flow/file/uploadFile',
      param,
    );
  },
  // end 流程表单接口
};

export default model;

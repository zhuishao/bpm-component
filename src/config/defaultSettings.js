/*
 * @Author: ningbo.kang
 * @Date: 2019-11-18 17:01:04
 * @LastEditors: ningbo.kang
 * @LastEditTime: 2019-11-29 13:44:30
 * @FilePath: /template/src/config/defaultSettings.js
 * @Description: 系统配置设置文件
 */
export default {
  primaryColor: '#1890FF', // primary color of ant design
  navTheme: 'dark', // theme for nav menu
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  sidebarOpened: true, // 默认左侧菜单是展开还是锁起来，true:展开
  contentWidth: 'Fixed', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  autoHideHeader: false, //  auto hide header
  colorWeak: false,
  multiTab: true, //  是否多tab页面
  searchMenu: true, //  左侧菜单是否搜索
  navMenu: false, //  是否显示顶部菜单，顶部菜单是整个菜单数据第一层数据，针对层级和很大数据系统
  permission: true, //  权限与路由重新匹配，过滤掉无权限路由
  showChangeColor: true, // 允许更换颜色
  showChangeLanguage: true, // 允许切换语言
  showTips: true, // 是否显示userMenu区域消息
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // vue-ls options
  storageOptions: {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local',
  },
};

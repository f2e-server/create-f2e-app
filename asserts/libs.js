/**
 * esbuild 支持标准es模块解析, 需要一些 polyfills
 * 1. node 环境 process （history等常用包需要）
 * 2. require 支持 externals 模块
 * 3. 非标准的第三方模块 fix （moment的.d.ts文档和源码不匹配，需要修改）
 */
process = this.process || { env: {} }
require = this.require || function (key) {
    var externals = $include["./externals.json"]
    return window[externals[key]]
};
/**
 * include[开发环境资源][压缩资源] 最大限度减少需要编译的资源
 * 1. 压缩资源未配置的时候
 *    a. 在build模式下 f2e-server 会先寻找同一目录下对应的 .min.js 文件 (antd.js => antd.min.js)
 *    b. 找不到对应的压缩文件时，通过uglify-es进行压缩
 */
$include['../node_modules/react/umd/react.development.js']['../node_modules/react/umd/react.production.min.js'];
$include['../node_modules/react-dom/umd/react-dom.development.js']['../node_modules/react-dom/umd/react-dom.production.min.js'];
$include['../node_modules/react-router/umd/react-router.js'];
$include['../node_modules/moment/min/moment-with-locales.js'];
moment.__esModule = true;
moment.locale('zh-cn');
moment.default = moment;

$include['../node_modules/antd/dist/antd-with-locales.js'];
$include['../node_modules/echarts/dist/echarts.js'];

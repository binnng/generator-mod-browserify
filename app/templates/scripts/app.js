// 项目主JS入口文件
// ========

// 导入JS文件
// 
// - `debug.js`，便于移动端调试，在发布时不会导入进来
// - `mod.js`，便于引入外部`CommonJs`规范的文件
// - `constant.js` 定义的常量
// - `define.js` 一些定义，主要缓存外部文件方法
// - `util.js` 方法库

// ```
// @import "../components/binnng/debug.js/debug.js"
// @import "../components/mod.js/mod.js"
// @import "../components/zepto/zepto.js"
// @import "../components/binnng/broadcast.js/broadcast.js"
// @import "../components/performance.js/performance.js"
// @import "./define/constant.js"
// @import "./define/extend.js"
// @import "./define/define.js"
// @import "./define/util.js"
// ```

// Global
require("./modules/global.js");

if (IsDebug) {
	console.log('\'Allo \'Allo!');
}

// JS自身的扩展
// =======
// > 主要对ES5的扩展

//如果浏览器不支持Function原生bind的方法，模拟一个
if (!Function.prototype.hasOwnProperty('bind')) {
	Function.prototype.bind = function(context) {
		var fn = this,
			args = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
		return function() {
			return fn.apply(context || this, args);
		};
	}
}

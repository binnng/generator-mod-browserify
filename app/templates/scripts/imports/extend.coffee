# JS自身的扩展
# =======
# > 主要对ES5的扩展

#如果浏览器不支持Function原生bind的方法，模拟一个
unless Function::hasOwnProperty("bind")
  Function::bind = (context) ->
    fn = this
    args = (if arguments.length > 1 then [].slice.call(arguments, 1) else [])
    ->
      fn.apply context or this, args
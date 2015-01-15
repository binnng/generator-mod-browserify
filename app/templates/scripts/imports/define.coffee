noop = ->

console = WIN["console"]
debug = WIN["debug"]

# 发布时重置日志函数，防止报错
if not IsDebug
  debug.guai?() if debug

  console = debug = 
    log: noop
    debug: noop
    error: noop
    warn: noop
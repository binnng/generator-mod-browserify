WIN = window
DOC = document

LOC = WIN["location"]

REFERER = DOC["referrer"]

HIS = WIN.history

UA = WIN.navigator.userAgent

IsTouch = "ontouchend" of WIN

IsHasDeviceMotion = "ondevicemotion" of WIN

IsAndroid = (/Android|HTC/i.test(UA) or /Linux/i.test(WIN.navigator.platform + ''))
IsIPad = !IsAndroid && /iPad/i.test(UA)
IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA)
IsIOS = IsIPad || IsIPhone

IsXiaoMi = IsAndroid && /mi\s+/i.test(UA)

IsUC = /UCBrowser/i.test(UA)
IsWeixin = /MicroMessenger/i.test(UA)
IsBaiduBrowser = /baidubrowser/i.test(UA)

IsChrome = WIN["chrome"]

IsBaiduBox = /baiduboxapp/i.test(UA)

# CLICK = if IsTouch then "tap" else "click"
CLICK = "click"

IsDebug = yes












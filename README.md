generator-mod-browserify
======

![yo](https://cloud.githubusercontent.com/assets/2696107/5752010/1b413f02-9ca8-11e4-8fd9-c03f34d72f40.jpg)


> 基于 **mod.js** 和 **browserify** 的Yeoman生成器。

[http://binnng.github.io/generator-mod-browserify](http://binnng.github.io/generator-mod-browserify)


### 准备

你需要事先了解这几样东西

1. [Yeoman](http://yeoman.io/)
2. [CommonJs](http://javascript.ruanyifeng.com/nodejs/commonjs.html)
3. [browserify](http://browserify.org/)
4. [generator-webapp](https://github.com/yeoman/generator-webapp)

项目基于[generator-webapp](https://github.com/yeoman/generator-webapp)做了很多扩展。


简单介绍下browserify：

> 将符合CommonJs规范的js代码生成浏览器可以直接执行的js代码。

比如：

```
// a.js
module.exports = "this is a.js"
```

```
// b.js
var a = require(./a.js);
console.log(a); // "this is a.js"
```

通过browserify，会将`a.js`和`b.js`合并成浏览器执行的js代码。

### 安装

##### 安装`Yo`

你需要安装`Yo`，具体安装方法可以看看[这里](http://yeoman.io/learning/index.html)。

###### 安装`Generator`

```
npm install generator-mod-browserify -g
```

### 使用

##### Yo一下

```
yo mod-browserify
```


##### 目录结构

```
app
 |-- components bower或者components外部依赖
 |-- images
 |-- styles
   |-- app.scss 主入口css文件
 |-- scripts
   |-- app.js 主入口js文件
   |-- imports 待导入到app.js的所有js文件
   |-- modules 本地模块
tasks grunt拆分任务目录
```

### 说明

##### `app/components`
使用bower或者component安装的目录，不一定都是符合CommonJs规范。

建议对于外部依赖提供的方法，都写在`app/scripts/imports/define.js`里：

```
var $ = window("$");
var Broadcast = require("binnng/broadcast");
```

###### **注意**

这里的`require`是mod.js(`app/components/mod.js/mod.js`)提供的方法，便于引入`app/components`里符合CommonJs规范的js文件，这也是我引入`mod.js`的主要原因。

当然，如果符合CommonJs规范，你也可以写在`app/scripts/modules`里：

```
var domify = require("../components/domify/domify.js");
```

如果多个模块都要使用domify这个方法，那就得在`modules`文件里写很多遍上面的代码，所以还是建议写在`app/scripts/imports/define.js`里

```
var domify = require("domify");
```

`modules`里直接使用domify这个方法就行。

具体可以看看我这篇issue：[为什么使用了browserify，还要使用mod.js](https://github.com/binnng/generator-mod-browserify/issues/1)

##### tasks

这是拆分了的grunt任务目录

具体可以看看我这个项目：[grunt-task-module](https://github.com/binnng/grunt-task-module)

主要作用是：

> 拆分grunt任务，免得`gruntfile.js`越来越长，越来越难以维护。

### 任务

除了基本的[generator-webapp](https://github.com/yeoman/generator-webapp)提供的grunt服务，还做了些扩展。

##### grunt publish
发布
build后如果要做些特殊处理，可以写在`tasks/publish.js`里。

##### grunt doc
生成js(Coffee)文档。
可以看看[docco](http://jashkenas.github.io/docco/)。

##### grunt serve:doc
访问文档。

### JS导入

项目主JS文件是`app/scripts/app.js`

你可以在这个js里如以下方式随意导入外部js：

```
// @import "../components/binnng/broadcast.js/broadcast.js"
// @import "../demodir/test.js"
```

### 调试

项目使用了debug.js，具体可以看看[https://github.com/binnng/debug.js](https://github.com/binnng/debug.js)

目的是移动设备上打印调试信息。

当执行`grunt build`或`grunt publish`任务的时候，会自行将这个js去掉。

另外，`app/imports/define.js`中定义了

```
var IsDebug = true;
```

当执行build或publish任务时，会将IsDebug置为false。

如果你不想使用`debug.js`，你可以在`app/scripts/app.js`中删除这段：

```
// @import "../components/binnng/debug.js/debug.js"
```

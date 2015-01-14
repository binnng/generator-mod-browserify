// Generated by CoffeeScript 1.7.1
var chalk, exports, extend;

extend = require("extend");

chalk = require("chalk");

exports = function(grunt) {
  var config, initConfig, isBuild, task, taskName, tasks, _i, _len;
  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);
  taskName = grunt.cli.tasks[0];
  isBuild = !!(~taskName.indexOf("dist") || ~taskName.indexOf("build") || ~taskName.indexOf("pub"));
  config = {
    tasks: "tasks",
    app: "app",
    dist: "dist",
    taskName: taskName,
    isBuild: isBuild
  };
  tasks = [];
  grunt.file.recurse(config.tasks, function(abspath, rootdir, subdir, filename) {
    var jsReg;
    jsReg = /\.js$/;
    if (filename.match(jsReg)) {
      return tasks.push(filename.replace(jsReg, ""));
    }
  });
  grunt.config.set("pkg", grunt.file.readJSON("package.json"));
  grunt.config.set("config", config);
  for (_i = 0, _len = tasks.length; _i < _len; _i++) {
    task = tasks[_i];
    initConfig = extend(true, initConfig || {}, (require("./" + config.tasks + "/" + task))(grunt));
  }
  extend(initConfig, {
    config: config
  });
  return grunt.initConfig(initConfig);
};

module.exports = exports;

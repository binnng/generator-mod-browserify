extend = require "extend"
chalk = require "chalk"

exports = (grunt) ->

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  taskName = grunt.cli.tasks[0]
  isBuild = !!(~taskName.indexOf("dist") || ~taskName.indexOf("build") || ~taskName.indexOf("pub"))

  config = 
    tasks: "tasks"
    app: "app"
    dist: "dist"
    taskName: taskName
    isBuild: isBuild
    tmp: ".tmp"
    doc: "docs"
    components: "app/components"

  tasks = []

  grunt.file.recurse config.tasks, (abspath, rootdir, subdir, filename) ->
    jsReg = /\.js$/
    tasks.push filename.replace jsReg, ""  if filename.match jsReg

  grunt.config.set "pkg", grunt.file.readJSON "package.json"
  grunt.config.set "config", config

  for task in tasks
    initConfig = extend yes, initConfig or {}, (require "./#{config.tasks}/#{task}") grunt

  extend initConfig, config: config

  grunt.initConfig initConfig

module.exports = exports
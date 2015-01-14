module.exports = function(grunt) {

  var config = grunt.config.get("config");
  var path = require("path");

  var concatJsFiles = [];
  var isBuild = config.isBuild;

  function getImportsJsFile(content) {

    var match = content.match(/@import\s+(.*?)[\n|\r]/)
    if (match) {
      concatJsFiles.push(match[1].replace(/'|"|\s/g, ""));
      getImportsJsFile(content.substring(match.index + 1));
    }

  };

  function getConcatJsFiles() {
    var appJs = grunt.file.read(config.app + "/scripts/app.js");

    getImportsJsFile(appJs);

    var fileList = concatJsFiles;


    // build 任务去掉debug.js
    if(isBuild) {
      fileList = fileList.filter(function(name, index) {
        return !~name.indexOf("debug.js")
      });
    }

    return fileList.map(function(name, index) {
      return path.join(config.app + "/scripts/" + name);
    });
  };

  var exports = {

    concat: {
      options:{
        separator: ";"
      },
      "import": {
        src: getConcatJsFiles(),
        dest: "<%= config.app %>/.tmp/vender.js"
      },
      all: {
        options: {
          banner: "(function(undefined) {\n'use strict';\n",
          footer: "})();",
          process: function(src, filepath) {
            var ret = '\n' + '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');

            if (isBuild && ~filepath.indexOf("vender.js")) {
              ret = ret.replace("IsDebug = true", "IsDebug = false");
            }

            return ret;
          }
        },
        src: [
          "<%= config.app %>/.tmp/vender.js",
          "<%= config.app %>/.tmp/bundle.js",
        ],
        dest: "<%= config.app %>/.tmp/all.js"
      }
    }

  };

  return exports;

};
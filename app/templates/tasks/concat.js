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
    var appJs = "";

    if (grunt.file.exists(config.app + "/scripts/app.coffee")) {
      appJs = grunt.file.read(config.app + "/scripts/app.coffee");
    } else {
      appJs = grunt.file.read(config.app + "/scripts/app.js");
    }

    getImportsJsFile(appJs);

    var fileList = concatJsFiles;


    // build 任务去掉debug.js
    if (isBuild) {
      fileList = fileList.filter(function(name, index) {
        return !~name.indexOf("debug.js")
      });
    }

    return fileList.map(function(name, index) {
      return path.join(config.app + "/scripts/" + name);
    });
  };

  return {

    concat: {
      options: {
        separator: ";"
      },
      "import": {
        options: {
          process: function(src, filepath) {
            return '\n' + '// Source: ' + filepath + '\n' + src;
          }
        },
        src: getConcatJsFiles() || [],
        dest: '<%= config.tmp %>/scripts/vendor.js'
      },
      app: {
        options: {
          banner: "(function(undefined) {\n'use strict';\n",
          footer: "})();",
          process: function(src, filepath) {
            var ret = '\n' + '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');

            if (isBuild && ~filepath.indexOf("vendor.js")) {
              ret = ret.replace("IsDebug = true", "IsDebug = false");
            }

            return ret;
          }
        },
        src: [
          '<%= config.tmp %>/scripts/vendor.js',
          '<%= config.tmp %>/scripts/bundle.js'
        ],
        dest: '<%= config.tmp %>/scripts/app.js'
      }
    }

  };

};
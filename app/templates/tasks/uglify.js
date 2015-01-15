module.exports = function(grunt) {

  var config = grunt.config.get("config");

  return {
    uglify: {
      options: {
        sourceMap: false,
        sourceMapName: config.dist + "/sourcemap.map",

        // 文档：http://lisperator.net/uglifyjs/compress
        compress: {
          // 去除console的代码
          drop_console: true,
          // discard unreachable code
          dead_code: true,
          unused: true,
          // 变量提前
          hoist_vars: true,
          hoist_funs: true,

          evaluate: true,
          booleans: true,
          conditionals: true
        }
      }

      // ,beauty: {
      //   options: {
      //     beautify: true,
      //     mangle: false,
      //     hoist_vars: false
      //   },
      //   files: {
      //     '<%= config.tmp %>/scripts/app.js': ['<%= config.tmp %>/scripts/app.js']
      //   }
      // }

    }

  };
};
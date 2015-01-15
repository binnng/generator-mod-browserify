// JS 代码检查
// 配置文件 > .jshintrc

module.exports = function(grunt) {

  return {
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: [
        '<%= config.app %>/scripts/app.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    }
  };

};
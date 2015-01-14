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
      all: [
        //'Gruntfile.js',
        //'<%= config.app %>/scripts/{,*/}*.js',
        '<%= config.app %>/scripts/all.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    }
  };

};
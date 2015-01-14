module.exports = function(grunt) {

  var config = grunt.config.get("config");

  var exports = {

    browserify: {
      dev: {
        src: ['<%= config.app %>/scripts/app.js'],
        dest: '<%= config.tmp %>/scripts/bundle.js',
        options: {
          debug: true
        }
      }
    }

  };

  return exports;

};
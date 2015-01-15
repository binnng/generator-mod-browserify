module.exports = function(grunt) {

  var config = grunt.config.get("config");

  return {

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

};
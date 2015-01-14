module.exports = function (grunt) {
  return {
      // Watches files for changes and runs tasks based on the changed files
      watch: {
          bower: {
              files: ['bower.json'],
              tasks: ['bowerInstall']
          },
          js: {
              files: ['<%= config.tmp %>/scripts/app.js'],
              tasks: ['jshint'],
              options: {
                  livereload: true
              }
          },
          jstest: {
              files: ['test/spec/{,*/}*.js'],
              tasks: ['test:watch']
          },
          gruntfile: {
              files: ['Gruntfile.js']
          },
          sass: {
              files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
              tasks: ['sass:server', 'autoprefixer']
          },
          styles: {
              files: ['<%= config.app %>/styles/{,*/}*.css'],
              tasks: ['newer:copy:styles', 'autoprefixer']
          },
          livereload: {
              options: {
                  livereload: '<%= connect.options.livereload %>'
              },
              files: [
                  '<%= config.app %>/{,*/}*.html',
                  '.tmp/styles/{,*/}*.css',
                  '<%= config.app %>/images/{,*/}*'
              ]
          },
          browserify: {
              files: [
              '<%= config.app %>/scripts/app.js',
              '!<%= config.app %>/scripts/modules/{,*/}*.js'
            ],
              tasks: ['browserify']
          },

          importjs: {
            files: [
              '<%= config.app %>/scripts/{,*/}*.js'
            ],
            tasks: ['concat:import']
          },

          appjs: {
            files: [
              '<%= config.tmp %>/scripts/vendor.js',
              '<%= config.tmp %>/scripts/bundle.js'
            ],
            tasks: ['concat:app']
          }
      }
    }
}
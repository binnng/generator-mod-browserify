module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:dist',
        'browserify',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
        'htmlmin'
    ]);
};
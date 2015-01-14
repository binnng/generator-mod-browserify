module.exports = function (grunt) {
    grunt.registerTask('publish', [
        'build'
    ]);

    grunt.registerTask('pub', [
        'publish'
    ]);
};
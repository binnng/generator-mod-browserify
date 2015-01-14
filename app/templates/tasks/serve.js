module.exports = function (grunt) {
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run([
                'build',
                'connect:dist:keepalive'
            ]);
        }

        if (target === 'doc') {
            return grunt.task.run([
                'doc',
                'connect:docs:keepalive'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'browserify',
            'concat',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });
};
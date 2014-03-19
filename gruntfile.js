module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    var files = [ 'tasks/**/*.js', 'test/**/*.js' ];

    grunt.initConfig({
        jshint: { files: files },
        mochaTest: {
            test: {
                options: { reporter: 'spec' },
                src: files
            }
        },
        release: {
            options: { commitMessage: 'NPM Release v<%= version %>' }
        }
    });

    grunt.loadTasks("./tasks");

    grunt.registerTask('default', [ 'jshint', 'mochaTest' ]);
};

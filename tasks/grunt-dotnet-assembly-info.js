module.exports = function(grunt) {
    grunt.registerTask('assemblyinfo', 'Sets .NET assembly information.', function() {
        var options = this.options();
        var keys = Object.keys(options);

        if (keys.length < 1) grunt.warn('No assembly info options set.');

        console.log('Setting assembly info to:');
        keys.forEach(function(option) { console.log('  ' +  option + ': ' + options[option]); });
    });
};

module.exports = function(grunt) {
    grunt.registerTask('assemblyinfo', 'Sets .NET assembly information.', function() {
        console.log('Setting assembly info to:');
        var options = this.options();
        Object.keys(options).forEach(function(option) { console.log('  ' +  option + ': ' + options[option]); });
    });
};

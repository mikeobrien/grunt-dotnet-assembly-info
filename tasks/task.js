var path = require('path'),
    fs = require('fs'),
    glob = require('glob'),

    msbuild = require('../helpers/msbuild.js'),
    selectors = require('../helpers/regex').selectors;


module.exports = function(grunt) {
    grunt.registerTask('assemblyinfo', 'Access and manipulate .NET assembly information.', function() {
        var options = this.options({
            filename: 'AssemblyInfo.cs',
            info: {},
            files: []
        });
        var attrs = Object.keys(options.info);

        // Validate options
        if (!options.info || attrs.length === 0) grunt.warn('No assembly info options set.');
        if (!this.filesSrc || this.filesSrc.length === 0) {
            if (!options.files || options.files.length === 0) grunt.warn('No files specified.');
            this.filesSrc = options.files; // Backward compatibility?
        }

        // Normalize all the attribute values - make them all functions
        var defaultAttrFn = function(replaceValue) { return function() { return replaceValue; }; };
        attrs.forEach(function(key) {
            var value = options.info[key];
            var type = grunt.util.kindOf(value);
            if (type !== 'function') {
                if (type === 'string') { value = defaultAttrFn(value); }
                else { grunt.warn('Invalid assembly info option.'); }
            }
            options.info[key] = value;
        });

		// Process globbing if provided
        var fileToProcess = [];
        this.filesSrc.forEach(function (file) {
            var filesFound = glob.sync(file);
			filesFound.forEach(function (fileFound) {
				fileToProcess.push(fileFound);
			});
        });

        // Obtain all files specified in grunt config and within any solution/project files that were also included
        var files = [];
        fileToProcess.forEach(function (file) {
            switch (path.extname(file.trim())) {
                case '.sln': files = files.concat(msbuild.getSolutionFiles(file, options.filename)); break;
                case '.csproj': files = files.concat(msbuild.getProjectFiles(file, options.filename)); break;
                default: files.push(file);
            }
        });
        if (files.length === 0) grunt.warn('No assembly info files found.');

        console.log('Files:');
        console.log();
        files.forEach(function(path) {
            console.log('  ' + path);

            var contents = fs.readFileSync(path, 'utf8'),
                modified = false;

            attrs.forEach(function(key) {
                var attrFn = options.info[key];
                contents = contents.replace(selectors[key], function (match, p1, p2, p3) {
                    var newValue = attrFn.call(grunt, p2);
                    if (!newValue || newValue === p2) { return match; }
                    modified = true;
                    return p1 + newValue + p3;
                });
            });

            if (!modified) return;
            fs.writeFileSync(path, contents);
        });
    });
};

var expect = require('expect.js'),
    sinon = require('sinon'),
    _ = require('underscore'),
    task = require('../tasks/task.js'),
    fs = require('fs'),
    temp = require('temp'),
    wrench = require('wrench'),
    grunt = require('grunt');

function runTask(options) {
    var stubGrunt = { registerTask: sinon.spy(), util: grunt.util, warn: grunt.warn, log: grunt.log };
    task(stubGrunt);
    var context = {
        options: function(defaults) { return _.defaults(options, defaults); },
        filesSrc: options.files
    };
    stubGrunt.registerTask.firstCall.args[2].apply(context);
}

describe('task', function(){
    var data;
    var attribute = '[assembly: AssemblyTitle("This is the title")]';

    beforeEach(function() {
        temp.track();
        data = temp.mkdirSync() + '/Data/';
        wrench.copyDirSyncRecursive('test/Data', data);
    });

    afterEach(function() {
        temp.cleanup();
    });

    it('should set assembly info on a solution using globbing', function() {
        runTask({
            files: [data + 'Solution/**/*.sln'],
            info: { title: 'This is the title' }
        });

        var file1 = data + 'Solution/Properties/AssemblyInfo.cs',
            file2 = data + 'Solution/Project.WebApplication/Properties/AssemblyInfo.cs',
            file3 = data + 'Project.WpfApplication/Properties/AssemblyInfo.cs';

        expect(fs.readFileSync(file1, 'utf8')).to.contain(attribute);
        expect(fs.readFileSync(file2, 'utf8')).to.contain(attribute);
        expect(fs.readFileSync(file3, 'utf8')).to.contain(attribute);
    });

    it('should set assembly info on a project', function () {
        runTask({
            files: [data + 'Project.WpfApplication/Project.WpfApplication.csproj'],
            info: { title: 'This is the title' }
        });

        var file = data + 'Project.WpfApplication/Properties/AssemblyInfo.cs';
        expect(fs.readFileSync(file, 'utf8')).to.contain(attribute);
    });

    it('should set assembly info on a file', function() {
        runTask({
            files: [data + 'Project.WpfApplication/Properties/AssemblyInfo.cs'],
            info: { title: 'This is the title' }
        });

        var file = data + 'Project.WpfApplication/Properties/AssemblyInfo.cs';
        expect(fs.readFileSync(file, 'utf8')).to.contain(attribute);
    });

});

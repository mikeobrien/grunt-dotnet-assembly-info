var path = require('path'),
    expect = require('expect.js'),
    msbuild = require('../tasks/msbuild.js');

describe('msbuild', function() {

    it('should enumerate solution projects', function() {

        var projects = msbuild.getSolutionProjects('test/Data/Solution/Solution.sln');
        expect(projects.length).to.be(3);
        expect(projects[0]).to.be(path.normalize('test/Data/Solution/Project.ClassLibrary.csproj'));
        expect(projects[1]).to.be(path.normalize('test/Data/Solution/Project.WebApplication/Project.WebApplication.csproj'));
        expect(projects[2]).to.be(path.normalize('test/Data/Project.WpfApplication/Project.WpfApplication.csproj'));
        
    });

    it('should enumerate project files', function() {

        var files = msbuild.getProjectFiles('test/Data/Project.WpfApplication/Project.WpfApplication.csproj', 'AssemblyInfo.cs');
        expect(files.length).to.be(1);
        expect(files[0]).to.be(path.normalize('test/Data/Project.WpfApplication/Properties/AssemblyInfo.cs'));
        
    });

    it('should enumerate solution files', function() {

        var files = msbuild.getSolutionFiles('test/Data/Solution/Solution.sln', 'AssemblyInfo.cs');
        expect(files.length).to.be(3);
        expect(files[0]).to.be(path.normalize('test/Data/Solution/Properties/AssemblyInfo.cs'));
        expect(files[1]).to.be(path.normalize('test/Data/Solution/Project.WebApplication/Properties/AssemblyInfo.cs'));
        expect(files[2]).to.be(path.normalize('test/Data/Project.WpfApplication/Properties/AssemblyInfo.cs'));
        
    });

});

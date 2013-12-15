var expect = require('expect.js');
    msbuild = require('../tasks/msbuild.js');

describe('msbuild', function() {

    it('should enumerate solution projects', function(){

        var projects = msbuild.getSolutionProjects('test/Solution.sln');
        expect(projects.length).to.be(3);
        expect(projects[0]).to.be('test/Project.Core/Project.Core.csproj');
        expect(projects[1]).to.be('test/Project.Web/Project.Web.csproj');
        expect(projects[2]).to.be('test/Tests/Tests.csproj');
        
    });

    it('should enumerate project files', function(){

        var files = msbuild.getProjectFiles('test/Project.csproj', 'AssemblyInfo.cs');
        expect(files.length).to.be(1);
        expect(files[0]).to.be('test/Properties/AssemblyInfo.cs');
        
    });

});
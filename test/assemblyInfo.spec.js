var expect = require('expect.js'),
    selectors = require('../helpers/regex.js').selectors,
    fs = require('fs'),
    temp = require('temp'),
    path = require('path'),
    wrench = require('wrench');

var source = fs.readFileSync('test/Data/Solution/Properties/AssemblyInfo.cs', 'utf8').trim();

var result = 
    'using System.Reflection;\r\n' +
    '\r\n' +
    '// General Information about an assembly is controlled through the following \r\n' +
    '[assembly: AssemblyTitle("This is the title")]\r\n' +
    '[assembly: AssemblyDescription("This is the description")]\r\n' +
    '[assembly: AssemblyConfiguration("This is the configuration")]\r\n' +
    '[assembly: AssemblyCompany("This is the company")]\r\n' +
    '[assembly: AssemblyProduct("This is the product")]\r\n' +
    '[assembly: AssemblyCopyright("This is the copyright")]\r\n' +
    '[assembly: AssemblyTrademark("This is the trademark")]\r\n' +
    '[assembly: AssemblyCulture("This is the culture")]\r\n' +
    '\r\n' +
    '// COM, set the ComVisible attribute to true on that type.\r\n' +
    '[assembly: ComVisible(false)]\r\n' +
    '\r\n' +
    '// The following GUID is for the ID of the typelib if this project is exposed to COM\r\n' +
    '[assembly: Guid("5e92281a-f318-4b4c-87f4-dba1a0f4ef48")]\r\n' +
    '\r\n' +
    '// Version information for an assembly consists of the following four values:\r\n' +
    '// [assembly: AssemblyVersion("This is the version")]\r\n' +
    '[assembly: AssemblyVersion("This is the version")]\r\n' +
    '[assembly: AssemblyFileVersion("This is the file version")]';

var values = {
    title: 'This is the title',
    description: 'This is the description',
    configuration: 'This is the configuration',
    company: 'This is the company',
    product: 'This is the product',
    copyright: 'This is the copyright',
    trademark: 'This is the trademark',
    culture: 'This is the culture',
    version: 'This is the version',
    fileVersion: 'This is the file version'
};

describe('assemblyInfo', function() {
    var data;

    beforeEach(function() {
        temp.track();
        data = temp.mkdirSync() + '/Data/';
        wrench.copyDirSyncRecursive('test/Data', data);
    });

    afterEach(function() {
        temp.cleanup();
    });

    it('should set info attributes', function() {
        var actual = source;
        Object.keys(values).forEach(function(key) {
            actual = actual.replace(selectors[key], '$1' + values[key] + '$3');
        });
        expect(actual).to.be(result);
    });

    it('should set info attributes in files', function() {
        var file1 = data + 'Solution/Properties/AssemblyInfo.cs',
            file2 = data + 'Solution/Project.WebApplication/Properties/AssemblyInfo.cs',
            file3 = data + 'Project.WpfApplication/Properties/AssemblyInfo.cs';

        [file1, file2, file3].forEach(function(path) {
            var source = fs.readFileSync(path, 'utf8').trim();
            Object.keys(values).forEach(function(key) {
                source = source.replace(selectors[key], '$1' + values[key] + '$3');
            });
            expect(source).to.be(result);
        });
    });
});

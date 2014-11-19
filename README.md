# grunt-dotnet-assembly-info

[![npm version](http://img.shields.io/npm/v/grunt-dotnet-assembly-info.svg)](https://npmjs.org/package/grunt-dotnet-assembly-info) [![build status](http://img.shields.io/travis/mikeobrien/grunt-dotnet-assembly-info.svg)](https://travis-ci.org/mikeobrien/grunt-dotnet-assembly-info) [![Dependency Status](http://img.shields.io/david/mikeobrien/grunt-dotnet-assembly-info.svg)](https://david-dm.org/mikeobrien/grunt-dotnet-assembly-info) [![npm downloads](http://img.shields.io/npm/dm/grunt-dotnet-assembly-info.svg)](https://npmjs.org/package/grunt-dotnet-assembly-info)

Grunt plugin for editing .NET assembly info files.
NOTE: this plugin requires Grunt 0.4.x and currently only supports C#.

## Getting Started
From the same directory as your project's Gruntfile and package.json, install
this plugin with the following command:

```bash
$ npm install grunt-dotnet-assembly-info --save-dev
```

Next add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-dotnet-assembly-info');
```

## Config
Inside your `Gruntfile.js` file, add a section named `assemblyinfo`, containing
assembly information:

```js
assemblyinfo: {
    options: {
        // Can be solutions, projects or individual assembly info files
        files: ['src/MySolution.sln', 
                'src/MyProject/MyProject.csproj', 
                'src/MyProject/Properties/AssemblyInfo.cs'],

        // Filename to search for when a solution or project is 
        // specified above. Default is AssemblyInfo.cs.
        filename: 'MyCustomAssemblyInfo.cs', 

        // Standard assembly info
        info: {
            title: 'Planet Express Website',
            description: 'Shipping and tracking website.', 
            configuration: 'Release', 
            company: 'Planet Express', 
            product: 'Planet Express Website', 
            copyright: 'Copyright 3002 © Planet Express', 
            trademark: 'Planet Express', 
            culture: 'div-MV',
            version: function (value) {
                var version = parseVersion(value);
                if (version.patch > packageVersion.patch) {
                    email('devs', patchNotes);
                }
                updatePackageVersion(version);
                // If no value is returned the assembly version will not be modified
            },
            fileVersion: '2.0.3.2345'
        }
    }
}
```

Contributors
------------

| [![Nate-Wilkins](https://avatars2.githubusercontent.com/u/2957868?s=144)](https://github.com/Nate-Wilkins) |
|:---:|
| [Nate-Wilkins](https://github.com/Nate-Wilkins) |

## License
MIT License

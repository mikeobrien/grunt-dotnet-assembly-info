# grunt-dotnet-assembly-info [![Build Status](https://api.travis-ci.org/mikeobrien/grunt-dotnet-assembly-info.png?branch=master)](https://travis-ci.org/mikeobrien/grunt-dotnet-assembly-info)
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
    // Can either be a solution, project or assembly info file
    files: ['src/MySolution.sln', 
            'src/MyProject/MyProject.csproj', 
            'src/MyProject/Properties/AssemblyInfo.cs'],

    // Filename to search for when a solution or project is 
    // specified above. Default is AssemblyInfo.cs.
    filename: 'MyCustomAssemblyInfo.cs', 

    // Standard assembly info attributes
    title: 'Planet Express Website', 
    description: 'Shipping and tracking website.', 
    configuration: 'Release', 
    company: 'Planet Express', 
    product: 'Planet Express Website', 
    copyright: 'Copyright 3002 © Planet Express', 
    trademark: 'Planet Express', 
    culture: 'div-MV',
    version: '2.0', 
    fileVersion: '2.0.3.2345'
}
```

When the task is run it will attempt to find existing `Assembly*` attributes and update those. If it does not find those it will append them to the assembly info file.

## License
MIT License
var attributes = {
    title: "AssemblyTitle",
    description: "AssemblyDescription",
    configuration: "AssemblyConfiguration",
    company: "AssemblyCompany",
    product: "AssemblyProduct",
    copyright: "AssemblyCopyright",
    trademark: "AssemblyTrademark",
    culture: "AssemblyCulture",
    version: "AssemblyVersion",
    fileVersion: "AssemblyFileVersion",
    informationalVersion: "AssemblyInformationalVersion"
};

var regex = function(attr) { return new RegExp('(\\[assembly\\: ' + attr + '\\(\\")(.*?)(\\"\\)\\])', 'g'); };
var selectors = (function () {
    var attrSelectors = {};
    Object.keys(attributes).forEach(function (key) { attrSelectors[key] = regex(attributes[key]); });
    return attrSelectors;
}());

exports.matchAll = function(regex, text) {
    var matches = [];
    var match = regex.exec(text);
    while (match !== null) {
        matches.push(match[1]);
        match = regex.exec(text);
    }
    return matches;
};

exports.selectors = selectors;

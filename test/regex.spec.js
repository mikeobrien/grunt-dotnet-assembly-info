var expect = require('expect.js');
var regex = require('../tasks/regex.js');

describe('regex', function(){

    it('should match all groups', function(){

        var results = regex.matchAll(/<(\/?\w*)>/g, 'oh <b><i>hai</i></b> there');
        
        expect(results.length).to.be(4);
        expect(results[0]).to.be('b');
        expect(results[1]).to.be('i');
        expect(results[2]).to.be('/i');
        expect(results[3]).to.be('/b');

    });

});
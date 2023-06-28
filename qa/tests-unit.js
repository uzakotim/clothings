var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

suite('Fortune Cockie Tests', function(){
    test('getFortune() should return a fortune cookie', function(){
        expect(typeof fortune.getFortune() === 'string')
    });
});

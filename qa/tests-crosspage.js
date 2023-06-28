var Browser = require('zombie'),
        assert = require('chai').assert;

var browser;
suite('Cross-Page Tests', function(){
    
    setup(function(){
        browser = new Browser();
    });
    test('requesting a cloth quote from the reserved shop page'+
    'should populate the referrer field', function(done){
        var referrer = 'http://localhost:3000/shops/reserved';
        browser.visit(referrer, function(){
            browser.link(".requestCloth" , function(){ 
                assert(browser.referrer === referrer);
            });
        });
        done();
    });
    
    test('requesting a cloth quote from the waikiki shop page'+
    'should populate the referrer field', function(done){
        var referrer = 'http://localhost:3000/shops/waikiki';
        browser.visit(referrer, function(){
            browser.link(".requestCloth" , function(){ 
                assert(browser.referrer === referrer);
            });
        });
        done();
    });
});
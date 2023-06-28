var Browser = require('zombie'),
        assert = require('chai').assert;

var browser;
suite('Cross-Page Tests', function(){
    
    setup(function(){
        browser = new Browser();
    });
    test('requesting a cloth quote from the reserved shop page '+
    'should populate the referrer field', function(done){
        var referrer = 'http://localhost:3000/shops/reserved';
        browser.visit(referrer, function(){
            browser.link('.requestClothRate' , function(){ 
                assert(browser.referrer === referrer);
                done();
            });
        });
        done();
    });
    
    // test('requesting a cloth quote from the waikiki shop page'+
    // 'should populate the referrer field', function(done){
    //     var referrer = 'http://localhost:3000/shops/waikiki';
    //     browser.visit(referrer, function(){
    //         browser.clickLink('requestCloth', function(){ 
    //             assert(browser.field('referrer').value === referrer);
    //             done();
    //         });
    //     });
    // });
    // test('visiting the "request cloth" page directly should result'+
    // 'in an empty referrer field', function(done){
    //     browser.visit('http://localhost:3000/shops/requestCloth', function(){
    //         assert(browser.field('referrer').value === '');
    //         done();
    //     });
    // });
});
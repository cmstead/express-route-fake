Express Route Fake
==================

Express route fake is a small library for faking common express router verbs (get, put, post, delete) and capturing their
action functions for ease of testing. This module is intended for use with the Mockery library and does not perform
any node cache manipultion on its own.

This module was originally created as a proof of concept for a blog post, so it was pulled from hastily written source.
All behavior will be wrapped in tests before release version 1.0.0 is made available. Until that point, unexpected behavior
may occur from time to time without notice.

## Basic Info

Installation: `npm install express-route-fake --save-dev`

Use:

    'use strict';'
    
    var expressRouteFake = require('express-route-fake');
    var mockery = require('mockery');
    
    // Example uses Mocha syntax
    describe('My test suite', function () {
        
        var myRouteModule;
        
        beforeEach(function () {
            mockery.resetCache();
            expressRouteFake.reset();
            
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false
            });
            
            // Registering as a mock gives direct access to stored values in expressRouteFake module
            mockery.registerMock('express', expressRouteFake);
            myRouteModule = require('../routes/myRouteModule');
        });
        
        afterEach(function () {
            mockery.deregisterAll();
            mockery.disable();
        });
        
    });

Testing a simple get action:

    it('should perform expected behavior', function () {
        var action = expressRouteFake.getRouteAction('get', '/route/path');
        var status = 0;
        
        var req = {};
        var res = { status: function (statusCode) { status = statusCode; } };
         
        action(req, res);
        
        assert(status === 200);
    });
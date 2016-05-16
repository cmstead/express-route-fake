'use strict';

var routeFunctions = {
    delete: {},
    get: {},
    post: {},
    put: {}
};

var expressData = {
    renderArgs: []
};

function routeStub(method, path, action) {
    routeFunctions[method][path] = action;
}

function throwOnUndefined(value, message) {
    if(typeof value === 'undefined') {
        throw new Error(message);
    }
}

function throwOnBadKeys (method, path){
    var prefix = '[Express Route Fake Error] ';
    
    var methodMessage = 'Method \'' + method + '\' is not supported';
    var pathMessage = 'Action for method \'' + method + '\' with route \'' + path + '\' does not exist';
    
    throwOnUndefined(routeFunctions[method], prefix + methodMessage);
    throwOnUndefined(routeFunctions[method][path], prefix + pathMessage);
}

function getRouteAction(method, path) {
    throwOnBadKeys(method, path);
    
    return routeFunctions[method][path];
}

function reset() {
    routeFunctions.delete = {};
    routeFunctions.get = {};
    routeFunctions.post = {};
    routeFunctions.put = {};
    
    expressData.renderArgs = [];
}

function Router() {
    return {
        delete: routeStub.bind(null, 'delete'),
        get: routeStub.bind(null, 'get'),
        post: routeStub.bind(null, 'post'),
        put: routeStub.bind(null, 'put')
    };
}

function render (){
    var args = Array.prototype.slice.call(arguments);
    expressData.renderArgs.push(args);
}

function renderCall (index){
    return expressData.renderArgs[index];
}

function expressFake (){
    return {
        render: render
    };
}

expressFake.Router = Router;

expressFake.reset = reset;
expressFake.getRouteAction = getRouteAction;

expressFake.renderData = {
    call: renderCall
};

module.exports = expressFake;

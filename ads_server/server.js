'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var server = app.start();

var chatserver = require('./config/lib/chatserver.js');
chatserver.login(function() {
    console.log("login success");
}, function () {
    console.log("login error");
});

chatserver.getPublicRooms(null, null);

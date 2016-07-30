'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  request = require('request');

module.exports.connect = function(callback) {
    var requestURL = config.chatserver.serverURL + '/api/login';
    var requestData = {
        user: config.chatserver.auth.adminUser,
        password: config.chatserver.auth.adminPass 
    };

    request({
        url: requestURL,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    }, function (err, res, body) {

    });
};

module.exports.registerUser = function(callback) {
    var _this = this;

    
};


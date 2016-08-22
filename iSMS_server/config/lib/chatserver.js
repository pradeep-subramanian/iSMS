'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  unirest = require('unirest');

var chatserver = {
    login: login,
    logout: logout,
    registerUser: registerUser,
    getPublicRooms: getPublicRooms
};
module.exports = chatserver;

function login (successCallback, errorCallback) {
    var requestURL = config.chatserver.serverURL + '/api/login';
    var requestData = {
        user: config.chatserver.auth.adminUser,
        password: config.chatserver.auth.adminPass
    };
    console.log(requestData);
    unirest.post(requestURL)
        //.field("user", config.chatserver.auth.adminUser)
        //.field("password", config.chatserver.auth.adminPass)
        .send(requestData)
        .end(function(response) {
            if (response.status !== 200) {
                console.log("Failed to connect to chat server " + config.chatserver.serverURL);
                console.log("Response status " + response.status);

                if (errorCallback)
                    errorCallback();
            } else {
                console.log(response.body);
                var responseData = response.body;
                if (responseData.status === "success"){
                    if (successCallback)
                        successCallback(responseData.data);
                } else {
                    console.log("Failed to login to chat server "  + config.chatserver.serverURL);
                    if (errorCallback)
                        errorCallback();
                }                
            }
        });
}

function logout(token) {
    var requestURL = config.chatserver.serverURL + '/api/logout';
    
    unirest.post(requestURL)
        .header("X-Auth-Token", token.authToken)
        .header("X-User-Id", token.userId);
}

function registerUser(userName, userEmail, password, successCallback, errorCallback) {
    /*jshint validthis: true */
    var _this = this;
    var requestURL = config.chatserver.serverURL + '/api/bulk/register';
    
    var postConnect = function(token) {
        var data = {
            users: [ {email: userEmail,
                    name: userName,
                    pass: password} ]
            };
        console.log(data);

        unirest.post(requestURL)
            .header("X-Auth-Token", token.authToken)
            .header("X-User-Id", token.userId)
            .header("Content-Type", "application/json")
            .send(JSON.stringify(data))
            .end(function(response) {
                if (response.status !== 200) {
                    console.log("Failed to register to chat user");
                    console.log("Response status " + response.status);

                    if (errorCallback)
                        errorCallback();
                } else {
                    console.log(response.body);

                    _this.logout(token);

                    var responseData = response.body;
                    if (responseData.status === "success"){
                        if (successCallback)
                            successCallback();
                    } else {
                        console.log("Failed to login to chat server "  + config.chatserver.serverURL);
                        if (errorCallback)
                            errorCallback();
                    }            
                }
            });
    };
    
    login(postConnect, errorCallback);
}

function getPublicRooms(successCallback, errorCallback) {
    /*jshint validthis: true */
    var _this = this;
    var requestURL = config.chatserver.serverURL + '/api/publicRooms';
    
    var postConnect = function(token) {
        console.log(requestURL);
        unirest.get(requestURL)
            .header("X-Auth-Token", token.authToken)
            .header("X-User-Id", token.userId)
            .end(function(response) {
                console.log(response.body);

                if (response.status !== 200) {
                    console.log("Failed to get public rooms");
                    console.log("Response status " + response.status);

                    if (errorCallback)
                        errorCallback();
                } else {
                    
                    _this.logout(token);

                    var responseData = response.body;
                    if (responseData.status === "success"){
                        if (successCallback)
                            successCallback(responseData);
                    } else {
                        console.log("Failed to get public rooms "  + config.chatserver.serverURL);
                        if (errorCallback)
                            errorCallback();
                    }            
                }
            });
    };
    
    login(postConnect, errorCallback);
}


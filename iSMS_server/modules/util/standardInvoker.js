'use strict';

var path = require('path'),
    repository = require(path.resolve('./modules/dal/repository')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.invoke = function(res, obj, operation){

    var errorCallback = function(err){
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    };

    var successCallback = function(entity) {
        res.jsonp(entity);
    };

    operation(obj, successCallback, errorCallback);
};

exports.invokeRead = function(res, operation) {
    var errorCallback = function(err){
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    };

    var successCallback = function(entity) {
        res.jsonp(entity);
    };

    operation(successCallback, errorCallback);
};

exports.invokeMiddleware = function(modelName, req, res, next, id, entityReader, postReadAction) {
    if (!repository.isValidId(id)) {
        return res.status(400).send({
            message: modelName + ' is invalid'
        });
    }

    var errorCallback = function(err){
        return next(err);
    };

    var successCallback = function(entity) {
        if (!entity) {
            return res.status(404).send({
                message: 'No ' + modelName + ' with that identifier has been found'
            });
        }

        postReadAction(entity);
        next();
    };

    entityReader(id, successCallback, errorCallback);
};

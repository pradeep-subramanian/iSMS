'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  repository = require(path.resolve('./modules/dal/repository')),
  campaignRepository = new repository.Repository('Campaign');

exports.create = function(entity, successCallback, errorCallback) {
    adRepository.save(entity, function(err) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    });
};

exports.update = function(entity, successCallback, errorCallback) {
    adRepository.update(entity, function(err){
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    });
};

exports.delete = function(entity, successCallback, errorCallback) {
    adRepository.delete(entity, function(err) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    });
    adRepository.delete(entity, cb);
};

exports.list = function(params, successCallback, errorCallback) {
    adRepository.findAll(params, function(err, entities) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entities);
        }
    }, [{
      path: 'user',
      select: 'displayName' 
    }, {
        path: 'advertisement',
        select: 'name'
    }]);
};

exports.getItem = function(id, successCallback, errorCallback) {
    adRepository.findById(id, function(err, entity) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    }, [{
      path: 'user',
      select: 'displayName' 
    }, {
        path: 'advertisement',
        select: 'name'
    }]);
};

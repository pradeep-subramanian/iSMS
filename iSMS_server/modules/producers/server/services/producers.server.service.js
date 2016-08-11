'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  repository = require(path.resolve('./modules/dal/repository')),
  producerRepository = new repository.Repository('Producer');

exports.create = function(entity, successCallback, errorCallback) {
    producerRepository.save(entity, function(err) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    });
};

exports.update = function(entity, successCallback, errorCallback) {
    producerRepository.update(entity, function(err){
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    });
};

exports.delete = function(entity, successCallback, errorCallback) {
    producerRepository.delete(entity, function(err) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    });
    producerRepository.delete(entity, cb);
};

exports.list = function(params, successCallback, errorCallback) {
    producerRepository.findAll(params, function(err, entities) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entities);
        }
    }, [{
      path: 'user',
      select: 'displayName' 
    }]);
};

exports.getItem = function(id, successCallback, errorCallback) {
    producerRepository.findById(id, function(err, entity) {
        if (err) {
            errorCallback(err);
        } else {
            successCallback(entity);
        }
    }, [{
      path: 'user',
      select: 'displayName' 
    }]);
};

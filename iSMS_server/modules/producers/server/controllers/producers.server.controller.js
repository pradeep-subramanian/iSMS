'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  service = require('../services/producers.server.service'),
  Producer = mongoose.model('Producer'),
  standardInvoker = require(path.resolve('./modules/util/standardInvoker')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.create = function(req, res) {
  var producer = new Producer(req.body);
  producer.user = req.user;

  standardInvoker.invoke(res, producer, function(entity, successCallback, errorCallback){
    service.create(entity, successCallback, errorCallback);
  });
};

exports.read = function(req, res) {
  // convert mongoose document to JSON
  var producer = req.producer ? req.producer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  producer.isCurrentUserOwner = req.user && producer.user && producer.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(producer);
};

exports.update = function(req, res) {
  var producer = req.producer ;

  producer = _.extend(producer , req.body);

  standardInvoker.invoke(res, producer, function(entity, successCallback, errorCallback) {
    service.update(entity, successCallback, errorCallback);
  });
};

exports.delete = function(req, res) {
  var producer = req.producer ;

  standardInvoker.invoke(res, producer, function(entity, successCallback, errorCallback) {
    service.delete(entity, successCallback, errorCallback);
  });
};

exports.list = function(req, res) { 
  standardInvoker.invokeRead(res, function(successCallback, errorCallback) {
    service.list({}, successCallback, errorCallback);
  });
};

exports.producerByID = function(req, res, next, id) {

  standardInvoker.invokeMiddleware('Producer', req, res, next, id, function(idParam, successCallback, errorCallback) {
    service.getItem(idParam, successCallback, errorCallback);
  }, function(entity) {
    req.producer = entity;
  });
};

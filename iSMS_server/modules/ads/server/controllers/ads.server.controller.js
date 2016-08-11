'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  service = require('../services/ads.server.service'),
  Ad = mongoose.model('Ad'),
  standardInvoker = require(path.resolve('./modules/util/standardInvoker')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.create = function(req, res) {
  var ad = new Ad(req.body);
  ad.user = req.user;

  standardInvoker.invoke(res, ad, function(entity, successCallback, errorCallback){
    service.create(entity, successCallback, errorCallback);
  });
};

exports.read = function(req, res) {
  // convert mongoose document to JSON
  var ad = req.ad ? req.ad.toJSON() : {};
  
  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  ad.isCurrentUserOwner = req.user && ad.user && ad.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(ad);
};

exports.update = function(req, res) {
  var ad = req.ad;

  ad = _.extend(ad , req.body);

  standardInvoker.invoke(res, ad, function(entity, successCallback, errorCallback) {
    service.update(entity, successCallback, errorCallback);
  });
};

exports.delete = function(req, res) {
  var ad = req.ad ;

  standardInvoker.invoke(res, ad, function(entity, successCallback, errorCallback) {
    service.delete(entity, successCallback, errorCallback);
  });
};

exports.list = function(req, res) { 
  standardInvoker.invokeRead(res, function(successCallback, errorCallback) {
    service.list({}, successCallback, errorCallback);
  });
};

exports.adByID = function(req, res, next, id) {

  standardInvoker.invokeMiddleware('Ad', req, res, next, id, function(idParam, successCallback, errorCallback) {
    service.getItem(idParam, successCallback, errorCallback);
  }, function(entity) {
    req.ad = entity;
  });
};

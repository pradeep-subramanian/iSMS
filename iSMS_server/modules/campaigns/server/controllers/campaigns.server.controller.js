'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  service = require('../services/campaigns.server.service'),
  Campaign = mongoose.model('Campaign'),
  standardInvoker = require(path.resolve('./modules/util/standardInvoker')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.create = function(req, res) {
  var campaign = new Campaign(req.body);
  campaign.user = req.user;  

  standardInvoker.invoke(res, campaign, function(entity, successCallback, errorCallback){
    service.create(entity, successCallback, errorCallback);
  });
};

exports.read = function(req, res) {
  // convert mongoose document to JSON
  var campaign = req.campaign ? req.campaign.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  campaign.isCurrentUserOwner = req.user && campaign.user && campaign.user._id.toString() === req.user._id.toString() ? true : false;
  
  //res.jsonp(campaign);
  //res.write('['];
  res.write(JSON.stringify(campaign)); //new working
  //res.write(",");
  //res.write('{"Test": "hello"}');
  //res.write(']'];
 
  res.end();
};

exports.update = function(req, res) {
  var campaign = req.campaign ;

  campaign = _.extend(campaign , req.body);

  standardInvoker.invoke(res, campaign, function(entity, successCallback, errorCallback) {
    service.update(entity, successCallback, errorCallback);
  });
};

exports.delete = function(req, res) {
  var campaign = req.campaign ;

  standardInvoker.invoke(res, campaign, function(entity, successCallback, errorCallback) {
    service.delete(entity, successCallback, errorCallback);
  });
};

exports.list = function(req, res) { 
  standardInvoker.invokeRead(res, function(successCallback, errorCallback) {
    service.list({}, successCallback, errorCallback);
  });
};

exports.campaignByID = function(req, res, next, id) {

  standardInvoker.invokeMiddleware('Campaign', req, res, next, id, function(idParam, successCallback, errorCallback) {
    service.getItem(idParam, successCallback, errorCallback);
  }, function(entity) {
    req.ad = entity;
  });
};

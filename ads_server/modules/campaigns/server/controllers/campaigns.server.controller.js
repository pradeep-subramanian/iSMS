'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Campaign = mongoose.model('Campaign'),
  Ad = mongoose.model('Ad'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Campaign
 */
exports.create = function(req, res) {
  var campaign = new Campaign(req.body);
  campaign.user = req.user;  
  
  campaign.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(campaign);
    }
  });
};

/**
 * Show the current Campaign
 */
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

/**
 * Update a Campaign
 */
exports.update = function(req, res) {
  var campaign = req.campaign ;

  campaign = _.extend(campaign , req.body);

  campaign.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(campaign);
    }
  });
};

/**
 * Delete an Campaign
 */
exports.delete = function(req, res) {
  var campaign = req.campaign ;

  campaign.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(campaign);
    }
  });
};

/**
 * List of Campaigns
 */
exports.list = function(req, res) { 
	var query = Campaign.find({});
	query.sort('-created');
	query.populate('user', 'displayName');
	query.populate('advertisement', 'name');
	query.exec(function(err, campaigns) {
  //Campaign.find().sort('-created').populate('user', 'displayName').exec(function(err, campaigns) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(campaigns);
    }
  });
};

/**
 * Campaign middleware
 */
exports.campaignByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Campaign is invalid'
    });
  }

  Campaign.findById(id).populate('user', 'displayName').exec(function (err, campaign) {
    if (err) {
      return next(err);
    } else if (!campaign) {
      return res.status(404).send({
        message: 'No Campaign with that identifier has been found'
      });
    }
    req.campaign = campaign;
    next();
  });
};

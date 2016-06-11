'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Producer = mongoose.model('Producer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Producer
 */
exports.create = function(req, res) {
  var producer = new Producer(req.body);
  producer.user = req.user;

  producer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(producer);
    }
  });
};

/**
 * Show the current Producer
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var producer = req.producer ? req.producer.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  producer.isCurrentUserOwner = req.user && producer.user && producer.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(producer);
};

/**
 * Update a Producer
 */
exports.update = function(req, res) {
  var producer = req.producer ;

  producer = _.extend(producer , req.body);

  producer.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(producer);
    }
  });
};

/**
 * Delete an Producer
 */
exports.delete = function(req, res) {
  var producer = req.producer ;

  producer.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(producer);
    }
  });
};

/**
 * List of Producers
 */
exports.list = function(req, res) { 
  Producer.find().sort('-created').populate('user', 'displayName').exec(function(err, producers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(producers);
    }
  });
};

/**
 * Producer middleware
 */
exports.producerByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Producer is invalid'
    });
  }

  Producer.findById(id).populate('user', 'displayName').exec(function (err, producer) {
    if (err) {
      return next(err);
    } else if (!producer) {
      return res.status(404).send({
        message: 'No Producer with that identifier has been found'
      });
    }
    req.producer = producer;
    next();
  });
};

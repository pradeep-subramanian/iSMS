'use strict';

/**
 * main application route
 */
exports.renderIndex = function (req, res) {
  res.status(200).send();
};

/**
 * server error 
 */
exports.renderServerError = function (req, res) {
  res.status(500).send();
};

/**
 * not found response
 */
exports.renderNotFound = function (req, res) {
  res.status(404).send();
};

'use strict';

/**
 * Module dependencies
 */
var producersPolicy = require('../policies/producers.server.policy'),
  producers = require('../controllers/producers.server.controller');

module.exports = function(app) {
  // Producers Routes
  app.route('/api/producers').all(producersPolicy.isAllowed)
    .get(producers.list)
    .post(producers.create);

  app.route('/api/producers/:producerId').all(producersPolicy.isAllowed)
    .get(producers.read)
    .put(producers.update)
    .delete(producers.delete);

  // Finish by binding the Producer middleware
  app.param('producerId', producers.producerByID);
};

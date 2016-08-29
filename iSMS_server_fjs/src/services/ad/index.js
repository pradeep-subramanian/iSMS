'use strict';

const service = require('feathers-mongoose');
const ad = require('./ad-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: ad,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/ads', service(options));

  // Get our initialize service to that we can bind hooks
  const adService = app.service('/api/v1/ads');

  // Set up our before hooks
  adService.before(hooks.before);

  // Set up our after hooks
  adService.after(hooks.after);
};

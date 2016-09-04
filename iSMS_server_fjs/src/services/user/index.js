'use strict';

const user = require('./models/user.model');
const controller = require('./controllers/users.controller');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {};

  // Initialize our service with any options it requires
  app.use('/api/v1/users', new controller(options));

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/api/v1/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};

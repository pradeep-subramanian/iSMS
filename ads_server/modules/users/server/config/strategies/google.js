'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  users = require('../../controllers/users.server.controller');

module.exports = function (config) {
  // Use google strategy
  passport.use(new GoogleStrategy({
    clientID: '432491948867-of2p3nads1iu04jhgjerj4m05217b00c.apps.googleusercontent.com',
    clientSecret: 'DkTgIxczxLJCkmzORpjgs0ty',
    callbackURL: 'http://localhost:4000/',
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, done) {
    // Set the provider data and include tokens
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    // Create the user OAuth profile
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      username: profile.username,
      profileImageURL: (providerData.picture) ? providerData.picture : undefined,
      provider: 'google',
      providerIdentifierField: 'id',
      providerData: providerData
    };

    // Save the user OAuth profile
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};

'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Test = mongoose.model('Test');

/**
 * Globals
 */
var user1, test1;

/**
 * Unit tests
 */
describe('Test Model Unit Tests:', function() {
  beforeEach(function(done) {
    user1 = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user1.save(function() { 
      test1 = new Test({
        name: 'Test Name',
        user: user1
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return test1.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) { 
      test1.name = '';

      return test1.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Test.remove().exec(function(){
      User.remove().exec(function(){
        done();  
      });
    });
  });
});

'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Producer = mongoose.model('Producer'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, producer;

/**
 * Producer routes tests
 */
describe('Producer CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Producer
    user.save(function () {
      producer = {
        name: 'Producer name'
      };

      done();
    });
  });

  it('should be able to save a Producer if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Producer
        agent.post('/api/producers')
          .send(producer)
          .expect(200)
          .end(function (producerSaveErr, producerSaveRes) {
            // Handle Producer save error
            if (producerSaveErr) {
              return done(producerSaveErr);
            }

            // Get a list of Producers
            agent.get('/api/producers')
              .end(function (producersGetErr, producersGetRes) {
                // Handle Producer save error
                if (producersGetErr) {
                  return done(producersGetErr);
                }

                // Get Producers list
                var producers = producersGetRes.body;

                // Set assertions
                (producers[0].user._id).should.equal(userId);
                (producers[0].name).should.match('Producer name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Producer if not logged in', function (done) {
    agent.post('/api/producers')
      .send(producer)
      .expect(403)
      .end(function (producerSaveErr, producerSaveRes) {
        // Call the assertion callback
        done(producerSaveErr);
      });
  });

  it('should not be able to save an Producer if no name is provided', function (done) {
    // Invalidate name field
    producer.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Producer
        agent.post('/api/producers')
          .send(producer)
          .expect(400)
          .end(function (producerSaveErr, producerSaveRes) {
            // Set message assertion
            (producerSaveRes.body.message).should.match('Please fill Producer name');

            // Handle Producer save error
            done(producerSaveErr);
          });
      });
  });

  it('should be able to update an Producer if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Producer
        agent.post('/api/producers')
          .send(producer)
          .expect(200)
          .end(function (producerSaveErr, producerSaveRes) {
            // Handle Producer save error
            if (producerSaveErr) {
              return done(producerSaveErr);
            }

            // Update Producer name
            producer.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Producer
            agent.put('/api/producers/' + producerSaveRes.body._id)
              .send(producer)
              .expect(200)
              .end(function (producerUpdateErr, producerUpdateRes) {
                // Handle Producer update error
                if (producerUpdateErr) {
                  return done(producerUpdateErr);
                }

                // Set assertions
                (producerUpdateRes.body._id).should.equal(producerSaveRes.body._id);
                (producerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Producers if not signed in', function (done) {
    // Create new Producer model instance
    var producerObj = new Producer(producer);

    // Save the producer
    producerObj.save(function () {
      // Request Producers
      request(app).get('/api/producers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Producer if not signed in', function (done) {
    // Create new Producer model instance
    var producerObj = new Producer(producer);

    // Save the Producer
    producerObj.save(function () {
      request(app).get('/api/producers/' + producerObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', producer.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Producer with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/producers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Producer is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Producer which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Producer
    request(app).get('/api/producers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Producer with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Producer if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Producer
        agent.post('/api/producers')
          .send(producer)
          .expect(200)
          .end(function (producerSaveErr, producerSaveRes) {
            // Handle Producer save error
            if (producerSaveErr) {
              return done(producerSaveErr);
            }

            // Delete an existing Producer
            agent.delete('/api/producers/' + producerSaveRes.body._id)
              .send(producer)
              .expect(200)
              .end(function (producerDeleteErr, producerDeleteRes) {
                // Handle producer error error
                if (producerDeleteErr) {
                  return done(producerDeleteErr);
                }

                // Set assertions
                (producerDeleteRes.body._id).should.equal(producerSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Producer if not signed in', function (done) {
    // Set Producer user
    producer.user = user;

    // Create new Producer model instance
    var producerObj = new Producer(producer);

    // Save the Producer
    producerObj.save(function () {
      // Try deleting Producer
      request(app).delete('/api/producers/' + producerObj._id)
        .expect(403)
        .end(function (producerDeleteErr, producerDeleteRes) {
          // Set message assertion
          (producerDeleteRes.body.message).should.match('User is not authorized');

          // Handle Producer error error
          done(producerDeleteErr);
        });

    });
  });

  it('should be able to get a single Producer that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Producer
          agent.post('/api/producers')
            .send(producer)
            .expect(200)
            .end(function (producerSaveErr, producerSaveRes) {
              // Handle Producer save error
              if (producerSaveErr) {
                return done(producerSaveErr);
              }

              // Set assertions on new Producer
              (producerSaveRes.body.name).should.equal(producer.name);
              should.exist(producerSaveRes.body.user);
              should.equal(producerSaveRes.body.user._id, orphanId);

              // force the Producer to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Producer
                    agent.get('/api/producers/' + producerSaveRes.body._id)
                      .expect(200)
                      .end(function (producerInfoErr, producerInfoRes) {
                        // Handle Producer error
                        if (producerInfoErr) {
                          return done(producerInfoErr);
                        }

                        // Set assertions
                        (producerInfoRes.body._id).should.equal(producerSaveRes.body._id);
                        (producerInfoRes.body.name).should.equal(producer.name);
                        should.equal(producerInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Producer.remove().exec(done);
    });
  });
});

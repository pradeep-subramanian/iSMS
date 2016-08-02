'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    options: {
      // Stream defaults to process.stdout
      // Uncomment/comment to toggle the logging to a log on the file system
      //stream: {
      //  directoryPath: process.cwd(),
      //  fileName: 'access.log',
      //  rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
      //    active: false, // activate to use rotating logs 
      //    fileName: 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
      //    frequency: 'daily',
      //    verbose: false
      //  }
      //}
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '631229007033798',
    clientSecret: process.env.FACEBOOK_SECRET || 'd8684f5851d6e962ca7253719c669146',
    callbackURL: 'http://localhost:4000/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'JqNArj4lHz0ONLhyrTvu43YoC',
    clientSecret: process.env.TWITTER_SECRET || 'Tqx8RjL1WPosLYtJON88MuHrOLzYmPMv3ReBDBqCR4LcPkjcCl',
    callbackURL: 'http://localhost:4000/api/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '432491948867-of2p3nads1iu04jhgjerj4m05217b00c.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'DkTgIxczxLJCkmzORpjgs0ty',
    callbackURL: 'http://localhost:4000/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || '81gjktc1s1557p',
    clientSecret: process.env.LINKEDIN_SECRET || 'Nn4HCLKm4DjBPc1Y',
    callbackURL: 'http://localhost:4000/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || '95b10f8543a3cfff7108',
    clientSecret: process.env.GITHUB_SECRET || '43ed33037cdfad0b7de811f52aa402a8bc090ae0',
    callbackURL: 'http://localhost:4000/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: 'http://localhost:4000/api/auth/paypal/callback',
    sandbox: true
  },
  chatserver: {
    serverURL: process.env.CHAT_SERVER_URL || 'http://localhost:3000',
    auth: {
      secretURL: 'fzTohJyTHRbm72dWu',
      adminUser: process.env.CHAT_ADMIN_USER_ID || 'test',
      adminPass: process.env.CHAT_ADMIN_USER_PASSWORD || 'test'      
    }
  },
  mailer: {
    from: process.env.MAILER_FROM || 'ismspt22@gmail.com',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'ismspt22@gmail.com',
        pass: process.env.MAILER_PASSWORD || 'Singapore123'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: process.env.MONGO_SEED === 'true' ? true : false,
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS === 'false' ? false : true,
      seedUser: {
        username: process.env.MONGO_SEED_USER_USERNAME || 'user',
        provider: 'local',
        email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
        firstName: 'User',
        lastName: 'Local',
        displayName: 'User Local',
        roles: ['user']
      },
      seedAdmin: {
        username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
        provider: 'local',
        email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        displayName: 'Admin Local',
        roles: ['user', 'admin']
      }
    }
  }
};

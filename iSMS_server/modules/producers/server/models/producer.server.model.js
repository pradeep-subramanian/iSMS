'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Producer Schema
 */
var ProducerSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Producer name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Producer', ProducerSchema);

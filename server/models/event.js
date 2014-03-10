'use strict';

// Events model

var mongoose = require('mongoose');

var LocalUserSchema = new mongoose.Schema({
  submitTime: {
    type: Date,
    default: Date.now
  },
  name: String,
  startTime: String,
  endTime: String,
  location: {
    name: String,
    lat: Number,
    lon: Number
  }
});

mongoose.model('Event', LocalUserSchema);



'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event');

module.exports = {

  getAll: function(req, res, next) {
    Event.find({}, function (err, events) {
      if (err) return console.log(err);
      return res.json({events: events});
    });
  },

  getOne: function(req, res, next) {
    var id = req.params.id;
    if (!id) return next(new Error('No event id specified.'));
    Event.findOne({_id: id}, function(err, event) {
      if (err) {
        console.log(err);
        return next(new Error('There was a problem getting that event.'));
      }
      if (!event) {
        return next(new Error('That event does not exist.'));
      }
      return res.json(event);
    });
  },

  create: function(req, res, next) {
    var data = req.body;
    var newEvent = new Event({
      startTime: data.startTime,
      endTime: data.endTime,
      location: {
        name: data.location.name,
        lat: data.location.lat,
        lon: data.location.lon
      }
    });
    newEvent.save(function(error) {
      if (error) {
        return next(new Error('There was a problem creating the event.'));
      } else {
        res.json({
          success: true,
          message: 'Event successfully created.'
        });
      }
    });
  }

};

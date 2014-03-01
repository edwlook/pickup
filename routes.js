'use strict';

var events = require('./controllers/events'),
    mw = require('./middleware');

module.exports = function(app) {

  app.get('/events', events.getAll);

  app.post('/events', mw.createValidate, events.create);

};

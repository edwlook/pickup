'use strict';

var events = require('./controllers/events'),
    mw = require('./middleware');

module.exports = function(app) {

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   });

  app.get('/events', events.getAll);

  app.get('/events/:id', events.getOne);

  app.post('/events', mw.createValidate, events.create);

};

'use strict';

var path = require('path'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    mw = require('./middleware'),
    db = require('./db');

module.exports = function(app, express) {

  // Connect to MongoDB
  var mongoUrl = db.dev;

  if ('production' === app.get('env')) {
    mongoUrl = db.prod;
  }

  mongoose.connect(mongoUrl, function(err) {
    if (err) throw err;
    console.log('Mongoose connection successful');
  });

  // Load models
  var models_path = __dirname + '/models';
  var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);
      if (stat.isFile()) {
        if (/(.*)\.(js$|coffee$)/.test(file)) {
          require(newPath);
        }
      } else if (stat.isDirectory()) {
        walk(newPath);
      }
    });
  };
  walk(models_path);

  // Middleware
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(mw.customErrorHandler);

  if ('development' === app.get('env')) {
    app.use(express.errorHandler());
  }
};

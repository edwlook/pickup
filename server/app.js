'use strict';

/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    mw = require('./middleware');


var app = express();

// Connect to mongodb
var mongoDev = 'mongodb://localhost/pickup';
var mongoUrl = 'mongodb://pickup-user:treehouse@ds033449.mongolab.com:33449/pickup';
mongoose.connect(mongoDev, function(error) {
  if (error) throw error;
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

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(mw.customErrorHandler);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Load routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

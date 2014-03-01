
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');


var app = express();

// Connect to mongodb
mongoUrl = 'mongodb://pickup-user:treehouse@ds033449.mongolab.com:33449/pickup';
mongoose.connect(mongoUrl, function(error) {
  if (error) throw error;
  console.log('Mongoose connection successful');
});

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.send('Jello world');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

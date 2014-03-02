'use strict';

var express = require('express'),
    http = require('http'),
    app = express();

// Load config
require('./config')(app, express);

// Load routes
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log(app.get('env') + ' started on port ' + app.get('port'));
});

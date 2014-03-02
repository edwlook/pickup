'use strict';

module.exports = {

  createValidate: function(req, res, next) {
    var data = req.body;
    if (!data || !data.endTime || !data.location || !data.location.name || !data.location.lat || !data.location.lon) {
      return next(new Error('Not enough info given to create event.'));
    } else {
      return next();
    }
  },
  customErrorHandler: function(err, req, res, next) {
    console.log(err.stack);
    res.json({
      success: false,
      message: err.message
    });
  }

};

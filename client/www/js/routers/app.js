define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {

  return Backbone.Router.extend({
    routes: {
      "": 'index'
    },
    index: function() {
      new AppView();
    }
  });

});
define([
  'backbone'
], function(Backbone) {

  return Backbone.Router.extend({
    routes: {
      "/": 'test'
    },

    test: function() {
      console.log('test');
    }
  });

});
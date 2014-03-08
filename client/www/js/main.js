(function() {
'use strict';

require.config({
    'baseUrl': 'js/',
    paths: {
      'text': 'util/text',
      'jquery': 'util/jquery.min',
      'hammer': 'util/hammer.min',
      'backbone': 'util/backbone.min',
      'fastclick': 'util/fastclick',
      'bootstrap': 'util/bootstrap.min.js',
      'underscore': 'util/underscore.min',

      'app': 'app',
      'models': 'models',
      'collections': 'collections',
      'routers': 'routers',
      'views': 'views',
      'templates': '../templates'
    },
    shim: {
      'underscore': { exports: '_' },
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'models': {deps: ['backbone'], exports: 'models'},
      'collections': {deps: ['backbone'], exports: 'collections'},
      'routers': {deps: ['backbone'], exports: 'routers'},
      'templates': {deps: ['backbone'], exports: 'templates'},
      'views': {deps: ['backbone'], exports: 'views'}
    }
});

// beginning of application logic
require(['jquery', 'fastclick', 'app'], function($, FastClick, App) {

  $(function() {
    $.support.cors = true;
    FastClick.attach(document.body);
  });

  // load the core application once device is ready
  function onDeviceReady() {
    console.log('deviceready');
    new App();
  }

  document.addEventListener('deviceready', onDeviceReady, false);

});

})();
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    console.log('Received Event: ' + id);
    app.initializeMap();
  },
  initializeMap: function() {
    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(37.871076, -122.2594582),
      disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var map_el = document.getElementById('map-canvas');

    // Register hold to add marker listeners
    Hammer(map_el).on('hold', function() {
      var list = google.maps.event.addListener(map, 'click', function(e) {
        var position = e.latLng;
        app.placeMarker(position, map);
        map.panTo(position);
      });
      Hammer(map_el).on('release', function() {
        setTimeout(function() {
          google.maps.event.removeListener(list);
          Hammer(map_el).off('release');
        }, 1);
      });
    });

    // Register marker unfocus listeners
    google.maps.event.addListener(map, 'click', function() {
      var map_el = $('#map-canvas');
      map_el.removeClass('small');
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
      map.panTo(center);
    });

    // Load existing markers
    this.loadMapLocs(map);
  },
  placeMarker: function(position, map) {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', function() {
      var map_el = $('#map-canvas');
      map_el.addClass('small');
      var center = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(center);
      map.panTo(position);
    });
  },
  loadMapLocs: function(map) {
    $.ajax({
      type: 'GET',
      url: 'http://hidden-escarpment-3579.herokuapp.com/events',
      cache: 'false'
    }).done(function(data) {
      for (var i = 0, len = data.events.length; i < len; i++) {
        var event = data.events[i];
        var position = new google.maps.LatLng(event.location.lat, event.location.lon);
        app.placeMarker(position, map);
      }
    });
  }
};

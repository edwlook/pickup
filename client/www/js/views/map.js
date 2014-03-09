define([
	'backbone',
], function(Backbone){

	return Backbone.View.extend({
		map: null,
		id: 'map-view',
		initialize: function() {
			this.render();
		},
		render: function() {
			this.initMap();
			return this;
		},
		initMap: function() {
			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(37.871076, -122.2594582),
				disableDefaultUI: true
			};
			console.log(this.$el);

			// not sure why we can't use this.$el
			this.map = new google.maps.Map($('#map-view')[0], mapOptions);
		}

	});

});


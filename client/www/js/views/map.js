define([
	'backbone',
], function(Backbone){

	return Backbone.View.extend({
		id: 'map-canvas',
		template: _.template(),
		initialize: function() {
			this.render();
		},
		render: function() {
			console.log(this.$el);
			this.$el.html(this.template());
			
			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(37.871076, -122.2594582),
				disableDefaultUI: true
			};

			var map = new google.maps.Map(this.$el, mapOptions);

			return this;
		}

	});

});


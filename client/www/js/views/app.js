define([
	'backbone',
	'views/map',
	'text!templates/app.html'
], function(Backbone, MapView, AppTemplate){
	
	return Backbone.View.extend({
		template: _.template(AppTemplate),
		el: 'body',
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(this.template());
			new MapView();
			return this;
		},
	});

});


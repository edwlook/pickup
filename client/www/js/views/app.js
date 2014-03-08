define([
	'backbone',
	'views/map',
	'text!templates/app.html'
], function(Backbone, MapView, AppTemplate){
	
	return Backbone.View.extend({
		tagname: 'div',
		el: 'body',
		id: 'app-view',
		template: _.template(''),
		initialize: function() {
			new MapView();
			this.render();
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}

	});

});


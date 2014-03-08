define([
	'routers/app'
], function(AppR){
	
	return function() {
		new AppR();
		Backbone.history.start();
	};

});
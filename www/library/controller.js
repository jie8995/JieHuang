
var app = new function(app) {
	
	app.makeHotSpots = function(assets, pages) {

		zog("hotSpots");
		
		var hs = new zim.HotSpots([
			{page:assets.main, rect:[0,0,100,100], call:goHome},
			{page:assets.main, rect:assets.mainThing, call:function(){pages.go(assets.info, "right");} }]
		
		);	
		
		function goHome() {
			zog("home");	
		}
		
	}	
	
	return app;
}(app || {});
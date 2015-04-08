
// view
zog("hi from view.js");

var app = function(app) {
	
app.makeHorizontalPages = function(layoutManager, gridManager, guideManager) {
		
		zog("pages");
		
		p = {};
		
		p.main = new createjs.Container();		
		p.main.name = "main";	
		p.main.setBounds(0,0,stageW,stageH);
		
		var logo = new zim.Rectangle(100, 100, "orange");	
		logo.setBounds(0,0,100,100);

		var logoImage = new Image();
		logoImage.src = "pic/logo.jpg";
		var logoImg = new createjs.Bitmap(logoImage);
		
		logo.addChild(logoImg);
		p.main.addChild(logo);
		
		var content = p.main.content = new createjs.Container();
		content.setBounds(0,0,512,600);

		tool = new createjs.Container();
	
		var w = 512; var h = 512;   
		var avatar = new createjs.Container();
		avatar.setBounds(0,0,w,h);
		avatar.x = w/2;
		avatar.y = h/2;
		avatar.regX = w/2;
		avatar.regY = h/2;
		tool.addChild(avatar);
		
		var dinosaurImage = new Image();
		dinosaurImage.src = "pic/dinosaur.png";
		avatar.body = new createjs.Bitmap(dinosaurImage);
		avatar.addChild(avatar.body);
		
		// create a container for all the avatar parts 
		avatar.parts = new createjs.Container();
		avatar.addChild(avatar.parts);
		zim.drag(avatar.parts, null, null, null, null, true); // turn on mousedowns
		
		var text = new createjs.Text("Oh man I'm hungry...", "20px Arial", "black");
		text.x = avatar.x - 50;
		text.y = avatar.y - avatar.getBounds().height / 2.5;
		tool.addChild(text);
		
		var tray = new createjs.Container();
		tray.h = avatar.getBounds().height/5;
		tray.w = avatar.getBounds().width;
		tray.setBounds(0,0,tray.w,tray.h);
		tray.y = avatar.y + avatar.getBounds().width / 2 ;
		tray.x = avatar.x - avatar.getBounds().height / 2;
		tool.addChild(tray);
		
	
		tray.parts = new createjs.Container();
		tray.addChild(tray.parts);
		zim.drag(tray.parts, null, null, null, null, true);
		
		// make a part
	
		var gap = 13;
		
		var hamburgerImage = new Image();
		hamburgerImage.src = "pic/hamburger.png";
		var hamburger = new createjs.Bitmap(hamburgerImage);
		tray.parts.addChild(hamburger);
		hamburger.startX = hamburger.x = 30;
		hamburger.startY = hamburger.y = gap;
		hamburger.scaleX = hamburger.scaleY = hamburger.scale = .6;
		
		var hotdogImage = new Image();
		hotdogImage.src = "pic/hotdog.png";
		var hotdog = new createjs.Bitmap(hotdogImage);
		tray.parts.addChild(hotdog);
		hotdog.startX = hotdog.x = hamburger.x + gap*9;
		hotdog.startY = hotdog.y = gap;
		hotdog.scaleX = hotdog.scaleY = hotdog.scale = .6;	
			
		var donutImage = new Image();
		donutImage.src = "pic/donut.png";
		var donut = new createjs.Bitmap(donutImage);
		tray.parts.addChild(donut);
		donut.startX = donut.x = hotdog.x + gap*9;
		donut.startY = donut.y = gap;
		donut.scaleX = donut.scaleY = donut.scale = .6;	
		
		var pizzaImage = new Image();
		pizzaImage.src = "pic/pizza.png";
		var pizza = new createjs.Bitmap(pizzaImage);
		tray.parts.addChild(pizza);
		pizza.startX = pizza.x = donut.x + gap*9;
		pizza.startY = pizza.y = gap;
		pizza.scaleX = pizza.scaleY = pizza.scale = .6;		
			

		tray.parts.on("mousedown", function(e) {
			//tool.addChild(tray); // bring tray to top
			// create a new part to take the place of the old part
			var copy = e.target.clone();
			copy.startX = e.target.startX; // clones do not get custom properties
			copy.startY = e.target.startY;
			tray.parts.addChildAt(copy, 0);
			tray.parts.addChild(e.target); // put above other parts in tray
		});
		
		avatar.parts.on("mousedown", function(e) {
			//tool.addChild(avatar); // bring avatar to top
			avatar.parts.addChild(e.target); // bring to top
		});
	
		tray.parts.on("pressup", checkPart);
		avatar.parts.on("pressup", checkPart);
		
		function checkPart(e) {
			zog("dropping");
	
		var obj = e.target;
		
		if (zim.hitTestReg(avatar.body, obj)) {
			// transfer object to avatar frame of reference and move to avatar parts
			var point = obj.parent.localToLocal(obj.x, obj.y, avatar.parts);
			obj.x = point.x;
			obj.y = point.y;
			avatar.parts.addChild(obj);
			
			if(avatar.parts.numChildren == 1){
				text.text = "Yummy!";		
			}	
			if(avatar.parts.numChildren == 2){
				text.text = "KEEP GOING!";		
			}	
			if(avatar.parts.numChildren == 3){
				text.text = "Can I have more?";		
			}			
			if(avatar.parts.numChildren == 4){
				text.text = "Could not be happier!";		
			}			
			if(avatar.parts.numChildren == 5){
				text.text = "Okay I'm full..";		
			}				
			if(avatar.parts.numChildren == 6){
				text.text = "Are you gonna continue?!";		
			}	
			if(avatar.parts.numChildren == 7){
				text.text = "Are you kidding me? I'm full!!";		
			}
			if(avatar.parts.numChildren == 8){
				text.text = "STOP!!";		
			}
			if(avatar.parts.numChildren == 9){
				text.text = "I don't wanna see you again..";		
			}			
			if(avatar.parts.numChildren == 10){
				text.text = "I've gained 5kg weight. HAPPY NOW??";		
			}
									
		} else {
			// transfer object to parts frame of reference and animate to start
			var point = obj.parent.localToLocal(obj.x, obj.y, tray.parts);
			obj.x = point.x;
			obj.y = point.y;
			tray.parts.addChild(obj);
			zim.move(obj, obj.startX, obj.startY, 200, null, function() {
				tray.parts.removeChild(obj);
				obj = null;
			});
		}
		stage.update();
	}

		content.addChild(tool);
		p.main.addChild(content);
	
/*		gridManager.add( new zim.Grid(content) );
		guideManager.add( new zim.Guide(content) );
		guideManager.add( new zim.Guide(content, false) );*/
		
		zog(layoutManager);
		
		var mainParts = [
			{object:logo, marginLeft:5, maxHeight:90, width:20, valign:"top"},
			{object:content, marginLeft:5, maxHeight:90, valign:"middle", align:"middle", backgroundColor:"#F2F2F2"}
		];
		
		var mainLayout = new zim.Layout(p.main, mainParts, 5, "#F2F2F2", false, 0, stage);
		
		layoutManager.add(mainLayout);	


		p.info = new createjs.Container();		
		p.info.name = "info";		
		var infoBacking = new zim.Rectangle(stageW, stageH, "yellow");	
		infoBacking.setBounds(0,0,stageW,stageH);
		p.info.addChild(infoBacking);

		var introContainer = new createjs.Container();
		introContainer.setBounds(0,0,200,200);
		infoBacking.addChild(introContainer);
		
		var introImage = new Image();
		introImage.src = "pic/intro.png";
		var intro = new createjs.Bitmap(introImage);
		introContainer.addChild(intro);
		
		var mainParts2 = [ 
			{object:infoBacking, marginTop:5, maxWidth:100, minHeight:100, align:"middle", valign:"top"}];
		
		var mainLayout = new zim.Layout(p.info, mainParts2, 5, "#F2F2F2", true, 0, stage);
	
		return p;
		
	}
	
	app.makeVerticalPages = function(layoutManager, gridManager, guideManager) {
		
		zog("pages");
		
		p = {};
		
		p.main = new createjs.Container();		
		p.main.name = "main";	
		p.main.setBounds(0,0,stageW,stageH);
		
		var logo = new zim.Rectangle(100, 100, "orange");	
		logo.setBounds(0,0,100,100);

		var logoImage = new Image();
		logoImage.src = "pic/logo.jpg";
		var logoImg = new createjs.Bitmap(logoImage);
	
		logo.addChild(logoImg);
		p.main.addChild(logo);
		
		var content = p.main.content = new createjs.Container();
		content.setBounds(0,0,512,600);

		tool = new createjs.Container();
	
		var w = 512; var h = 512;   
		var avatar = new createjs.Container();
		avatar.setBounds(0,0,w,h);
		avatar.x = w/2;
		avatar.y = h/2;
		avatar.regX = w/2;
		avatar.regY = h/2;
		tool.addChild(avatar);
		
		var dinosaurImage = new Image();
		dinosaurImage.src = "pic/dinosaur.png";
		avatar.body = new createjs.Bitmap(dinosaurImage);
		avatar.addChild(avatar.body);
		
		// create a container for all the avatar parts 
		avatar.parts = new createjs.Container();
		avatar.addChild(avatar.parts);
		zim.drag(avatar.parts, null, null, null, null, true); // turn on mousedowns
		
		var text = new createjs.Text("Oh man I'm hungry...", "20px Arial", "black");
		text.x = avatar.x - 50;
		text.y = avatar.y - avatar.getBounds().height / 2.5;
		tool.addChild(text);
		
		var tray = new createjs.Container();
		tray.h = avatar.getBounds().height/5;
		tray.w = avatar.getBounds().width;
		tray.setBounds(0,0,tray.w,tray.h);
		tray.y = avatar.y + avatar.getBounds().width / 2 ;
		tray.x = avatar.x - avatar.getBounds().height / 2;
		tool.addChild(tray);
		
		// make a backing for the tray
		tray.parts = new createjs.Container();
		tray.addChild(tray.parts);
		zim.drag(tray.parts, null, null, null, null, true);
		
		// make a part
		var gap = 13;
		
		var hamburgerImage = new Image();
		hamburgerImage.src = "pic/hamburger.png";
		var hamburger = new createjs.Bitmap(hamburgerImage);
		tray.parts.addChild(hamburger);
		hamburger.startX = hamburger.x = 30;
		hamburger.startY = hamburger.y = gap;
		hamburger.scaleX = hamburger.scaleY = hamburger.scale = .6;
		
		var hotdogImage = new Image();
		hotdogImage.src = "pic/hotdog.png";
		var hotdog = new createjs.Bitmap(hotdogImage);
		tray.parts.addChild(hotdog);
		hotdog.startX = hotdog.x = hamburger.x + gap*9;
		hotdog.startY = hotdog.y = gap;
		hotdog.scaleX = hotdog.scaleY = hotdog.scale = .6;	
			
		var donutImage = new Image();
		donutImage.src = "pic/donut.png";
		var donut = new createjs.Bitmap(donutImage);
		tray.parts.addChild(donut);
		donut.startX = donut.x = hotdog.x + gap*9;
		donut.startY = donut.y = gap;
		donut.scaleX = donut.scaleY = donut.scale = .6;	
		
		var pizzaImage = new Image();
		pizzaImage.src = "pic/pizza.png";
		var pizza = new createjs.Bitmap(pizzaImage);
		tray.parts.addChild(pizza);
		pizza.startX = pizza.x = donut.x + gap*9;
		pizza.startY = pizza.y = gap;
		pizza.scaleX = pizza.scaleY = pizza.scale = .6;		
	
		tray.parts.on("mousedown", function(e) {
			tool.addChild(tray); // bring tray to top
			// create a new part to take the place of the old part
			var copy = e.target.clone();
			copy.startX = e.target.startX; // clones do not get custom properties
			copy.startY = e.target.startY;
			tray.parts.addChildAt(copy, 0);
			tray.parts.addChild(e.target); // put above other parts in tray
		});
		
		avatar.parts.on("mousedown", function(e) {
			tool.addChild(avatar); // bring avatar to top
			avatar.parts.addChild(e.target); // bring to top
		});
	
		tray.parts.on("pressup", checkPart);
		avatar.parts.on("pressup", checkPart);
		
		function checkPart(e) {
			zog("dropping");
	
		var obj = e.target;
		
		if (zim.hitTestReg(avatar.body, obj)) {
			// transfer object to avatar frame of reference and move to avatar parts
			var point = obj.parent.localToLocal(obj.x, obj.y, avatar.parts);
			obj.x = point.x;
			obj.y = point.y;
			avatar.parts.addChild(obj);
			
			if(avatar.parts.numChildren == 1){
				text.text = "Yummy!";		
			}	
			if(avatar.parts.numChildren == 2){
				text.text = "KEEP GOING!";		
			}	
			if(avatar.parts.numChildren == 3){
				text.text = "Can I have more?";		
			}			
			if(avatar.parts.numChildren == 4){
				text.text = "Could not be happier!";		
			}			
			if(avatar.parts.numChildren == 5){
				text.text = "Okay I'm full..";		
			}				
			if(avatar.parts.numChildren == 6){
				text.text = "Are you gonna continue?!";		
			}	
			if(avatar.parts.numChildren == 7){
				text.text = "Are you kidding me? I'm full!!";		
			}
			if(avatar.parts.numChildren == 8){
				text.text = "STOP!!";		
			}
			if(avatar.parts.numChildren == 9){
				text.text = "I don't wanna see you again..";		
			}			
			if(avatar.parts.numChildren == 10){
				text.text = "I've gained 5kg weight. HAPPY NOW??";		
			}
									
		} else {
			// transfer object to parts frame of reference and animate to start
			var point = obj.parent.localToLocal(obj.x, obj.y, tray.parts);
			obj.x = point.x;
			obj.y = point.y;
			tray.parts.addChild(obj);
			zim.move(obj, obj.startX, obj.startY, 200, null, function() {
				tray.parts.removeChild(obj);
				obj = null;
			});
		}
		stage.update();
	}
	
		
		content.addChild(tool);
		p.main.addChild(content);
		
		zog(layoutManager);
		
		var mainParts = [ 
			{object:logo, marginTop:5, maxWidth:80, minHeight:20, align:"middle", valign:"top"},
			{object:content, marginTop:5, maxWidth:80, backgroundColor:"#F2F2F2"}];
		
		var mainLayout = new zim.Layout(p.main, mainParts, 5, "#F2F2F2", true, 0, stage);

		
		layoutManager.add(mainLayout);	
		
		
		p.info = new createjs.Container();		
		p.info.name = "info";		
		var infoBacking = new zim.Rectangle(stageW, stageH, "yellow");	
		infoBacking.setBounds(0,0,stageW,stageH);
		p.info.addChild(infoBacking);
		
		var introContainer = new createjs.Container();
		introContainer.setBounds(0,0,200,200);
		infoBacking.addChild(introContainer);
		
		var introImage = new Image();
		introImage.src = "pic/intro.png";
		var intro = new createjs.Bitmap(introImage);
		introContainer.addChild(intro);
		
		var mainParts2 = [ 
			{object:infoBacking, marginTop:5, maxWidth:100, minHeight:100, align:"middle", valign:"top"}];
		
		var mainLayout = new zim.Layout(p.info, mainParts2, 5, "#F2F2F2", true, 0, stage);
				
		return p;
		
	}	
	
	
	return app;
	
}(app || {});
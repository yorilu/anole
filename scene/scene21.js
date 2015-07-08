;require(['anole', 'zepto','TweenLite','TimelineLite'], function(anole, Scene){
    
	var scene = new anole.Scene(21, anole.canvas, false);
	scene.createDom = function() {
		this.container = $("<div id='scene21' class='scene'></div>")
		this.tab = $("<div></div>").addClass("lung-tab").appendTo(this.container);
		this.plate = $("<div></div>").addClass("lung-plate").appendTo(this.tab);
		this.lungm = $("<div></div>").addClass("lung-m").appendTo(this.plate);
		this.lungf = $("<div></div>").addClass("lung-f").appendTo(this.plate);
		return this.container;
	}
	
	scene.animation = function() {
		var dt = 0.6;
		this.tl.to(this.tab,dt,{y:"0%",opacity:1})
				.to(this.lungm,dt/2,{y:"0%", ease: Elastic.easeInOut})
				.to(this.lungf,dt/2,{y:"0%", ease: Elastic.easeInOut,delay:dt})
	}
	anole.addScene(scene);
})

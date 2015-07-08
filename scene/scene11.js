;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(11, anole.canvas, false);
    scene.name = 'scene11.js';
	scene.createDom = function() {
		this.container = $("<div id='scene11' class='scene'></div>")
		var bg = $("<div></div>").addClass("bg11").appendTo(this.container);
		this.c00 = $("<div id='cana00'></div>").addClass("canadian").appendTo(bg);
		this.c10 = $("<div id='cana10'></div>").addClass("canadian").appendTo(bg);
		this.c20 = $("<div id='cana20'></div>").addClass("canadian").appendTo(bg);
		this.c01 = $("<div id='cana01'></div>").addClass("canadian umbrella").appendTo(bg);
		this.c11 = $("<div id='cana11'></div>").addClass("canadian umbrella").appendTo(bg);
		this.c21 = $("<div id='cana21'></div>").addClass("canadian lovechina").appendTo(bg);
		this.k0 = $("<div id='k0'></div>").addClass("canadian k0").appendTo(bg);
		this.k1 = $("<div id='k1'></div>").addClass("canadian k1").appendTo(bg);
		this.k2 = $("<div id='k2'></div>").addClass("canadian k2").appendTo(bg);
		this.q0 = $("<div id='q0'><p>?</p></div>").addClass("question q0").appendTo(bg);
		this.q1 = $("<div id='q1'><p>?</p></div>").addClass("question q1").appendTo(bg);
		this.q2 = $("<div id='q2'><p>?</p></div>").addClass("question q2").appendTo(bg);
		return this.container;
	}
	
	scene.animation = function() {
		var timedelta = 0.25;
		this.tl.to(this.c00,timedelta*2,{rotationY:450,delay:timedelta*5})
				.to(this.c01,timedelta*2,{rotationY:0})
				.to(this.c10,timedelta*2,{rotationY:450})
				.to(this.c11,timedelta*2,{rotationY:0})
				.to(this.c20,timedelta*2,{rotationY:450})
				.to(this.c21,timedelta*2,{rotationY:0})
				.to(this.c01,timedelta,{rotationY:450,delay:timedelta*2})
				.to(this.k0,timedelta,{rotationY:0})
				.to(this.c11,timedelta,{rotationY:450})
				.to(this.k1,timedelta,{rotationY:0})
				.to(this.c21,timedelta,{rotationY:450})
				.to(this.k2,timedelta,{rotationY:0})
				.staggerTo($(".question"),timedelta,{opacity:1})
	}
	anole.addScene(scene);
})

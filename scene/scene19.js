;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(19, anole.canvas, false);
    scene.createHint = function(color,w,h,paths){
    	var p = "";
    	for (var i in paths){
    		p += '<path fill="none" stroke="'+color+'" stroke-width="10" d = "'+paths[i]+'"></path>';
    	}
    	var svg = $('<div><svg viewBox="0 0 '+w+' '+h+'">'+p+'</svg></div>');
    	return svg;
    }
	scene.createDom = function() {
		this.video = $('<video>' +
					   '<source src="resource/food1.webm" type="video/webm">' +
		               '<source src="resource/food1.mp4" type="video/mp4">' +
					   'Your browser does not support the video tag.</video>')
		              .appendTo(this.container);
		this.shade0 = $('<div class="shade-s18 s0"></div>').appendTo(this.container);
		this.shade1 = $('<div class="shade-s18 s1"></div>').appendTo(this.container);
		this.s2_ctn = $('<div class="shade-ctn s2"></div>').appendTo(this.container);
		this.s3_ctn = $('<div class="shade-ctn s3"></div>').appendTo(this.container);
		this.shade2 = $('<div class="shade-s18"></div>').appendTo(this.s2_ctn);
		this.shade3 = $('<div class="shade-s18"></div>').appendTo(this.s3_ctn);
		this.svg0 = this.createHint("#aa5",500,500,["M 200 140,A155 155,0,0,1,200 450,A155 155,0,0,1,201 140,L250 90,L370 90"]).addClass("svg0").appendTo(this.container);
		this.svg1 = this.createHint("#a77",600,600,["M 350 300,A150 150,0,0,1,50 300,A150 150,0,0,1,350 301,L450 301,L520 370,L520 375"]).addClass("svg1").appendTo(this.container);
		this.svg2 = this.createHint("#8de",500,500,["M 240 50,A190 190,0,0,1,240 430,A190 190,0,0,1,241 50"]).addClass("svg2").appendTo(this.container);
		this.svg3 = this.createHint("#8de",500,500,["M 210 450,A200 200,0,0,1,210 50,A150 150,0,0,1,209 450",
													"M219 450L219 500"]).addClass("svg3").appendTo(this.container);
		this.tag0 = $("<div></div>").addClass("yellow tag-s18").appendTo(this.svg0).append('<div class="ingredients">Ingredients</div><p>红的是什么鬼</p><p>黄的是什么鬼</p><p>肉肉的什么鬼</p>');
		this.tag1 = $("<div></div>").addClass("red tag-s18").appendTo(this.svg1).append('<div class="ingredients">Ingredients</div><p>猪肉？</p><p>牛肉？？</p><p>鸡肉？？？</p>');
		this.tag3 = $("<div></div>").addClass("blue tag-s18").appendTo(this.svg3).append('<div class="ingredients">Ingredients</div><p>食材：？？</p><p>备料：？？</p><p>调料：？？</p><p>生熟：？？</p><p>荤素：？？</p><p>卡路里：？？</p>');
		this.container.find("path").each(function(idx,elm){
			elm.style["stroke-dasharray"] = elm.style["stroke-dashoffset"] = elm.getTotalLength();
		});
		return this.container;
	}
	
	scene.animation = function() {
		var delta = 0.3;
		this.tl.call(function(){ anole.playMedia(this.video[0]); }.bind(this))
				.to(this.svg0.find("path"),delta*3,{"stroke-dashoffset":0,ease:Linear.easeNone})
				.to(this.shade0,delta,{opacity:1,delay:-delta,ease:Linear.easeNone})
				.to(this.tag0,delta,{opacity:1})
				.to([this.svg0,this.shade0],0.2,{opacity:0,delay:delta*6,ease:Linear.easeNone})
				.to(this.svg1.find("path"),delta*3,{"stroke-dashoffset":0,ease:Linear.easeNone})
				.to(this.shade1,delta,{opacity:1,delay:-delta,ease:Linear.easeNone})
				.to(this.tag1,delta,{opacity:1})
				.to([this.svg1,this.shade1],delta,{opacity:0,delay:delta*6,ease:Linear.easeNone})
				.to([this.svg2.find("path"),this.svg3.find("path")[0]],delta*3,{"stroke-dashoffset":0,ease:Linear.easeNone})
				.to(this.svg3.find("path"),delta,{"stroke-dashoffset":0,ease:Linear.easeNone})
				.to(this.tag3,delta,{opacity:1})
				.to([this.shade2,this.shade3],delta,{opacity:1,delay:-delta})
				.to([this.svg3,this.shade3,this.svg2,this.shade2],0.2,{opacity:0,delay:delta*10,ease:Linear.easeNone})
	}
	scene.cleanup = function() {
		this.video && this.video[0].pause();
	}
	anole.addScene(scene);
})

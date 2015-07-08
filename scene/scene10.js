;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(10, anole.canvas, false);
    scene.id = 10;
	scene.createDom = function() {
		this.leftCtn = $('<div></div>').addClass('left-ctn').appendTo(this.container);
		this.rightCtn = $('<div></div>').addClass('right-ctn').appendTo(this.container);
		this.bag1 = $('<div></div>').addClass('bag bag-left-bg').appendTo(this.leftCtn);
		this.bag2 = $('<div></div>').addClass('bag bag-left-sm').appendTo(this.leftCtn);
    	this.bag3 = $('<div></div>').addClass('bag bag-right').appendTo(this.rightCtn);
		this.banner = $('<div>老外愿意为什么买单？</div>').addClass('banner')
			         .appendTo(this.container);
	}	
	scene.animation = function() {
		this.tl.from(this.leftCtn, 0.5, {delay:0.5, top:-500, ease:Elastic.easeInOut})
		       .from(this.rightCtn, 0.5, {delay:0.5, top:-500, ease:Elastic.easeInOut}, '-=0.2')
			   .fromTo(this.banner, 1, {opacity:0, skewX:90}, {opacity: 1, skewX:0, ease:Bounce.easeOut});
	}
	scene.cleanup = function() { // Called before entering next scene.
	}
	anole.addScene(scene);
})

;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(22, anole.canvas, false);
	scene.createDom = function() {
		this.video = $('<video>' +
					   '<source src="resource/toilet.webm" type="video/webm">' +
		               '<source src="resource/toilet.mp4" type="video/mp4">' +
					   'Your browser does not support the video tag.</video>')
		              .appendTo(this.container);
		return this.container;
	}
	
	scene.animation = function() {
		this.tl.call(function(){ anole.playMedia(this.video[0]);}.bind(this));
	}
	scene.cleanup = function() {
		this.video[0].pause();
	}
	anole.addScene(scene);
})

;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(18, anole.canvas, true);
	// To be implemented
	scene.createDom = function() {};
    scene.animation = function () {};
	scene.cleanup = function() {};
	anole.addScene(scene);
})

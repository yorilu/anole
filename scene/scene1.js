console.log("scene1.js running");
;require(['anole', 'zepto', 'TweenMax','TimelineLite'], function (anole){
	var scene = new anole.Scene(1, anole.canvas, false);
	scene.createDom = function() {
		if (!this.main){
			this.container.find(".scene16").remove();
			this.scene16 = anole.$$('.scene16','<div class="scene16"></div>', this.container);
      
      var html = '<div class="cir-div">'+
                   '<div class="leftmask"></div>'+
                   '<div class="rightcir"></div>'+
                   '<div class="rightmask"></div>'+
                 '</div>';
                 
      this.scene16.html(html);
		}
	}
	scene.animation = function() {
    var tl = new TimelineLite();
	  tl.to('.rightmask', 1, {rotation:180,onComplete:function (){
      $(this.target).hide();
      $('.rightcir').css({"visibility":"visible"});
    },ease:Power1.linear})
    .to('.leftmask', 1, {rotation:180,ease:Power1.linear})
    //a.play();
		//.set(this.marco, {"z-index":501});
	}
	scene.cleanup = function() {
	}
	anole.addScene(scene);
});

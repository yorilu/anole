;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(15, anole.canvas, true);
    scene.name = 'scene15.js';
	scene.createDom = function() {
		console.log(this.container);
		this.map_ctn = this.container.find(".map-ctn");
		this.container.find(".mark").remove();
		this.container.find(".marco").remove();
		this.svg_bg = $("<div></div>").addClass("svg-bg").appendTo(this.container);
		//path_val2 = "M -160 109 C 13 178 13 178 183 80 C271 178 271 178 355 110";
		var path_val = "M -800 545 C 65 890 65 890 915 400 C1255 890 1255 890 1775 550";
		var path_content_val = path_val + "L 1775 1550 L -800 1550 Z";
		this.svg = $('<svg class="big-svg" viewBox="0 0 1800 1000"><path fill="none" stroke="#FFA080" stroke-width="75" d="'+path_val+'"></path>'+
			'<path id="content" fill="#ffa080" stroke="#FFA080" stroke-width="1" d="' + path_content_val + '""></path></svg>').appendTo(this.container);
		this.tl.set(this.svg,{x:"-8%",y:"-0%",scaleX:0.2,scaleY:0.2});
		this.key_point = this.map_ctn.find(".point.p1").appendTo(this.container);
		this.path_content = this.svg.find("#content");
		this.path_content.css("opacity","0");
		this.count_ctn = $("<div>94%</div>").addClass("count").appendTo(this.container);
		this.count = {num:94};
		return this.container;
	}
	
	scene.animation = function() {
		var dt = 0.8;
		this.tl.to(this.map_ctn,dt,{scaleX:6.4,scaleY:6.4,x:"90%",},"+="+dt)
				.to(this.svg,dt,{scaleX:1.28,scaleY:1.28,x:"27.5%",y:"-25%","stroke-width":90},"-="+dt)
				.to(this.key_point,dt,{left:"73.5%",top:"2.44%",scaleX:1.67,scaleY:1.67},"-="+dt)
				.to([this.path_content,this.count_ctn],dt,{opacity:1},"-="+dt)
				.call(function(){this.map_ctn.remove()}.bind(this))
				.to(this.svg,dt,{scaleX:2.5,scaleY:2,x:"-41.5%",y:"-10%"})
				.to(this.key_point,dt,{left:"10.5%",top:"6.44%",scaleX:1.67,scaleY:1.67},"-="+dt)
				.to(this.key_point,dt,{top:"41.72%",left:"27.5%",ease:Linear.easeNone})
				.to(this.key_point,dt,{top:"74.44%",left:"47.5%",ease:Linear.easeNone})
				.to(this.key_point,dt,{left:"60.5%",top:"80.44%"})
				.to(this.count,dt*3,{num:20,ease:Linear.easeNone,onUpdate:this.update_count.bind(this)},"-="+dt*3)
				.to(this.count_ctn,dt*3,{top: "65%",left:"62%"},"-="+dt*3);
	}

	scene.update_count = function(){
		this.count_ctn.text(parseInt(this.count.num)+"%");
	}
	anole.addScene(scene);
})

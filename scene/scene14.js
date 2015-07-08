;require(['anole', 'zepto'], function(anole, Scene){
    
	var scene = new anole.Scene(14, anole.canvas, true);
    scene.name = 'scene14.js';
	scene.createDom = function() {
		console.log(this.container);
		this.map_ctn = $("<div></div>").addClass("map-ctn").appendTo(this.container);
		this.map = $("<div></div>").addClass("map").appendTo(this.map_ctn).append("<img src='./resource/map.png'/>");
		var path_val = "M 380 544 L 410 509 "
		path_val += "C 583 578 583 578 753 480 C841 578 841 578 925 510 C1057 522 1057 522 1177 419 C1185 480 1108 597 1003 674"
		path_val += "L895 822 C 863 884 863 884 959 872 C 992 777 992 777 1102 666"
		var path_val2 = "M 1200 532 C 1213 603 1213 603 1248 670 C 1265 744 1265 744 1233 820";

		this.svg = $('<svg viewBox="0 0 1920 1080"><path fill="none" stroke="#FFA080" stroke-width="15" d="'+path_val+'"></path>' +
			'<path fill="none" stroke="#FFA080" stroke-width="15" d="'+path_val2+'"></path></svg>').appendTo(this.map_ctn);
		this.path = this.svg.find("path");
		this.path.each(function(idx,elm){
			var len = elm.getTotalLength()
			elm.style["stroke-dashoffset"] = len;
			elm.style["stroke-dasharray"] = len;
		});
		for (var i=0;i<6;i++)
			$("<div></div>").addClass("point p"+i).appendTo(this.map_ctn);
		this.mark = Array();
		for (var i=0;i<4;i++)
			this.mark[i] = $("<div></div>").addClass("mark m"+i).appendTo(this.map_ctn).append("<img src='./resource/mark"+(i+1)+".png'/>");
		//this.path = $().appendTo(this.svg);
		return this.container;
	}
	
	scene.animation = function() {
		var time_delta = 0.5;
		this.tl.set(this.map_ctn,{scaleX:5,scaleY:5})
		    .addLabel('begin')
			.to($("#scene14 .marco"),0.3*time_delta,{opacity:0})
			.to([$("#scene14 .gate-ctn .up"),$("#scene14 .gate-ctn .down"),],0.3*time_delta,{opacity: 0,ease:Linear.easeNone},"begin")
			.to($("#scene14 .building"), time_delta,{opacity:0,scaleX:0.1,scaleY:0.1,ease:Linear.easeNone},"begin")
			.to(this.map_ctn,2*time_delta,{scaleX:1,scaleY:1,ease:Linear.easeNone},'begin')
			.addLabel('draw')
			.to($("#scene14 .gate-ctn"),0.6*time_delta,{opacity:0,ease:Linear.easeNone})
			.to(this.path[0],5*time_delta,{"stroke-dashoffset":0,ease:Linear.easeNone},"draw")
			.to(this.path[1],time_delta/2,{"stroke-dashoffset":0,ease:Linear.easeNone,delay:time_delta/8})
			.call(function(){$("#scene14 .gate-ctn").remove();})
			.set(this.mark[0],{x:"-100%"})
			.to(this.mark[1],time_delta/3,{opacity:1,y:"-100%"},"-=" + time_delta*4.5)
			.to(this.mark[2],time_delta/3,{opacity:1,y:"-100%"},"-=" + time_delta*3)
			.to(this.mark[3],time_delta/3,{opacity:1,y:"-100%"},"-=" + time_delta*2.5)
			.to(this.mark[0],time_delta,{opacity:1,x:"0%"})
			.to([this.mark[1],this.mark[2],this.mark[3],],time_delta,{y:"-1300%"},"+=1")
			.to([this.mark[0]],time_delta,{y:"-150%"},"-="+time_delta)
	}
	anole.addScene(scene);
})

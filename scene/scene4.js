;require(['anole', 'zepto'], function (anole){
	var mcount = 2;
	var move_delta = 150;
	var marco_run = function(){
		$("#scene4 .marco-ctn").toggleClass("rot-10");
		mcount--;
		if (mcount) {
			setTimeout(marco_run,move_delta);
	    }
	}
	var marco_init = function(){
		return $('<div id="marco-scene4" class="marco shadow tourist center"></div>')
				.append($('<div class="marco tourist body"></div>'));
	}
	anole.addScene({
		name: "scene4.js",
		id: 4,
		musicName: 'vo4',
		onInit: function (){
			this.music = anole.getMedia(this.musicName);
			this.scene = anole.$$("#scene4",'<div id = "scene4" class = "scene"></div>',anole.canvas);
			this.scene.html($("#scene3").html());
			$("#scene3").hide();
			this.marco_ctn = anole.$$("#marco-ctn",'<div class="marco-ctn"></div>',this.scene,{top:"50%"})
			this.marco = anole.$$("#marco-scene4",marco_init,this.marco_ctn);
			this.marco.hide();
			this.sublgate = $("#scene4 #subway-left");
			this.subrgate = $("#scene4 #subway-right");
			this.shadowl = $("<div></div>").addClass("subway-shadow").css("opacity",0).appendTo(this.sublgate);
			this.shadowr = $("<div></div>").addClass("subway-shadow").css("opacity",0).appendTo(this.subrgate);
			$("#scene4 .paperman.marco").hide();
		},
		onStart: function (finish){
			anole.playMedia(anole.getMedia(this.musicName));
			this.tl1 = new TimelineLite();
			this.tl1.to(this.sublgate, 0.05, {y:"-5%", ease:Linear.easeNone, onComplete:function(){this.marco.show()}.bind(this)})
					.to(this.subrgate, 0.05 , {y:"-5%", ease:Linear.easeNone},"-=0.1")
					.set(this.scene.find(".papermans"),{scaleX:1.5,scaleY:1.5})
					.to([this.shadowl,this.shadowr],0.1,{opacity:1},"-=0.1")
					.to(this.sublgate , 0.2, {x:"50%", ease:Linear.easeNone, onComplete:this.marco_go_out.bind(this)})
					.to(this.subrgate, 0.2, {x:"-50%", ease:Linear.easeNone},"-=0.1")
					.set(this.marco_ctn,{"z-index":141})
					.to(this.marco,1,{delay:0.5,scaleX:1.5,scaleY:1.5,x:"100%",y:"20%",ease:Linear.easeNone,})
			        .call(function() {
						if (!this.music.ended) {
							$(this.music).on('ended', finish);
						} else {
							finish();
						}
					}.bind(this));
		},
		onBack: function(finish){
			$("#scene4").remove();
			$("#scene3").remove();
			finish();
		},
		onEnd: function (){
			this.tl && this.tl1.progress(1);
			this.music && this.music.pause();
		},
		marco_go_out:function(){
			var duration = 1;
			var delay = 0.5;
			mcount = duration*1000/move_delta;
			setTimeout(marco_run,delay*1000);
		},
	})
});

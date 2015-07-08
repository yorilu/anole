;require(['anole', 'zepto'], function (anole){
	var v_count = 7;
	var circle_init = function(){
	var c = $('<div class="loading"><svg viewBox="0 0 220 220">' +
		'<path fill="none" stroke="#D07474" stroke-width="30" d = "M 109 30,A75 75,0,0,1,109 180"  class="right-half half-circle"></path>'+
		'<path fill="none" stroke="#03A0A0" stroke-width="30" d = "M 110 180,A75 75,0,0,1,110 30"  class="left-half" half-circle></path>' + 
		'</svg></div>');
	return c;
	};
	anole.addScene({
		name: "scene5.js",
		id: 5,
		musicName: 'vo5',
		onInit: function (){
			this.scene = anole.$$("#scene5",'<div id = "scene5" class = "scene"></div>',anole.canvas);
			this.br_ctn_out = anole.$$("#ctn-browser",'<div id = "ctn-browser" class = "ctn-browser"></div>',this.scene);
			this.br_ctn_in = anole.$$("#ctn-browser-in",'<div id = "ctn-browser-in" class = "ctn-browser-in"></div>',this.br_ctn_out);
			this.browser = anole.$$("#browser",'<div id = "browser" class = "browser"></div>',this.br_ctn_in);
			this.topbar = anole.$$("#topbar",'<div id = "topbar" class = "topbar"></div>',this.br_ctn_in);
			this.br_content = anole.$$(".browser-content","<div class='browser-content'></div>",this.browser)
			this.br_left = anole.$$("#browser-left",'<div id = "browser-left" class = "browser-left"></div>',this.br_content);
			this.br_right = anole.$$("#browser-right",'<div id = "browser-right" class = "browser-right"></div>',this.br_content);
			this.youtube = anole.$$("#youtube",'<div id = "youtube" class = "youtube anime"></div>',this.br_left);
			var items = $("#scene4").clone();
			this.youtube.html(items[0].innerHTML);
			this.shade = anole.$$("#shade-youtube",'<div id = "shade-youtube" class = "shade-youtube"><img src="./resource/replay.png"></div>',this.youtube,{opacity:0});
			this.circle = anole.$$(".shade-circle",circle_init.bind(this),this.shade);
			this.loading_len = 238;
			this.loading_l = $(".left-half");
			this.loading_r = $(".right-half");
			this.loading_l.css("stroke-dashoffset",this.loading_len);
			this.loading_l.css("stroke-dasharray",this.loading_len);
			this.loading_r.css("stroke-dashoffset",this.loading_len);
			this.loading_r.css("stroke-dasharray",this.loading_len);
			if (this.topbar.find("youtube_l").length == 0)
			{
				var y_l = $("<div></div>").addClass("youtubebar_l").appendTo(this.topbar);
				var y_r = $("<div></div>").addClass("youtubebar_r").appendTo(this.topbar);
				var y_m = $("<div></div>").addClass("youtubebar_m").appendTo(this.topbar);
			}
			if ($(".like-bar").length == 0)
			{
				var dot_count = 3;
				this.like_bar = anole.$$(".like-bar","<div class = 'like-bar'></div>",this.br_left);
				for (var i=0;i<dot_count;i++)
					$("<div></div>").addClass("dot").appendTo(this.like_bar);
			}
			if (this.br_right.find(".video").length == 0)
			for (var i=0;i<v_count;i++){
				var dash_count = 3;
				var ctn = $("<div></div>").addClass("ctn-video c"+i);
				var video = $("<div></div>").addClass("video").append("<div class = 'board' ></div><div class = 'img v"+i%3+"'></div>").appendTo(ctn);
				var dashes = $("<div></div>").addClass("dashes").appendTo(ctn);
				for (var j=0;j<dash_count;j++)
					$("<div></div>").addClass("dash d"+j).appendTo(dashes);
				this.br_right.append(ctn);
			}
		},
		dashAnime: function(i,time){
			return function(){
				tl = new TimelineLite();
				tl.to($(".c"+i+" .d0"),time,{width:"80%"})
					.to($(".c"+i+" .d1"),time,{width:"80%"},"-="+time*0.5)
					.to($(".c"+i+" .d2"),time,{width:"65%"},"-="+time*0.5);
				this["tl"+i] = tl;
			}.bind(this);
		},
		onStart: function (finish){
			$("#scene4").hide();
			this.music = anole.getMedia(this.musicName);
			anole.playMedia(this.music);
			this.tl1 = new TimelineLite();
			this.tl1 = this.tl1.to(this.shade,0.2,{opacity:0.9, ease:Linear.easeNone})
							.to(this.br_ctn_out,0.2,{delay:0.05,scaleX:0.4,scaleY:0.4,x:"-14%",y:"-18%",ease:Linear.easeNone});
			var time_video = 1;
			var per_video = time_video / v_count;
			this.tl1.to(this.br_right,per_video,{"opacity":1,y:"0%",delay:0,ease:Linear.easeNone});
			for (var i=0;i<v_count;i++){
				this.tl1 = this.tl1.to($(".c"+i),per_video*(i+1),{y:(100*i)+"%",ease:Linear.easeNone,delay:-per_video*i,onComplete:this.dashAnime(i,per_video)})
									.to($(".c"+i).find(".video"),per_video*(i+1),{rotation:0,ease:Linear.easeNone,delay:-per_video*(i+1)});
			}
			this.tl1 = this.tl1.to(this.loading_r,time_video/2,{"stroke-dashoffset":0,delay: -time_video,ease:Linear.easeNone})
							.to(this.loading_l,time_video/2*3/4,{"stroke-dashoffset":this.loading_len/4,delay: -time_video/2,ease:Linear.easeNone})
							.call(function() {
								if (!this.music.ended) {
									$(this.music).on('ended', finish);
								} else {
									finish();
								}
							}.bind(this));
		},
		onBack: function (finish){
			$("#scene5").remove();
			$("#scene4").remove();
			finish();
		},
		onEnd: function (){
			this.tl1 && this.tl1.progress(1);
			$(".d0").css("width","80%");
			$(".d1").css("width","80%");
			$(".d2").css("width","65%");
		}
	})
});

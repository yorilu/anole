console.log("Scene3.js running...");
;require(['anole', 'zepto'], function (anole){
	var display_delta = 5;
	var display_ppm = function(){
	 var hides = $("#scene3 .paperman.hide");
	 if (hides.length<1)
		return;
	 var idx = parseInt(hides.length * Math.random());
	 hides[idx].classList.toggle("hide",false);
	 hides[idx].classList.toggle("open",true);
	 setTimeout(display_ppm,display_delta);
	}
	var data = {year:1271,popu:123456789}
	var data_final = {year:2014,popu:128498301}
	var subway_text_create = function(){
		var ctn = $("<div></div>").addClass("subway-text-ctn");
		var year = $("<div></div>").addClass("subway-year").appendTo(ctn);
		var title = $("<div></div>").addClass("subway-title").text("中国入境旅游人数").appendTo(ctn);
		var popu = $("<div></div>").addClass("subway-popu").appendTo(ctn);
		return ctn;
	}
	var convert = function(s){
		var l = s.length;
		var head = (l+2) % 3 +1;
		var res = s.substr(0,head);
		for (;head<l;head+=3){
			res += "," + s.substr(head,3);
		}
		return res;
	}
	var update_text = function(){
		$(".subway-year").text(parseInt(data.year));
		var popu = String(parseInt(parseInt(data.popu)));
		popu = convert(popu);
		$(".subway-popu").text(popu);
	}
	anole.addScene({
		name: "scene3.js",
		id:3,
		musicName: 'vo3',
		onInit: function (){
			this.music = anole.getMedia(this.musicName);
			this.scene = anole.$$("#scene3",'<div id = "scene3" class = "scene"></div>',anole.canvas);
			this.subway_paperman = anole.$$("#subway-paperman","<div id = 'subway-paperman' class='papermans'></div>",this.scene);
			this.subway_paperman.html($("#papermans").html());
			this.subway = anole.$$("#subway",'<div id = "subway" class = "subway"></div>',this.scene);
			this.subup = anole.$$("#subway-up","<div id='subway-up' class='subway-up'>",this.subway);
			this.subtext = anole.$$(".subway-text",subway_text_create,this.subup);
			this.subhead = anole.$$("#subway-head","<div id='subway-head' class='subway-head'>",this.subup);
			this.subdown = anole.$$("#subway-down","<div id='subway-down' class='subway-down'>",this.subway);
			this.sublblock = anole.$$("#subway-left-block","<div id = 'subway-left-block' class='left subway-block'></div>",this.subdown);
			this.subrblock = anole.$$("#subway-right-block","<div id = 'subway-right-block' class='right subway-block'></div>",this.subdown);
			this.sublgate = anole.$$("#subway-left","<div id = 'subway-left' class='subway-left'></div>",this.subdown);
			this.subrgate = anole.$$("#subway-right","<div id = 'subway-right' class='subway-right'></div>",this.subdown);
			this.subway_paperman.find(".marco").toggleClass("tourist");
			data = {year:1271,popu:123456789};
			update_text();
		},
		onStart: function (finish){
			anole.playMedia(this.music);
			this.tl1 = new TimelineLite();
			this.tl1.call(display_ppm)
					.to($("#subway-left"), 0.3, {x:"100%", ease:Linear.easeNone,delay:0.3})
					.call(function(){$("#papermans").css("display","none");})
					.to($("#subway-right"), 0.3, {x:"-100%", ease:Linear.easeNone},"-=0.5")
					.to(this.subway,0.5,{delay:0.1,scaleX:"0.5",scaleY:"0.5",y:"5%"})
					.to(data,1,{year:data_final.year,popu:data_final.popu,onUpdate:update_text,ease:Linear.easeNone})
					.call(function() {
						if (!this.music.ended) {
							$(this.music).on('ended', finish);
						} else {
							finish();
						}
					}.bind(this));
		},
		onBack: function(finish){
			$("#scene3").remove();
			$("#scene2").remove();
			$("#scene1").show();
			finish();
		},
		onEnd: function (){
			var hides = $("#scene3 .paperman.hide");
			hides.each(function(idx,elm){
				elm.classList.toggle("hide");
				elm.classList.toggle("open");
			});
			this.tl1 && this.tl1.progress(1);
			$("#scene2").hide();
		},
	})
});

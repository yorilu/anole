;require(['anole', 'zepto'], function (anole){

	var pages_init = function(){
		var ctn = $("<div></div>").addClass("page-ctn");
		this.pages = Array(5);
		for (var i=0;i<5;i++)
			this.pages[i] = $("<div></div>").addClass("small-page page"+i).appendTo(ctn);
		return ctn;
	}

	anole.addScene({
		name: "scene6.js",
		id: 6,
		musicName: 'vo6',
		onInit: function (){
			this.scene = anole.$$("#scene6",'<div id = "scene6" class = "scene"></div>',anole.canvas);
			this.scene.html($("#scene5").html());
			$("#scene5").hide();
			this.br_ctn_out = anole.$$("#scene6 #ctn-browser",'<div id = "ctn-browser" class = "ctn-browser"></div>',this.scene);
			this.br_ctn_in = anole.$$("#scene6 #ctn-browser-in",'<div id = "ctn-browser-in" class = "ctn-browser-in"></div>',this.br_ctn_out);
			this.browser = anole.$$("#scene6 #browser",'<div id = "browser" class = "browser"></div>',this.br_ctn_in);
			this.tag = anole.$$("#scene6 #ctn-browser-in .tag","<div class = 'tag'></div>",this.br_ctn_in);
			this.topbar = anole.$$("#scene6 #topbar",'<div id = "topbar" class = "topbar"></div>',this.br_ctn_in);
			this.br_left = anole.$$("#scene6 #browser-left",'<div id = "browser-left" class = "browser-left half"></div>',this.browser);
			this.br_right = anole.$$("#scene6 #browser-right",'<div id = "browser-right" class = "browser-right half"></div>',this.browser);
			this.youtube = anole.$$("#scene6 #youtube",'<div id = "youtube" class = "youtube anime"></div>',this.br_left);
			var comment_count = 5;
			if (this.br_left.find(".comments").length == 0)
			{
				this.comment_ctn = $("<div></div>").addClass("comment-ctn").appendTo(this.br_left);
				this.comments = $('<div></div>').addClass("comments").appendTo(this.comment_ctn);
				for (var i=0;i<comment_count;i++){
					var comment = $('<div></div>').addClass("comment").appendTo(this.comments);
					var head = $("<div></div>").addClass("comment-head").appendTo(comment);
					var content = $("<div></div>").addClass("comment-content").appendTo(comment);
					for (var j=0;j<3;j++)
						$("<div></div>").addClass("dash").appendTo(content);
				}
			}
			this.like_bar = anole.$$("#scene6 .like-bar","<div class='like-bar'></div>",this.br_left);
			this.like = anole.$$("#scene6 .like","<div class='like'></div>",this.like_bar);
			this.like_text = anole.$$("#scene6 .like-text","<div class='like-text'>+1</div>",this.like);

			this.shade = anole.$$("#scene6 .shade","<div class=shade></div>",this.scene);
			this.page_ctn = anole.$$("#scene6 .pages-ctn",pages_init.bind(this),this.scene);
			this.scene.show();
		},
		onStart: function (finish){
			this.music = anole.getMedia(this.musicName);
			anole.playMedia(this.music);
			this.scene.show();
			this.tl1 = new TimelineLite();
			var new_h = this.comment_ctn.height()*160;
			this.tl1.to(this.like,0.2,{opacity:1})
					.to(this.like_text,0.4,{y:"-100%",opacity:0})
					.to(this.comment_ctn,1,{height:new_h+"px",ease:Linear.easeNone},"+=0.1")
					.to([this.br_left,this.br_right],0.8,{y:"-52%",ease:Linear.easeNone},"-=1")
					.to(this.topbar,0.2,{width:"67%"})
					.to(this.br_ctn_in,0.4,{scaleX:0.5,scaleY:0.5})
					.to(this.shade,0.3,{opacity:0.26})
					.to(this.pages[0],1.5,{opacity:1,x:"-90%",y:"-60%"},"-=0.2")
					.to(this.pages[2],0.8,{x:"-160%",y:"-40%"},"-=0.2")
					.to(this.pages[4],0.8,{x:"-140%",y:"-40%"},"-=0.8")
					.to(this.pages[1],0.8,{opacity:1,x:"110%",y:"-70%"},"-=0.8")
					.to(this.pages[3],0.8,{x:"180%",y:"-50%"},"-=0.8")
					.to(this.pages[0],0.8,{x:"-80%",y:"100%"},"-=0.2")
					.to(this.pages[2],0.8,{opacity:1,x:"-90%",y:"-60%"},"-=0.8")
					.to(this.pages[1],0.8,{x:"80%",y:"80%"},"-=0.2")
					.to(this.pages[3],0.8,{opacity:1,x:"110%",y:"-70%"},"-=0.8")
					.to(this.pages[2],0.8,{x:"-80%",y:"100%"},"-=0.2")
					.to(this.pages[4],0.8,{opacity:1,x:"-70%",y:"-60%"},"-=0.8")
			        .call(function() {
						if (!this.music.ended) {
							$(this.music).on('ended', finish);
						} else {
							finish();
						}
					}.bind(this));
		},
		onBack: function (finish){
			$("#scene6").remove();
			$("#scene5").remove();
			finish();
		},
		onForward: function(){
			this.tl1 && this.tl1.progress(1);
		},
		onEnd: function (){
			this.tl1 && this.tl1.progress(1);
		}
	})
});

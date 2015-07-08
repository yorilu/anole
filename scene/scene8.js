;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(8, anole.canvas, true);

	scene.createDom = function() {
		this.marco = $('<div></div>').addClass('marco-shadow')
		.append($('<div><img id="mouth" src="./resource/mouth.png"></img></div>').addClass('marco-nomouth'));
		this.pplCtn = $('<div></div>').addClass('ppl-ctn');
		this.marco.appendTo(this.container);
		this.pplCtn.appendTo(this.container);
		for (i=0; i<3; i++) {
			var chinese = $('<div></div>').addClass('chinese');
			chinese.appendTo(this.pplCtn);
		}
		this.commentList = this.container.find('.comment');
		this.disbubbles = [];
		this.bubbles = this.commentList.find('.worry-bubble');
		for (i=0; i<4; i++) {
			var disbubble = $('<div></div>').addClass('bubble-disappear').css('opacity', 0);
			disbubble.prependTo(this.commentList[i]);
			this.disbubbles.push(disbubble);
		}
		this.shade = $('<div></div>').addClass('shade').appendTo(this.container);
		// this.circle = $('<div></div>').addClass('circle').appendTo(this.marco);
		this.circleCtn = $('<div class="circle-ctn"></div>');
		// A rx ry x-axis-rotation large-arc-flag sweep-flag x y
		// a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
		// needs adjustment
		var svg = $('<svg width="430" height="430"><path class="circle-path" fill="none" stroke="#D07474" stroke-width="60" d="M 155 60,A155 155,0,1,1,123.9 340.4"></path></svg>').appendTo(this.circleCtn);
		this.circleCtn.appendTo(this.container);
		this.loading_len = 2000;
		this.path = this.container.find('.circle-path')
		this.path.css("stroke-dashoffset",this.loading_len);
		this.path.css("stroke-dasharray",this.loading_len);
	}	
	scene.animation = function() {
		var dt_float = 0.4;
		var dt_stagger = 0.2;
		var dt_dissolve = 0.1;
		var dt_stupify = 0.5;
		this.tl.addLabel('float')
		       .to(this.commentList[0], dt_float, {left: "-=220", top:'-=30', scale:1.2}, 'float')
		       .to(this.commentList[1], dt_float, {left: "+=170", top:'-=12', scale:1.2}, 'float')
		       .to(this.commentList[2], dt_float, {left: "-=170", top:'+=12', scale:1.2}, 'float')
		       .to(this.commentList[3], dt_float, {left: "+=200", top:'+=30', scale:1.2}, 'float')
	           .from(this.marco, 0.75, {right:-200, ease:Power3.easeIn}, 'float+=0.5')
		       .staggerTo(this.container.find('.chinese'), dt_float, {opacity:1}, dt_stagger)
			   .addLabel('dissolve', '-=0.2')
			   .call( (function() { this.container.find('.chinese').addClass('chinese-smile')} ).bind(this))
			   .staggerTo(this.commentList.find('.comment-content'), dt_dissolve, {scale:0}, dt_stagger, 'dissolve')
			   .staggerTo(this.bubbles, dt_dissolve, {opacity:0, ease: Power4.eastIn}, dt_stagger, 'dissolve')
			   .staggerFromTo(this.disbubbles, dt_dissolve, {opacity:0}, {opacity:1, ease: Power4.easeOut}, dt_stagger, 'dissolve')
			   .staggerTo(this.disbubbles, 2*dt_dissolve, {scale:2, ease: Back.easeIn, opacity:0}, dt_stagger, 'dissolve+=0.1')
			   //.to(this.container.find('.chinese'), 0.1, { className: 'chinese-smile' }, 'dissolve')
			   .to(this.marco.find('#mouth'), 1, {rotation: 180, ease: Elastic.easeInOut}, 'dissolve-=0.5')
			   .addLabel('stupify')
			   .set(this.marco.find('.marco-nomouth'), {height: '155px', width: '155px'})
               .set(this.marco, {height: '155px'})
			   .to(this.shade, dt_float, {opacity: 0.8}, 'stupify')
			   .to(this.marco, dt_stupify, {left: '0', top: '0', right: '0', bottom: '0', margin: 'auto', ease:Linear.easeIn}, 'stupify') // Absolute center.
			   .to(this.marco, dt_stupify, {scale: 1.5, ease:Linear.easeIn}, 'stupify')
			   .to(this.path, dt_float, {"stroke-dashoffset":0,ease:Power4.easeIn})
	}
	scene.cleanup = function() { // Called before entering next scene.
		this.container.find('.ctn-browser').remove();
        this.container.find('.ppl-ctn').remove();
		//this.container.find('.shade').remove();
	}
	anole.addScene(scene);
})

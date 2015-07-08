;require(['anole', 'zepto', 'TweenLite', 'TimelineLite', 'CSSPlugin', 'EasePack'], function(anole, Scene){
    
	var scene = new anole.Scene(7, anole.canvas, true);
	scene.createDom = function() {
	    this.container.find('.topbar').remove();
	    this.container.find('.tag').remove();
	    this.container.find('#browser-right').remove();
	    this.container.find('#youtube').remove();
	    this.container.find('.like-bar').children().remove();
		this.container.find('.page-ctn').remove(); // TODO: Use tween.
	    this.container.find('.shade').remove();
	    this.comments = this.container.find('.comments');
		var heads = this.comments.find('.comment-head');
		this.bubbles = [];
		for (i=0; i<4; i++) {
			var bubble= $('<div></div>').addClass('worry-bubble').addClass('worry'+(i+1))
			    .css('opacity','0');
			bubble.insertBefore(heads[i]);
			this.bubbles.push(bubble);
		}
		this.texts = this.comments.find('.comment-content');
        this.newTexts = [];
		var words = ['饮食安全.. 61%',
			'如厕不便.. 51%',
		    '欺诈宰客... 35%',
			'人多拥挤... 33%'];
	    for (i=0; i<4 ;i++) {
			var node = $('<div></div>').addClass('worry-text').text(words[i])
			            .css('opacity', '0');
			node.prependTo(this.texts[i]);
			this.newTexts.push(node);
		}
    }	
	scene.animation = function() {
	  var all = this.comments.find('.comment');
	  var pgroup = []; // Ancenster elements to be background removed. 
	  var group = []; // Elements to be set invisible
	  for (i=4; i<all.length; i++) {
		group.push(all[i]);
	  }
	 
	  // Tracking back to find all siblings of parents.
	  // We need to fade them.
	  var p = this.comments;
	  while (!p.hasClass('scene')) {
		 var others = p.siblings();
		 if (others.length) {
			 group.push(others);
		 }
		 pgroup.push(p);
		 p = p.parent();
	  }
	  
	  this.tl.set(pgroup, {backgroundSize: '0'})  // Cannot tween background-size :(.
             .addLabel('fade')
		     .to(group, 0.5, {opacity: 0})
			 .to(pgroup, 0.5, {backgroundColor:'transparent'}, 'fade')
			 .addLabel('bigger')
			 .to(this.container.find('.ctn-browser'), 0.3, {scale:0.68, top:'+=25'}, 'bigger')
             .addLabel('change')
			 .to(this.comments.find('.comment-head'), 0.3, {opacity:0})
		     .to(this.comments.find('.comment-content'), 0.3, {left:120}, 'change')
			 .to(this.texts.find('.dash'), 0.1, {scale:0, opacity:0}, 'change')
			 .addLabel('bubbles')
		     .staggerFromTo(this.bubbles, 0.6, {scale: 0, opacity: 0},
							{scale:1, opacity:1, ease: Elastic.easeOut}, 0.3)
			 .staggerFromTo(this.newTexts, 0.6, {opacity:0, scale:0},
							{opacity:1, scale:1, ease: Elastic.easeOut}, 0.3, 'bubbles');
	}
	scene.cleanup = function() { // Called before entering next scene.
		this.comments.find('.comment-head').remove();
		this.comments.find('.dash').remove();
		var list = this.comments.children();
		list[4].remove();
	}
	anole.addScene(scene);
})

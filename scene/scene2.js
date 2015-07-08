;require(['anole', 'zepto', 'TweenLite', 'CSSPlugin', 'TimelineLite'], function (anole){
	var scene = new anole.Scene(2, anole.canvas, true);
	scene.createDom = function() {
		if (!this.main){
			this.container.find(".scene17").remove();
			this.scene = anole.$$('.scene17','<div class="scene17"></div>', this.container);
      var html = '<div class="phone">'+
                  '<div class="up">16%</div>'+
                 '</div>'+
                 '<div class="year"></div>';
                 
      this.scene.html(html);
      this.container.append($('<div class="phone phone-div"><div class="line"></div></div>'))
		}
	}
  
  function random(min, offset){
    return Math.ceil(Math.random()*offset + min);
  }

	scene.animation = function() {
    var that = this;
    var sl1 = [[278,384,-143],[251,332,-128],[234,278,-100],[218,229,-73],[214,177,-66],[216,117,-53],[271,76,-29],[325,55,-13],[385,56,-5],
    [436,68,15],[450,124,51],[476,175,51],[491,249,73],[506,309,90]];
    var sl2 = [[164,230,-90],[164,126,-66],[210,63,-44],[290,19,-22],[424,13,4],[530,132,48]];
    var sl3 = [[193,327,-118],[98,180,-78],[108,100,-66],[150,20,-44],[234,11,-32],[500,13,31],[550,69,48],[553,196,70],[553,291,104]];
    var sl4 = [[248,500,-141],[177,421,-130],[53,384,-116],[122,304,-108],[22,220,-86],[22,36,-56],[616,107,52],[636,198,75],[612,385,115],[678,0,35],[300,-89,-9],[458,-67,5]];
    function weiguan(persons, delay, opacity, offset, speed, scale){
      scale = scale || 1;
      for(var i =0;i<persons.length;i++){
        var item = persons[i];
        var per = $('<div class="line1 person"></div>');
        var x = -random(150,450);
        var y = -random(100,200);
        per.css({
          left:295,
          top:215,
          transform:"rotate(900deg)"
        })
        that.scene.append(per);
        offset = offset || 0.5
        TweenLite.to(per[0],speed, {left:item[0],top:item[1],rotation:item[2],delay:(delay + Math.random() * offset), opacity:opacity ||1,scale:scale})
      }
    }
    
    var up = $(".up")
    function uping(min, max){
      var number = min
      var inter = setInterval(function (){
       up.html(++number + "%");
       if(number == max){
         clearInterval(inter);
       }
     },25)
    }
    
    var tl = new TimelineLite();
    tl
    .to('.scene16', 0.5, {transform:"scale(0.35)",top:-16,left:-3})
    .call(function(){
       $(".phone").show();
       $(".line").show();
     }.bind(this))
    .to('.line', 1, {top:"91%", onComplete: function (){
      $(".line").hide();
      up.show();
      setTimeout(function (){
        up.hide();
      },50);
      setTimeout(function (){
        up.show();
        $(".year").html("2013");
      },100);
    }})
    .call(function (){
      //第一组小人
      //persons, delay, opacity, offset, speed
      weiguan(sl1,0,1,0.2,0.1);
      setTimeout(function (){
        uping(16,48);
        $(".year").html("2014");
      },800);
      //第二三四组小人
      weiguan(sl2,0.8,0.8,0.6,0.3);
      weiguan(sl3,0.8,0.6, 0.8,0.4,0.9);
      weiguan(sl4,0.8,0.4,1,0.5,0.8);
    }.bind(this))

	}
	scene.cleanup = function() {
	}
	anole.addScene(scene);
});
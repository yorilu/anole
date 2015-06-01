;require(['anole', 'zepto', 'TweenLite', 'TweenMax'], function (anole, zepto, TweenLite, TweenMax){
  
  anole.addScene({
    onInit: function (){
      this.sp1 = anole.getOrCreate('.sprite1',function (){
        return '<div class="sprite sprite1">';
      }, anole.canvas, {left:30,top:-100});
      this.sp2 = anole.getOrCreate('.sprite2','<div class="sprite sprite2">', anole.canvas, {left:120,top:-100});
      this.sp3 = anole.getOrCreate('.sprite3','<div class="sprite sprite3">', anole.canvas, {left:240,top:-100});
      this.sp4 = anole.getOrCreate('.sprite4','<div class="sprite sprite4">', anole.canvas, {left:310,top:-100});
      this.sp5 = anole.getOrCreate('.sprite5','<div class="sprite sprite5">', anole.canvas, {left:410,top:-100});
      console.log("scene1 onInit");
    },
    onStart: function (finish){
      console.log("scene1 onStart");
      var music = anole.getMusic("mymusic");
      music.play();
      var b = anole.getMusic("b");
      setTimeout( function (){
        b.play();
        
      },1000)
      
      var a = TweenMax.to(this.sp1, 0.5, {delay:0,top:380,onComplete: function (){
        
      }});
      TweenMax.to(this.sp2, 0.5, {delay:0.2,top:210, onComplete: function (){
        
      }});
      TweenMax.to(this.sp3, 0.8, {delay:0.5,top:430,onComplete: function (){
        finish();
      }});
      TweenMax.to(this.sp4, 0.5, {delay:0.3,top:240, onComplete: function (){
        
      }});
      TweenMax.to(this.sp5, 0.5, {delay:0,top:180, onComplete: function (){
        
      }});
    },
    onEnd: function (){
      console.log("scene1 onEnd");
    }
  })
});
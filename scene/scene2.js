;require(['anole', 'zepto'], function (anole){
  
  anole.addScene({
    onInit: function (){
      this.sp1 = anole.getOrCreate('.sprite1','<div class="sprite sprite1">', {left:30,top:380},anole.canvas);
      this.sp2 = anole.getOrCreate('.sprite2','<div class="sprite sprite2">', {left:120,top:210},anole.canvas);
      this.sp3 = anole.getOrCreate('.sprite3','<div class="sprite sprite3">', {left:240,top:430},anole.canvas);
      this.sp4 = anole.getOrCreate('.sprite4','<div class="sprite sprite4">', {left:310,top:240},anole.canvas);
      this.sp5 = anole.getOrCreate('.sprite5','<div class="sprite sprite5">', {left:410,top:180},anole.canvas);
      
      console.log("scene2 onInit");
    },
    onStart: function (finish){
      console.log("scene2 onStart");
      var sp1 = $(".sprite1")[0];
      var sp2 = $(".sprite2")[0];
      var sp3 = $(".sprite3")[0];
      var sp4 = $(".sprite4")[0];
      var sp5 = $(".sprite5")[0];
      
      TweenMax.to(sp1, 0.5, {delay:0,left:-800,onComplete: function (){
        
      }});
      TweenMax.to(sp2, 0.5, {delay:0.2,left:-800,onComplete: function (){
        
      }});
      TweenMax.to(sp3, 0.8, {delay:0.5,left:225, top:225, onComplete: function (){
        finish();
      }});
      TweenMax.to(sp4, 0.5, {delay:0.3,left:800, onComplete: function (){
        
      }});
      TweenMax.to(sp5, 0.5, {delay:0,left:800,onComplete: function (){
        
      }});
    },
    onBack: function (finish){
      TweenMax.staggerTo(".sprite3", 0.5, {left:250, top:-100,},0,function (){
        finish();
      });
    },
    onEnd: function (){
      console.log("scene2 onEnd");
    }
  })
});
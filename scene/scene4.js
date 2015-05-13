;require(['anole', 'zepto'], function (anole){
  
  anole.addScene({
    onInit: function (){
      console.log("scene4 onInit");
      var sp3 = this.sp3 = anole.getOrCreate('.sprite3','<div class="sprite sprite3">', {},anole.canvas);
      TweenMax.set(sp3[0],{left:225,top:225,x:0,y:0,rotation:"720deg"});
     // this.sp3 = anole.getOrCreate('.sprite3','<div class="sprite sprite3">', {left:225,top:225},anole.canvas);
    },
    onStart: function (finish){
      console.log("scene4 onStart");
      
      TweenMax.to(this.sp3[0], 1, {rotation:"0deg",onComplete: function (){
        finish();
      }});
    },
    onBack: function (finish){
        finish();
    },
    onEnd: function (){
      console.log("scene4 onEnd");
    }
  })
});
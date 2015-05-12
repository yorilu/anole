;require(['anole', 'zepto'], function (anole){
  
  anole.addScene({
    onInit: function (){
      console.log("scene2 onInit");

    },
    onStart: function (finish){
      console.log("scene2 onStart");
      var sp1 = $(".sprite1")[0];
      var sp1 = $(".sprite1")[0];
      var sp2 = $(".sprite2")[0];
      var sp3 = $(".sprite3")[0];
      var sp4 = $(".sprite4")[0];
      var sp5 = $(".sprite5")[0];
      
      TweenMax.to(sp1, 0.5, {delay:0,x:-500, y:0, bezier:[{x:500, y:500}],onComplete: function (){
        
      }});
      TweenMax.to(sp2, 0.5, {delay:0.2,x:-500, y:0, bezier:[{x:100, y:50}],onComplete: function (){
        
      }});
      TweenMax.to(sp3, 0.8, {delay:0.5,x:-15, y:325, rotate:720, onComplete: function (){
        finish();
      }});
      TweenMax.to(sp4, 0.5, {delay:0.3,x:500, y:0, bezier:[{x:250, y:50}],onComplete: function (){
        
      }});
      TweenMax.to(sp5, 0.5, {delay:0,x:500, y:0, bezier:[{x:250, y:50}],onComplete: function (){
        
      }});
    },
    onBack: function (finish){
      var sp1 = $(".sprite1")[0];
      TweenMax.to(sp1, 0.5, {x:0, y:0,onComplete: function (){
        finish();
      }});
    },
    onEnd: function (){
      console.log("scene2 onEnd");
    }
  })
});
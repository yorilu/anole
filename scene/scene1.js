;require(['anole', 'zepto', 'TweenLite', 'TweenMax'], function (anole, zepto, TweenLite, TweenMax){
  
  anole.addScene({
    onInit: function (){
      var  template = '<div class="sprite sprite1" style="left:30px;top:-100px;"></div>'+
                      '<div class="sprite sprite2" style="left:120px;top:-100px;"></div>'+
                      '<div class="sprite sprite3" style="left:240px;top:-100px;"></div>'+
                      '<div class="sprite sprite4" style="left:310px;top:-100px;"></div>'+
                      '<div class="sprite sprite5" style="left:410px;top:-100px;"></div>';
      
      anole.canvas.html(template);
      console.log("scene1 onInit");
    },
    onStart: function (finish){
      console.log("scene1 onStart");
      var sp1 = $(".sprite1")[0];
      var sp2 = $(".sprite2")[0];
      var sp3 = $(".sprite3")[0];
      var sp4 = $(".sprite4")[0];
      var sp5 = $(".sprite5")[0];
      //var tl = new TimelineMax();
     // tl.to(sp1, 1, {left:"450px"});
     // tl.to(sp1, 1, {left:"450px",top:"450px"});
     // tl.to(sp1, 1, {left:"0",top:"450px"});
     // tl.to(sp1, 1, {left:"0",top:"0"});
      
      TweenMax.to(sp1, 0.5, {delay:0,x:0, y:380, bezier:[{x:500, y:500}],onComplete: function (){
        
      }});
      TweenMax.to(sp2, 0.5, {delay:0.2,x:0, y:210, bezier:[{x:100, y:50}],onComplete: function (){
        
      }});
      TweenMax.to(sp3, 0.8, {delay:0.5,x:0, y:430, bezier:[{x:250, y:50}],onComplete: function (){
        finish();
      }});
      TweenMax.to(sp4, 0.5, {delay:0.3,x:0, y:240, bezier:[{x:250, y:50}],onComplete: function (){
        
      }});
      TweenMax.to(sp5, 0.5, {delay:0,x:0, y:180, bezier:[{x:250, y:50}],onComplete: function (){
        
      }});
    },
    onEnd: function (){
      console.log("scene1 onEnd");
    }
  })
});
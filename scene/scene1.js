;require(['anole', 'zepto', 'TweenLite', 'TweenMax'], function (anole, zepto, TweenLite, TweenMax){
  var sceneHandler = $('<div class="scene scene1">');

  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      sceneHandler.html('<div class="sprite sprite1"></div>');
      console.log("scene1 onInit");
      anole.hold.clean();
    },
    onStart: function (finish){
      console.log("scene1 onStart");
      var sp1 = $(".sprite1")[0];
      //var tl = new TimelineMax();
     // tl.to(sp1, 1, {left:"450px"});
     // tl.to(sp1, 1, {left:"450px",top:"450px"});
     // tl.to(sp1, 1, {left:"0",top:"450px"});
     // tl.to(sp1, 1, {left:"0",top:"0"});
      
      TweenMax.to(sp1, 1, {x:450, y:0, bezier:[{x:250, y:50}],onComplete: function (){
        finish();
      }});
    },
    onEnd: function (){
      console.log("scene1 onEnd");
      var sp1 = $(".sprite1")[0];
      anole.hold.add(sp1);
    }
  })
});
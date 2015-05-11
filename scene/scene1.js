;require(['anole', 'zepto', 'TweenLite', 'TweenMax'], function (anole, zepto, TweenLite, TweenMax){
  var sceneHandler = $('<div class="scene scene1">');

  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      sceneHandler.html('<div class="spite1"></div>');
      console.log("scene1 onInit");
    },
    onStart: function (finish){
      console.log("scene1 onStart");
      var sp1 = $(".spite1")[0];
      var tl = new TimelineMax();
      tl.to(sp1, 1, {left:"450px"});
      tl.to(sp1, 1, {left:"450px",top:"450px"});
      tl.to(sp1, 1, {left:"0",top:"450px"});
      tl.to(sp1, 1, {left:"0",top:"0"});
      
      setTimeout(function (){
        finish();
      },4000); 
    },
    onEnd: function (){
      console.log("scene1 onEnd");
      var h1 = sceneHandler.find("h1");
      anole.hold.add(h1);
    }
  })
});
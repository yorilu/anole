;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene3">');
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      var hold = anole.hold.getAll();
      sceneHandler.html(hold);
      console.log("scene3 onInit");
    },
    onStart: function (finish){
      console.log("scene3 onStart");
      var sp1 = $(".sprite1")[0];
      TweenMax.to(sp1, 1, {x:0, y:450,onComplete: function (){
        finish();
      }});
    },
    onBack: function (finish){
      console.log("scene3 onBack");
      var sp1 = $(".sprite1")[0];
      TweenMax.to(sp1, 0.5, {x:450, y:0,onComplete: function (){
        finish();
      }});
    },
    onEnd: function (){
      console.log("scene3 onEnd");
      var sp1 = $(".sprite1")[0];
      anole.hold.add(sp1);
    }
  })
});
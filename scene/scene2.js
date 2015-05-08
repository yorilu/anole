;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene2">');
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      var hold = anole.hold.getAll();
      sceneHandler.html(hold);
      console.log("scene2 onInit");
    },
    onStart: function (finish){
      console.log("scene2 onStart");
      setTimeout(function (){
        finish();
      },1000); 
    },
    onBack: function (finish){
      console.log("scene2 onBack");
      setTimeout(function (){
        finish();
      },1000); 
    },
    onEnd: function (){
      console.log("scene2 onEnd");
    }
  })
});
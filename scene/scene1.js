;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene1">');

  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      sceneHandler.html("<h1>1</h1>");
      console.log("scene1 onInit");
    },
    onStart: function (finish){
      console.log("scene1 onStart");
      setTimeout(function (){
        finish();
      },1000); 
    },
    onEnd: function (){
      console.log("scene1 onEnd");
      var h1 = sceneHandler.find("h1");
      anole.hold.add(h1);
    }
  })
});
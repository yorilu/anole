;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene1">');

  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      sceneHandler.html("<h1>1</h1>")
    },
    onStart: function (finish){
      console.log("scene1 playing");
      setTimeout(function (){
        console.log("scene1 playend");
        finish();
      },1000); 
    },
    onEnd: function (){
      var h1 = sceneHandler.find("h1");
      anole.hold.add(h1);
    }
  })
});
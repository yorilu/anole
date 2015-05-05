;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene3">');
  
  sceneHandler.html("<h1>3</h1>")
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      
    },
    onStart: function (finish){
      console.log("scene3 playing");
      setTimeout(function (){
        console.log("scene3 playend");
        finish();
      },1000); 
    },
    onEnd: function (){
      
    }
  })
});
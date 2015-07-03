;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene4">');
  
  sceneHandler.html("<h1>4</h1>")
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      
    },
    onStart: function (finish){
      console.log("scene4 playing");
      setTimeout(function (){
        console.log("scene4 playend");
        finish();
      },1000); 
    },
    onEnd: function (){
      
    }
  })
});
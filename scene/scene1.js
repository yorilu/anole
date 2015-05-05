;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene1">');
  
  sceneHandler.html("<h1>1</h1>")
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      
    },
    onStart: function (finish){
      console.log("scene1 playing");
      setTimeout(function (){
        console.log("scene1 playend");
        finish();
      },1000); 
    },
    onEnd: function (){
     
    }
  })
});
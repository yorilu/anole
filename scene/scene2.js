;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene2">');
  
  sceneHandler.html("<h1>2</h1>")
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      
    },
    onStart: function (finish){
      console.log("scene2 playing");
      setTimeout(function (){
        console.log("scene2 playend");
        finish();
      },1000); 
    },
    onEnd: function (){
      
    }
  })
});
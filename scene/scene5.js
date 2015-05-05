;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene5">');
  
  sceneHandler.html("<h1>5</h1>")
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      
    },
    onStart: function (finish){
      console.log("scene5 playing");
      setTimeout(function (){
        console.log("scene5 playend");
        finish();
      },1000); 
    },
    onEnd: function (){
      
    }
  })
});
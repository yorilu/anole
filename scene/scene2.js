;require(['anole', 'zepto'], function (anole){
  var sceneHandler = $('<div class="scene scene2">');
  
  anole.addScene({
    sceneHandler: sceneHandler,
    onInit: function (){
      var hold = anole.hold.getAll();
      sceneHandler.html(hold)
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
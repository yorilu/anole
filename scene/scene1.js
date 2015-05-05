;require(['anole', 'zepto'], function (anole){
  
  var sceneHandler = $("<div>");
  
  anole.addScene({
    anime:function(finish){
      console.log("scene1 playing");
      setTimeout(function (){
        console.log("scene1 playend");
        finish();
      },1000); 
    },
    sceneHandler: sceneHandler,
    onInit: function (){
      
    },
    onStart: function (){
      
    },
    onEnd: function (){
      
    }
  })
});
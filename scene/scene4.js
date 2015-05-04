;require(['anole', 'zepto'], function (anole){
  anole.addScene(function(finish){
    console.log("scene4 playing");
    setTimeout(function (){
      console.log("scene4 playend");
      finish();
    },1000); 
  })
});
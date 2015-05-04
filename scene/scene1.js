;require(['anole', 'zepto'], function (anole){
  anole.addScene(function(finish){
    console.log("scene1 playing");
    setTimeout(function (){
      console.log("scene1 playend");
      finish();
    },1000); 
  })
});
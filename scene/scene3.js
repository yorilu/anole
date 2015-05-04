;require(['anole', 'zepto'], function (anole){
  anole.addScene(function(finish){
    console.log("scene3 playing");
    setTimeout(function (){
      console.log("scene3 playend");
      finish();
    },3000); 
  })
});
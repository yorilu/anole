;require(['anole', 'zepto'], function (anole){
  anole.addScene(function(finish){
    console.log("scene2 playing");
    setTimeout(function (){
      console.log("scene2 playend");
      finish();
    },2000); 
  })
});
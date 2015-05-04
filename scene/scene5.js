;require(['anole', 'zepto'], function (anole){
  anole.addScene(function(finish){
    console.log("scene5 playing");
    setTimeout(function (){
      console.log("scene5 playend");
      finish();
    },1000); 
  })
});
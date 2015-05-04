;require(['anole', 'zepto'], function (anole){
  
  var template = "<div>";
  
  anole.addScene({
    anime:function(finish){
      console.log("scene1 playing");
      setTimeout(function (){
        console.log("scene1 playend");
        finish();
      },1000); 
    },
    template: template
  })
});
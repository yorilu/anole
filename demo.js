;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js'
      },
      {
        fileName:'scene2.js'
      },
      {
        fileName:'scene3.js'
      },
      {
        fileName:'scene4.js'
      },
      {
        fileName:'scene5.js'
      }
    ]
    baseUrl = './scene/';
  }

  anole.config({
    baseUrl:baseUrl,// root url 
    maxQueueLength: 2,//TODO load serval scenes at same time
    sceneQueue: sceneQueue,//anime scene queue
    autoPlay: false,//auto play with no event
    flipType: 'swipe',//flip type eg:click, swipe
    containerTemplate: '<div class="container"></div>',//scene root container
    prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',//prev button dom
    nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>'//next button dom
  })
  
  anole.start();
});
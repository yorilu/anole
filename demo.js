;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
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
    baseUrl = '/scene/';
  }

  anole.config({
    baseUrl:baseUrl,
    maxQueueLength: 2,
    sceneQueue: sceneQueue,
    autoPlay: false,
    flipType: 'click'//click, scroll
  })
  
  anole.start();
});
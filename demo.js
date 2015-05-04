;require(['anole'], function (anole){
  var senceQueue = [
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
    
  anole.config({
    baseUrl:'/scene/',
    maxQueueLength: 2,
    senceQueue: senceQueue
  })
  
  anole.start();
});
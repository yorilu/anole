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
    baseUrl:baseUrl,//场景的根目录
    maxQueueLength: 2,//TODO 最大加载场景数
    sceneQueue: sceneQueue,//场景队列
    autoPlay: false,//自动播放
    flipType: 'click',//翻页方式 click, scroll
    containerTemplate: '<div class="container"></div>',//场景根容器
    prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',//向上翻页按钮
    nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>'//向下翻页按钮
  })
  
  anole.start();
});
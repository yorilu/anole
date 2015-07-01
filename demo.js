;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  var resoureUrl;
  
  var resource = {
    "rs1": "rs1.jpg",
    "rs2": "rs2.jpg",
    "rs3": "rs3.jpg",
    "rs4": "rs4.jpg",
    "rs5": "rs5.jpg",
    "mymusic": "a.music"
  }
  
  //if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
        res: ["rs1","rs2","rs3","rs4","rs5","mymusic"] //depend resources.
      },
      {
        fileName:'scene2.js',
        res: ["rs1","rs2","rs3","rs4","rs5"] //depend resources.
      },
      {
        fileName:'scene3.js'
      },
      {
        fileName:'scene4.js'
      }
    ]
    baseUrl = '/scene/';
    resoureUrl = "/resource/";
  //}
  
  $(function (){
    anole.config({
      baseUrl:baseUrl,// root url 
      resoureUrl: resoureUrl,// resoure url like jpg/mp3
      resource: resource,//resource
      maxQueueLength: 2,//TODO load serval scenes at first
      sceneQueue: sceneQueue,//anime scene queue
      autoPlay: false,//auto play with no event
      flipType: 'click',//flip type eg:click, swipe, wheel
      containerTemplate: '<div class="container"></div>',//scene root container, it will be appended to body.
      prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',//prev button dom
      nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>',//next button dom
      showLoading: function (){ 
        $(".mask").show();
        console.log("loading resource, show load dialog");
      }, 
      hideLoading: function (){
        $(".mask").hide();
        console.log("resource loaded, hide load dialog")
      },
      showError: function (){ console.log("app error !!!! resource error!!!!") }
    })
    
    anole.start();
  })
  window.onerror = function (info){
    alert(info);
  }
});

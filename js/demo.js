;require(['anole'], function (anole){
  var sceneQueue;
  var baseUrl;
  var resourceUrl;
  
  var resource = {
	  "bridge": "bridge.png",
	  "gate": "gate.png",
	  "boat": "boat.png",
	  "oar": "oar.png",
	  "marco1": "marco1.png",
	  "marco2": "marco2.png",
	  "paperman": "paperman.png",
	  "font":"SansGBW3_min.ttf",
	  "sub-block": "subway.png",
	  "sub-left-gate": "subwayl.png",
	  "sub-right-gate": "subwayr.png",
	  "replay": "replay.png",
	  "tag": "tag.png",
	  "youtube-logo": "youtube-logo.png",
	  "profile": "profile.png",
	  "board_video": "board_video.png",
	  "v0": "v0.png",
	  "v1": "v1.png",
	  "v2": "v2.png",
	  'like':"like.png",
	  "worry1": "worry1.png",
	  "worry2": "worry2.png",
	  "worry3": "worry3.png",
	  "worry4": "worry4.png",
	  "chinese": "chinese.png",
	  "chinese_smile": "chinese_smile.png",
	  "bubble_disappear": "bubble_disappear.png",
	  "marco_nomouth": "marco_nomouth.png",
	  "mouth": "mouth.png",
	  "dollar": "dollar.png",
	  "dollar_big": "dollar_big.png",
	  "dollar_top": "dollar_top.png",
	  "dollar_mid": "dollar_mid.png",
	  "dollar_bottom": "dollar_bottom.png",
	  "dollar_outer": "dollar_outer.png",
	  "dollar_outer_big": "dollar_outer_big.png",
	  "happy": "happy.png",
	  "shoppingbag": "shoppingbag.png",
	  "canadian0":"canadian0.png",
	  "canadian1":"canadian1.png",
	  "canadian2":"canadian2.png",
    "KoreanG":"KoreanG.png",
    "KoreanB":"KoreanB.png",
    "KoreanR":"KoreanR.png",
	  "map":"map.png",
	  "mark1":"mark1.png",
	  "mark2":"mark2.png",
	  "mark3":"mark3.png",
	  "mark4":"mark4.png",
	  "browsertab":"browstab.png",
	  "w1d":"wifi1_dark.png",
	  "w1l":"wifi1_light.png",
	  "w2d":"wifi2_dark.png",
	  "w2l":"wifi2_light.png",
	  "w3d":"wifi3_dark.png",
	  "w3l":"wifi3_light.png",
	  "glogo":"googlelogowithshadow.png",
	  "searchbar":"searchbarwithshadow.png",
	  "progbar":"progressbar.png",
	  "nexus":"nexuswithshadow.png",
	  "tag_blue": "tag_blue.png",
	  "tag_red": "tag_red.png",
	  "tag_yellow": "tag_yellow.png",
	  "chn_food":"chn_food.png",
	  "west_food":"west_food.png",
	  "lung_tab":"lung_tab.png",
	  "plate":"plate.png",
	  "lung_m":"lung_m.png",
	  "lung_f":"lung_f.png",
	  /* Videos */
	  "french":"french.mp4",
	  "french_webm": "french.webm",
	  "food1":"food1.mp4",
	  "food1_webm":"food1.webm",
	  "food2":"food2.mp4",
	  "food2_webm":"food2.webm",
	  "toilet":"toilet.mp4",
	  "toilet_webm":"food2.webm",
	  "gsvg":"g.svg",
	  "googlelogo": "googlelogo.png",
  }
  
  //if(!anole.isMobile()){
    sceneQueue = [
      {
        fileName:'scene1.js',
        res: [] //depend resources.
      },
      {
        fileName:'scene2.js',
        res: []
      },
      {
        fileName:'scene3.js',
        res: []
      },
      {
        fileName:'scene4.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate"]
      },
      {
        fileName:'scene5.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay"]
      },
      {
        fileName:'scene6.js',
        res: ["marco1","paperman","sub-block","sub-left-gate","sub-right-gate","replay","like"]
      },
      {
        fileName:'scene7.js',
        res: ["profile","youtube-logo","tag","board_video","v0","v1","v2","worry1", "worry2", "worry3", "worry4"]
      },
      {
        fileName:'scene8.js',
        res: ["bubble_disappear", "marco_nomouth", "mouth", "chinese", "chinese_smile"]
      },
      {
        fileName:'scene9.js',
        res: ["dollar", "dollar_big", "dollar_top", "dollar_mid", "dollar_bottom", "dollar_outer", "dollar_outer_big"]
      },
      {
        fileName:'scene10.js',
        res: ["shoppingbag"]
      },
      {
        fileName:'scene11.js',
        res: ["canadian0","canadian1","canadian2","KoreanR","KoreanG","KoreanB"]
      },
      {
        fileName: 'scene12.js',
        res: ["french","french_webm"]
      },
      {
        fileName:'scene13.js',
        res: ["gate","boat","marco2"]
      },
      {
        fileName:'scene14.js',
        res: ["map","mark1","mark2","mark3","mark4"]
      },
      {
        fileName:'scene15.js',
        res: ["map"]
      },
      {
        fileName:'scene16.js',
        res: ["browsertab","w1d","w1l","w2d","w2l","w3d","w3l","glogo","searchbar","progbar"]
      },
      {
        fileName:'scene17.js',
        res: ["browsertab","glogo","searchbar","progbar","nexus"]
      },
      {
        fileName:'scene18.js',
        res: [""]
      },
      {
        fileName: 'scene19.js',
        res: ["food1","food1_webm","food2","food2_webm","tag_blue","tag_yellow","tag_red"]
      },
      {
        fileName:'scene20.js',
        res: ["chn_food","west_food"]
      },
      {
        fileName:'scene21.js',
        res: ["lung_f","lung_m","lung_tab","plate"]
      },
      {
        fileName: 'scene22.js',
        res: ["toilet","toilet_webm"]
      },
      {
        fileName: 'scene23.js',
        res: ["gsvg", "googlelogo"]
      },
    ]
    // baseUrl = 'http://gtravel.b0.upaiyun.com/scene/';
    baseUrl = '/scene/';
    // resourceUrl = "http://gtravel.b0.upaiyun.com/resource/";
    resourceUrl = "/resource/";
  //}
  
  $(function (){
	// Push voiceover files to sceneQueue.
    for (i=1; i<=sceneQueue.length; i++) {
		resource['vo'+i] = 'Sound3/' + i + '.mp3';
		(sceneQueue[i-1].res).push('vo'+i);
	}
	var config = {
      baseUrl:baseUrl,// root url 
      resourceUrl: resourceUrl,// resource url like jpg/mp3
      resource: resource,//resource
      maxQueueLength: 1,//TODO load serval scenes at first
      sceneQueue: sceneQueue,//anime scene queue
      autoPlay: false,//auto play with no event
      flipType: 'click',//flip type eg:click, swipe, wheel
      containerTemplate: '<div class="container"></div>',//scene root container, it will be appended to body.
      prevBtnTemplate: '<div class="prev-btn btn J_PrevBtn">prev</div>',//prev button dom
      nextBtnTemplate: '<div class="next-btn btn J_NextBtn">next</div>',//next button dom
      startBtnTemplate: '<div class="start-btn btn J_StartBtn">start</div>', //start button dom
	  showLoading: function (){ 
        $(".mask").show();
        console.log("loading resource, show loading message.");
      }, 
      hideLoading: function (){
        $(".mask").hide();
        console.log("resource loaded, hide loading message.")
      },
	  showFirstLoading: function() {
        $(".opening").show();
        console.log("loading first several scenes, show opening animation.");
	  },
      hideFirstLoading: function (){
        $(".opening").hide();
        console.log("First batch of scencs loaded, hide opening animations.")
      },
      showError: function (msg){ console.log(msg); }
    };

    if(anole.isMobile()) {
		config.flipType = 'swipe';
		config.autoPlay = false;
	}
	/*
	autoBtn.on('click', function(){
		config.flipType = 'auto';
		config.autoPlay = true;
		anole.config(config);
		anole.start();
		autoBtn.hide();
	});
   */
	anole.config(config);
    anole.start();
    var window_w = document.body.clientWidth;
    var window_h = document.body.clientHeight;
	var canvas = anole.canvas;
    var scene_w = canvas.width();
    var scene_h = canvas.height();
	var loading = $('.mask');
	var opening = $('.opening');
	loading.appendTo(canvas);
	opening.appendTo(canvas);
    var canvas_w;
	var canvas_h;
	var ratio = 0.75;
	var scale = 1;
	if (window_h / window_w < ratio) {
	   canvas_h = window_h;
	   canvas_w = ratio * window_h;
	   scale = window_h / scene_h + "";
	} else {
		canvas_w = window_w;
		canvas_h = window_w / ratio;
		scale = window_w / scene_w + "";
	}
    function getSupportedPropertyName() {
      var properties = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
      for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
          return properties[i];
        }
      }
      return null;
    }
    var transformProperty = getSupportedPropertyName();
    canvas.css(transformProperty,"translate3d(-50%,"+((scale-1)*scene_h/2)+"px,0) scale("+scale+","+scale+")");
    // canvas.css(transformProperty,"translate3d(-50%,"+((scale-1)*scene_h/2)+"px,0)");
  })
});

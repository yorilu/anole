;define(['zepto'], function (zepto){
  var anole = window.anole || {};
    
    function initRequestAnimationFrame(){
      //use function setTimeout if requestAnimationFrame is not available
      var lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
      }
      if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() {
              callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
      if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
      return {
        requestAnimationFrame: window.requestAnimationFrame,
        cancelAnimationFrame: window.cancelAnimationFrame
      }
    }
    
    anole= {
      _currentScene: 0,
      _loadedScene:0,
      _playedScene:0,
      _config:{},
      _scene:{},
      _playFirst: false,
      _init: function (){
        this.mix(this, initRequestAnimationFrame());
      },
      fc: function (){},
      config: function (config){
        this.mix(this._config, config);
      },
      getScript: function(src, func) {
        var script = document.createElement('script');
        script.async = "async";
        script.src = src;
        if (func) {
           script.onload = func;
        }
        document.getElementsByTagName("head")[0].appendChild(script);
      },
      mix: function (a,b){
        $.each(b, function (k,v){
          a[k]=v;
        })
      },
      start: function (){
        var that = this;
        this._loadScene();
        
        if(this._config.flipType == 'click'){
          var prevBtn = this._prevBtn = $(this._config.prevBtnTemplate);
          var nextBtn = this._nextBtn =  $(this._config.nextBtnTemplate);
          $('body').append(prevBtn).append(nextBtn);
          prevBtn.on('click', function (){
            that.playPrev();
          })
          nextBtn.on('click', function (){
            that.playNext();
          })
        }
      },
      addScene: function (scene){
        var that = this;
        this._scene[this._loadedScene++] = scene;
        if(!this._playFirst){
          this._playFirst = true;
          this.playScene(0);
        }
      },
      _loadScene: function (){
        var that = this;
        if(this._loadedScene > this._config.sceneQueue.length -1){
          return;
        }
        var fileName = this._config.sceneQueue[this._loadedScene].fileName;
        var loc = location.href.substring(0,location.href.lastIndexOf('/'));
        
        var url = loc + this._config.baseUrl+fileName;
        this.getScript(url,function(data){
          
        })
      },
      isMobile: function() {
        if (/(iPhone|iPod|Android|ios|SymbianOS)/i.test(navigator.userAgent)){
            return true;
        }else{
          return false
        }
      },
      playPrev: function (){
        if(!this._currentScene){
          return;
        }
        this.playScene(--this._currentScene);
      },
      playNext: function (){
        var that = this;
        if(this._currentScene > this._loadedScene -1){
            return;
        }
        
        if(this._currentScene >= this._playedScene){
          this._playedScene = this._currentScene + 1;
        }
        this.playScene(++this._currentScene);
      },
      playScene: function (index){
        var that = this;
        var scene = this._scene[index];
        
        var sceneHandler = scene.sceneHandler;
        $(".J_Container").html(sceneHandler);
        
        scene.onInit && scene.onInit();//初始化场景
        if(this._config.autoPlay){     //是否是自动播放
          scene.onStart && scene.onStart(function (){
            scene.onEnd && scene.onEnd();
            that.playNext();//如果是自动播放，则finish直接调用 playNext
          });
        }else{
          scene.onStart && scene.onStart(function (){
            scene.onEnd && scene.onEnd();
          });
        }
        
        /*
        sceneHandler.on('click', function (){
          scene.onEnd && scene.onEnd();
          that.playNext();
        })
        */
        
        this._loadScene();//播放同时加载下一个场景
      },
      playMusic: function (){
        //todo
      },
      playVideo: function (){
        //todo
      }
    };
    
    anole._init();
    
    return anole;
});
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
      _root: null, // root container
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
        //Load scripts to the bottom of body.
        document.getElementsByTagName("body")[0].appendChild(script);
      },
      // attach b's key-value pairs to a as properties.
      mix: function (a,b){
        $.each(b, function (k,v){
          a[k]=v;
        })
      },
      start: function (){
        var _root = this._root = $(this._config.containerTemplate);
        $('body').append(_root);
        
        if(this._config.flipType == 'click'){
          var prevBtn = this._prevBtn = $(this._config.prevBtnTemplate);
          var nextBtn = this._nextBtn =  $(this._config.nextBtnTemplate);
          $('body').append(prevBtn).append(nextBtn);
          prevBtn.on('click', this.playPrev.bind(this));
          nextBtn.on('click', this.playNext.bind(this));
        }
        
        this._loadScene();
      },
      addScene: function (scene){
        this._scene[this._loadedScene-1] = scene;
        if(this._loadedScene==1){
          this.playScene(0);
        }
      },
      _loadScene: function (){
        var that = this;
        if(this._loadedScene > this._config.sceneQueue.length -1){
          return;
        }
        var fileName = this._config.sceneQueue[this._loadedScene].fileName;
        var url = this._config.baseUrl+fileName;
        this.getScript(url,function(data){
          this._loadedScene++
        }.bind(this));
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
        if(this._currentScene > this._loadedScene -1){
            return;
        }
        
        if(this._currentScene >= this._playedScene){
          this._playedScene = this._currentScene + 1;
        }
        this.playScene(++this._currentScene);
      },
      playScene: function (index){
        var scene = this._scene[index];
        
        var sceneHandler = scene.sceneHandler;
        this._root.html(sceneHandler);
        
        scene.onInit && scene.onInit();//init scene
        if(this._config.autoPlay){     //autoplay
          scene.onStart && scene.onStart(function (){
          scene.onEnd && scene.onEnd();
          // auto play next scene if config.autoPlay is true
          this.playNext.bind(this)();
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
        
        this._loadScene();//load next scene when playing current scene
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

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
      _animeQueue: {},
      _currentScene: 0,
      _loadedScene:0,
      _playedScene:0,
      _config:{},
      _init: function (){
        this.mix(this, initRequestAnimationFrame());
      },
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
        this._loadScene();
      },
      addScene: function (anime){
        var that = this;
        this._animeQueue[this._loadedScene++] = function (){
          anime($.proxy(that.playNext, that));
        };
        if(this._currentScene == 0){
          this.playNext();
        }
      },
      _loadScene: function (){
        var that = this;
        if(this._loadedScene > this._config.senceQueue.length -1){
          return;
        }
        var fileName = this._config.senceQueue[this._loadedScene].fileName;
        this.getScript(location.origin + this._config.baseUrl+fileName,function(data){
          
        })
      },
      playNext: function (){
        if(this._currentScene >= this._playedScene){
          this._playedScene = this._currentScene + 1;
        }
        
        var fn = this._animeQueue[this._currentScene++];
        fn && fn();
        this._loadScene();
      }
    };
    
    anole._init();
    
    return anole;
});
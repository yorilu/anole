;define(['zepto', 'hammer'], function (zepto, Hammer){
  var musicList = {};
  
  var anole = window.anole = {
      _currentScene: 0,
      _loadedScene:0,
      _playedScene:0,
      _config:{},
      _scene:{},
      canvas: null, // canvas
      _resourceLoaded: {},
      _init: function (){
        var $canvas = $(this._config.containerTemplate);
        $('body').append($canvas);
        var _canvas = this.canvas = $canvas;
        
        if(this._config.flipType == 'click'){
          var prevBtn = this._prevBtn = $(this._config.prevBtnTemplate);
          var nextBtn = this._nextBtn =  $(this._config.nextBtnTemplate);
          $('body').append(prevBtn).append(nextBtn);
          prevBtn.on('click', this.playPrev.bind(this));
          nextBtn.on('click', this.playNext.bind(this));
        }else if(this._config.flipType == 'swipe'){
          var hammer = new Hammer(_canvas[0]);
          hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
          hammer.on('swipe', function(ev) {
              var d = ev.offsetDirection;
              if(d == 2 || d == 8){
                this.playPrev();
              }else{
                this.playNext();
              }
          }.bind(this));
        }else if(this._config.flipType == 'wheel'){
          $(document).bind('mousewheel DOMMouseScroll', function(event) {
            event.preventDefault();
            var delta;
            var type = event.type;
            delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
            if(delta < 0){
              this.playNext();
            }else{
              this.playPrev();
            }
          }.bind(this))
        }
        
        
        this._loadScene();
      },
      showLoading: function (){/* abstract */}, // it will be triggered when loading the resource of current scene 
      hideLoading: function (){/* abstract */},// it will be triggered when resource loaded finished
      showError: function (){/* abstract */}, // it will be triggered when resource error
      fc: function (){},
      config: function (config){
        $.each(config, function (k,v){
          if($.isFunction(v)){
            this[k]=v;
          }else{
            this._config[k]=v;
          }
        }.bind(this));
      },
      getScript: function(src, func) {
        var script = document.createElement('script');
        script.async = "async";
        script.src = src;
        if (func) {
           script.onload = func;
        }
        //Load scripts to the bottom of body.
        document.body.appendChild(script);
      },
      // attach b's key-value pairs to a as properties.
      mix: function (a,b){
        $.each(b, function (k,v){
          a[k]=v;
        })
      },
      getOrCreate: function (query, tag, parent, style){
        var target;

        target = $(query);
        if(!target[0]){
          if($.isFunction(tag)){
            target = tag();
            if(!$.isObject(target)){
              target = $(target);
            }
          }else{
            target = $(tag);
          }
          if(parent){
            $(parent).append(target);
          }
        }
        
        if (style) {
          target.css(style);
        }
        return target;
      },
      start: function (){
        this._init();
      },
      addScene: function (scene){
        this._scene[this._loadedScene-1] = scene;
      },
      startAnime: function (){
        this.playScene(0);
      },
      _loadScene: function (){
        var that = this;
        if(this._loadedScene > this._config.sceneQueue.length -1){
          return;
        }
        
        var nextScene = this._config.sceneQueue[this._loadedScene];
        var fileName = nextScene.fileName;
        var res = nextScene.res || [];
        
        if(this._currentScene == this._loadedScene){
          this.showLoading();
        }
        
        //TODO load resource and scene at the same time; 
        this._loadResource(res, function (){
          var url = this._config.baseUrl+fileName;
          this.getScript(url,function(data){
            this.hideLoading();
            this._loadedScene++
          }.bind(this));
        }.bind(this));
      },
      _loadResource: function (res, callback){
        
        if(!res.length){
          callback && callback();
          return;
        }
        
        function loadNext(){
          this._loadOneResource(res.pop(), function (){
            if(!res.length){
              callback && callback();
            }else{
              loadNext.bind(this)();
            }
          }.bind(this))
        };
        
        loadNext.bind(this)();
      },
      _loadOneResource: function (res, callback){
        
        if(this._resourceLoaded[res]){
          callback && callback();
          return;
        }
        var src = this._config.resoureUrl + this._config.resource[res];
        var error = function (){
          this.showError();
        }
        
        if(/\.mp3|\.wav|\.ogg$/.test(src)){
          var media = new Audio(src);  
          media.src = src;
          this._resourceLoaded[res] = true;
          $(media).on("canplay",function (e){
            musicList[res] = media;
            callback && callback();
          })
        }else{
          var obj;
          obj = document.createElement("img");
          obj.src = src;
        
          var load = function (){
            this._resourceLoaded[res] = true;
            callback && callback();
            $(obj).off("load", load);
            $(obj).off("error", error);
          };
          $(obj).on("load", load.bind(this));
          $(obj).on("error", error.bind(this));
        }
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
        this.triggerBack(this._currentScene)
      },
      playNext: function (){
        if(this._currentScene +1 > this._loadedScene -1){
            return;
        }
        
        if(this._currentScene >= this._playedScene){
          this._playedScene = this._currentScene + 1;
        }
        this.triggerEnd(this._currentScene)
        this.playScene(++this._currentScene);
      },
      triggerBack:function (index){
        var scene = this._scene[index];
        scene.onBack && scene.onBack(function (){
          this.playScene(--this._currentScene);
        }.bind(this));
      },
      triggerEnd: function (index){
        var scene = this._scene[index];
        scene.onEnd && scene.onEnd();
      },
      playScene: function (index){
        var scene = this._scene[index];
       
        scene.onInit && scene.onInit();//init scene
        if(this._config.autoPlay){     //autoplay
          scene.onStart && scene.onStart(function (){
            // auto play next scene if config.autoPlay is true
            this.playNext();
          }.bind(this));
        }else{
          scene.onStart && scene.onStart(function (){});
        }

        this._loadScene();//load next scene when playing current scene
      },
      getMusic: function (res){
        var music = musicList[res];
        if(music){
          return music
        }
      },
      playVideo: function (){
        //todo
      }
    };
    
    anole.$$ = anole.getOrCreate;
    
    return anole;
});

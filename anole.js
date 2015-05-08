;define(['zepto', 'hammer'], function (zepto, Hammer){
  var anole = window.anole || {};
  
    var hold = (function (){
      var $fragment = $("<fragment>");
      
      return {
        add: function (dom){
          $(dom).appendTo($fragment);
        },
        get: function (string){
          return $fragment.find(string);
        },
        getAll: function (){
          return $fragment;
        },
        clean: function (){
          $fragment.html("");
        }
      }
    })()
  
    anole= {
      _currentScene: 0,
      _loadedScene:0,
      _playedScene:0,
      _config:{},
      _scene:{},
      _root: null, // root container
      _init: function (){
        var _root = this._root = $(this._config.containerTemplate);
        $('body').append(_root);
        
        if(this._config.flipType == 'click'){
          var prevBtn = this._prevBtn = $(this._config.prevBtnTemplate);
          var nextBtn = this._nextBtn =  $(this._config.nextBtnTemplate);
          $('body').append(prevBtn).append(nextBtn);
          prevBtn.on('click', this.playPrev.bind(this));
          nextBtn.on('click', this.playNext.bind(this));
        }else if(this._config.flipType == 'swipe'){
          var hammer = new Hammer(_root[0]);
          hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
          hammer.on('swipe', function(ev) {
              var d = ev.offsetDirection;
              if(d == 2 || d == 8){
                this.playPrev();
              }else{
                this.playNext();
              }
          }.bind(this));
        }
        
        this._loadScene();
      },
      hold: hold,
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
        this._init();
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
        this.triggerEnd(this._currentScene)
        this.playScene(--this._currentScene);
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
      triggerEnd: function (index){
        var scene = this._scene[index];
        scene.onEnd && scene.onEnd();
      },
      playScene: function (index){
        var scene = this._scene[index];
        
        var sceneHandler = scene.sceneHandler;
        this._root.html(sceneHandler);
        
        scene.onInit && scene.onInit();//init scene
        if(this._config.autoPlay){     //autoplay
          scene.onStart && scene.onStart(function (){
            // auto play next scene if config.autoPlay is true
            this.playNext();
          }.bind(this));
        }else{
          scene.onStart && scene.onStart(function (){
            
          });
        }

        this._loadScene();//load next scene when playing current scene
      },
      clearCanvas: function (){
        this._root.html("");
      },
      playMusic: function (){
        //todo
      },
      playVideo: function (){
        //todo
      }
    };
    
    return anole;
});

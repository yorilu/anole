// Done:
// 1. the loadedScene index should be updated together with playScene when play scene-to-play.
// 2. fix the onStart without finish in timeline end issue.
// TODO:
// 1. for each scene: set a index for each scene to fix the multi-scene-load-order-can-be-wrong issue
// 2. for each scene: expose its timeline to make it easy to manage.
;
define(['zepto', 'hammer','TimelineLite'],
function(zepto, Hammer,TimelineLite) {
  var mediaList = {};

  var ua = navigator.userAgent;
  var device = {
    os: {
      isAndroid: ua.indexOf('Android') > 0,
      isIOS: /iP(ad|hone|od)/.test(ua)
    },
    browser: {
      QQ: ua.indexOf('MQQBrowser') > 0,
      UC: ua.indexOf('UCBrowser') > 0,
      MIUI: ua.indexOf('MiuiBrowser') > 0,
      WeiXin: ua.indexOf('MicroMessage') > 0,
      Chrome: !!window.chrome,
      Opera: /opera.([\d.]+)/i.test(ua),
      Safari: /version\/([\d.]+)/i.test(ua),
      FireFox: /firefox\/([\d.]+)/i.test(ua),
      IE: /msie ([\d.]+)/i.test(ua)
    }
  }
  
  
  var _videoListDiv = $('<div id="anoleVideo">');
  _videoListDiv.css({
    position:'absolute',
    left:-10000
  })
  $("body").append(_videoListDiv)
  
  var anole = window.anole = {
    _currentScene: -1,
    _loadFirstFinish: false,
    _sceneNameIndexMap: {},
    // mapping from scene js name to its index in the scene queue to play.
    _playedScene: 0,
    _nextSceneIndexToPlay: -1,
    // the scene should play once loaded (added onto anole scene)
    _config: {},
    _loadedSceneScript: 0,
    _scene: {},
    // mapping from scene index to scene. If none, then the scene is not added onto the stage.
    canvas: null,
    _resourceLoaded: {},
    _videoList:_videoListDiv,
    _init: function() {
      this.removeCanvas();
      var $canvas = $(this._config.containerTemplate);
      $('body').append($canvas);
      var _canvas = this.canvas = $canvas;

      var playPrev = this.throttle(this.playPrev.bind(this), 1000);
      var playNext = this.throttle(this.playNext.bind(this), 1000);
      var startAnime = this.throttle(this.startAnime.bind(this), 1000);
      var muteBtn = this._config.muteBtnTemplate || '<div class="mute-btn btn J_MuteBtn" value="MuteMusic">mute</div>';
      this.muteBtn = $(muteBtn);
      this.muteBtn.on('click', this.toggleMuteAll.bind(this));
      this.muteBtn.appendTo(_canvas);
      var startBtn = this._startBtn = $(this._config.startBtnTemplate);
      _canvas.append(startBtn);

      startBtn.on('click', startAnime);

      var autoBtn = this._autoBtn = $('<div class="btn auto-btn">Auto Play</div>').appendTo(_canvas);
      autoBtn.on('click',
      function() {
        this._config.flipType = 'auto';
        this._config.autoPlay = true;
        this.startAnime();
        if (this._prevBtn) {
          this._prevBtn.hide();
        }
        if (this._nextBtn) {
          this._nextBtn.hide();
        }
      }.bind(this));

      if (this._config.flipType == 'click') {
        var prevBtn = this._prevBtn = $(this._config.prevBtnTemplate);
        var nextBtn = this._nextBtn = $(this._config.nextBtnTemplate);
        _canvas.append(prevBtn).append(nextBtn);
        prevBtn.on('click', playPrev);
        nextBtn.on('click', playNext);
      } else if (this._config.flipType == 'swipe') {
        var hammer = new Hammer(_canvas[0]);
        hammer.get('swipe').set({
          direction: Hammer.DIRECTION_ALL
        });
        hammer.on('swipe',
        function(ev) {
          var d = ev.offsetDirection;
          if (d == 2 || d == 8) {
            playPrev();
          } else {
            playNext();
          }
        }.bind(this));
      } else if (this._config.flipType == 'wheel') {
        $(document).bind('mousewheel DOMMouseScroll',
        function(event) {
          event.preventDefault();
          var delta;
          var type = event.type;
          delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
          if (delta < 0) {
            playNext();
          } else {
            playPrev();
          }
        }.bind(this))
      }
      // if maxQueueLength = i, we will have scene[1...i] at one time
      // 
      if (this._config.maxQueueLength > this._config.sceneQueue.length) {
        this._config.maxQueueLength = this._config.sceneQueue.length
      }

      // Call showLoading at the beginning of loading.
      this.showFirstLoading();
      this._loadScene(0);
    },
    removeCanvas: function() {
      this.canvas && this.canvas.remove();
    },
    clearCanvas: function() {
      this.canvas && this.canvas.empty();
    },
    removeSceneDoms: function() {
      $('.scene').remove();
    },
    showFirstLoading: function() {
      /* abstract */
    },
    // Triggered when waiting for the first several scenes to be ready. 
    hideFirstLoading: function() {
      /* abstract */
    },
    // Triggered when the animation is ready to play.
    showLoading: function() {
      /* abstract */
    },
    // it will be triggered when loading the resource of current scene 
    hideLoading: function() {
      /* abstract */
    },
    // it will be triggered when resource loaded finished
    showError: function() {
      /* abstract */
    },
    // it will be triggered when resource error
    fc: function() {},
    config: function(config) {
      $.each(config,
      function(k, v) {
        if ($.isFunction(v)) {
          this[k] = v;
        } else {
          this._config[k] = v;
        }
      }.bind(this));
    },
    // Script is load when all resources on this scene is being loaded. (async)
    // TODO : Don't load the same script twice.
    getScript: function(src, sceneIndex, callback) {
      var script = document.createElement('script');
      script.async = "async";
      script.src = src;
      script.onload = function() {
        var thisSrc = src;

        //for debug
        if (callback) {
          callback();
          return;
        }

        console.log("GetScript onload. sceneIndex: " + sceneIndex + ". src: " + thisSrc);
        this._loadedSceneScript++;
        if (typeof this._config.maxQueueLength == 'undefined' || this._config.maxQueueLength == 0) {
          this.hideFirstLoading();
        } else {
          if (this._loadedSceneScript <= this._currentScene + this._config.maxQueueLength) {
            this._loadScene(this._loadedSceneScript);
          } else {
            this._loadFirstFinish = true;
            this.hideFirstLoading();
          }
        }

      }.bind(this);
      //Load scripts to the bottom of body.
      document.body.appendChild(script);
    },
    // attach b's key-value pairs to a as properties.
    mix: function(a, b) {
      $.each(b,
      function(k, v) {
        a[k] = v;
      })
    },
    // Returns a jQuery object instead of a dom node.
    getOrCreate: function(query, tag, parent, style) {
      var target;

      target = $(query);
      if (!target[0]) {
        if ($.isFunction(tag)) {
          target = tag();
          if (!$.isObject(target)) {
            target = $(target);
          }
        } else {
          target = $(tag);
        }
        if (parent) {
          $(parent).append(target);
        }
      }
      if (style) {
        target.css(style);
      }
      return target;
    },
    start: function() {
      this._init();
    },
    addScene: function(scene) {
      var addedSceneIndex = this._sceneNameIndexMap[scene.name];
      console.log("addScene: name: " + scene.name + " index: " + addedSceneIndex + " Next scene to play: " + this._nextSceneIndexToPlay);
      this._scene[addedSceneIndex] = scene;

      if (this._nextSceneIndexToPlay == addedSceneIndex) {
        console.log("addScene: play nextSceneToPlay: " + addedSceneIndex);
        // be sure to put this before playscene, as playscene might playnext inside
        this._nextSceneIndexToPlay = -1;
        this.hideLoading();
        console.log("addScene => playScene todo" + (this._currentScene + 1));
        // do {
        //  this.triggerForward(this._currentScene++);
        //  } while (this._currentScene!=addedSceneIndex);
        // this.playScene(addedSceneIndex);
        this.playNext();
        return;
      }
    },
    startAnime: function() {
      this._startBtn && this._startBtn.hide();
      this._autoBtn && this._autoBtn.hide();
      // Never call playScene directly.
      // Because that scene may not be added yet!
      // this.playScene(0);
      this.playNext();
    },
    _loadScene: function(sceneIndex) {
      console.log("loadScene, index: " + sceneIndex + " sceneQueueLength: " + this._config.sceneQueue.length);
      if (sceneIndex > this._config.sceneQueue.length - 1) {
        return;
      }

      var nextScene = this._config.sceneQueue[sceneIndex];
      var fileName = nextScene.fileName;
      var res = nextScene.res || [];

      if (typeof this._sceneNameIndexMap[fileName] != 'undefined') {
        return;
      }

      this._sceneNameIndexMap[fileName] = sceneIndex;

      if (this._currentScene == sceneIndex) {
        // Call showLoading at the beginning of loading.
        this.showLoading();
      }

      //TODO load resource and scene at the same time;
      this._loadResource(res,
      function() {
        var url = this._config.baseUrl + fileName;
        this.getScript(url, sceneIndex);
      }.bind(this));
    },
    _loadResource: function(res, callback) {

      if (!res.length) {
        // console.log("loadResource: run callback when res.length is 0");
        callback && callback();
        return;
      }

      function loadNext() {
        this._loadOneResource(res.pop(),
        function() {
          if (!res.length) {
            callback && callback();
          } else {
            loadNext.bind(this)();
          }
        }.bind(this))
      };

      loadNext.bind(this)();
    },
    _loadOneResource: function(res, callback) {

      console.log('_loadOneResource: ' + res);
      if (this._resourceLoaded[res]) {
        callback && callback();
        return;
      }
      var src = this._config.resourceUrl + this._config.resource[res];
      var error = function() {
        this.showError("Error loading " + src);
        callback && callback(); // Load the next, WHATAVER!
      }
    
      // TODO: add loading handler for font files.
      if (/\.mp3|\.wav|\.ogg|\.music$/.test(src)) {
        src = this.transfer2Music(src);

        var media = new Audio(src);
        media.src = src;
        media.controls = false;
        media.preload = true;
        media.load();
        this._resourceLoaded[res] = true;
        $(media).on("canplay",
        function(e) {
          mediaList[res] = media;
          callback && callback();
          $(this).unbind();
        }).on("error",
        function() {
          $(this).unbind();
          callback && callback();
        })
      }else if (/\.video$/.test(src)){
        var file = this._config.resource[res];
        if(this._videoList.find("#"+res)[0]){
          return ;
        }
        var arr =[".mp4",".webm"];
        var mp4Src = src.replace(".video",".mp4");
        var webmSrc = src.replace(".video",".webm");
        var html = '<video id="'+ res +'" width="800" height="374">'+
                     '<source src="'+mp4Src+'" type="video/mp4" />'+
                     '<source src="'+webmSrc+'" type="video/webm" />'+
                   '</video>';
        var $html = $(html);
        this._videoList.append($html);
        callback && callback();
      }else {
        var obj;
        obj = document.createElement("img");
        obj.src = src;

        var load = function() {
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
      if (/(iPhone|iPod|Android|ios|SymbianOS)/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false
      }
    },
    playPrev: function() {
      console.log("playPrev: " + this._currentScene);
      if (!this._currentScene) {
        return;
      }
      this.triggerBack(this._currentScene)
    },
    playNext: function() {
      console.log("---- PLAY NEXT, index: " + this._currentScene + ". Now play next");
      if (!this._scene[this._currentScene + 1]) { // If next scene is not ready yet.
        this._nextSceneIndexToPlay = this._currentScene + 1;
        console.log("playNext failed: scene is not added yet: " + (this._currentScene + 1) + ". nextSceneIndexToPlay: " + this._nextSceneIndexToPlay);
        this.showLoading();
        return;
      } else {
        console.log("playNext: scene is ready: " + (this._currentScene + 1));
      }

      if (this._currentScene >= this._playedScene) { // Already played.
        this._playedScene = this._currentScene + 1;
      }
      this.triggerForward(this._currentScene);
      console.log("PlayNext => playScene" + (this._currentScene + 1)); ++this._currentScene;
      this.playScene(this._currentScene);
    },
    // This shouldn't be done on anole level but
    // We need to save time and
    // will refactor the first 6 scene's code later on.
    hackBackForward: function(scene) {
      if (scene.music || scene.musicName) {
        scene.music = this.getMedia(scene.musicName);
        if(scene.music){
          scene.music.pause();
          scene.music.currentTime = 0;
        }
      }
    },
    triggerBack: function(index) {
      if (index == 0) return;
      var scene = this._scene[index];
      if (!this.animation) {
        this.hackBackForward(scene);
      }
      scene.onBack && scene.onBack(function() {
        this.playScene(--this._currentScene);
      }.bind(this));
    },
    triggerForward: function(index) {
      if (index < 0 || index >= this._config.sceneQueue.length) return;
      var scene = this._scene[index];
      if (!this.animation) {
        this.hackBackForward(scene);
      }
      scene.onEnd && scene.onEnd(); // TODO: change all onEnd to onForward
      scene.onForward && scene.onForward();
    },
    playScene: function(index) {
      this._currentScene = index;
      console.log("---- PlayScene: " + index);
      var scene = this._scene[index];
      if (!scene) return;

      if (index == 0) { // the last scene.
        this._prevBtn && this._prevBtn.addClass('disabled');
      } else {
        this._prevBtn && this._prevBtn.removeClass('disabled');
      }

      if (index == this._config.sceneQueue.length - 1) { // the last scene.
        this._nextBtn && this._nextBtn.addClass('disabled');
      } else {
        this._nextBtn && this._nextBtn.removeClass('disabled');
      }
      scene.onInit && scene.onInit(); //init scene
      if (this._config.autoPlay) { //autoplay
        scene.onStart && scene.onStart(function() {
          // auto play next scene if config.autoPlay is true
          console.log("Autoplay scene.onStart");
          this.playNext();
        }.bind(this));
      } else {
        scene.onStart && scene.onStart(function() {});
      }

      if (this._loadFirstFinish) {
        this._loadScene(index + this._config.maxQueueLength);
      } else {
        this._loadScene(index + 1); //load next scene when playing current scene
      }
    },
    isMuted: false,
    getMedia: function(res) {
      var media = mediaList[res];
      if (media) {
        return media
      }
    },
    getVideo: function(res){
      var video = this._videoList.find("#" + res);
      return video[0];
    },
    // mute all media.
    muteAll: function() {
      this.isMuted = true;
      var currentMusic = this._scene[this._currenScene].music;
      currentMusic && (currentMusic.muted = true);
    },
    // Toggle all media that has been loaded.
    toggleMuteAll: function() {
      this.toggleAudioMusic(this._scene[this._currentScene].music);
    },
    playMedia: function(media) {
      if (this.isMuted) {
        media.muted = true;
      }
      media && media.play();
    },
    // toggle all music state base on one media.
    toggleAudioMusic: function(media) {
      if (!media) {
        this.isMuted = !this.isMuted;
      } else {
        if (media.muted) {
          media.muted = this.isMuted = false;
        } else {
          media.muted = this.isMuted = true;
        }
      }
    },
    throttle: function(action, delay) {
      var last = 0;
      return function() {
        var curr = +new Date();
        if (curr - last > delay) {
          action.apply(this, arguments);
          last = curr;
        }
      };
    },
    transfer2Music: function(name) {
      if (/\.music$/.test(name)) {
        var db = device.browser;
        var type;
        if (db.Chrome || db.IE || db.Safari) {
          type = ".mp3";
        } else {
          type = ".wav";
        }
        return name.replace(".music", type)
      } else {
        return name;
      }
    }
  };

  var hash = location.hash;
  if (hash.indexOf("#") != -1) {

    var index = parseInt(hash.substring(1));
    var url = "/scene/" + "scene" + index + ".js";
    anole.getScript(url, index,
    function() {
      anole.playScene(index)
    });
  }

  // Define base class Scene
  function Scene(id, canvas, inherit) {
    this.id = id;
    this.name = 'scene' + id + '.js';
    this.musicName = 'vo' + id; // default voiceover file name.
    this.canvas = canvas;
    this.inherit = inherit;
    this.container;
    // List of dom elements that will be reused by other scenes afterwards.
    // Note it's DOM not jQ Objects.
    // this.export = [];
    // All animations are trained by this main timeline.
    this.tl = new TimelineLite({
      paused: true
    });
    // Music file is registered as a resource.
    this.music = anole.getMedia(this.musicName);
    this.animation = function() {
      /* abstract */
    }; // must be implemented by instances. 
  }
  // Methods list.
  //
  // Public:
  Scene.prototype.onInit = function() {
    // Must initialize the container everytime when entering the scene.
    // TODO: reuse scene content. 
    this.container = $("<div id='scene" + this.id + "' class='scene'></div>");
    // Empty current scene div.
    var old = this.canvas.find('#scene' + this.id);
    if (old) {
      old.remove();
      // TODO: Re-use already-rendered dom and timeline.
      // Like this:
      // this.tl = old.data('timeline');
      // this.tl.replay();
    }
    console.log(this.id);
    // When inherit is set to true,
    // Current scene is initialed based on last scene.
    // Copy previous scene's dom to current scene if it's present.
    if (this.inherit) {
      var prev = this.canvas.find('#scene' + (this.id - 1));
      if (prev) {
        this.container = prev.clone(); // Not cloning events (nor data, probably).
        prev.hide();
        this.container.attr('id', 'scene' + this.id);
      } else {
        console.log("Warning: scene" + (id - 1) + "deleted unexpetedly.");
      }
    }
    this.container.show(); // container could be hidden if coming from next scene.
    if (this.canvas) { // If parent dom is provided, append content html to it.
      var html = this.createDom();
      if (html) {
        this.canvas.append($(html));
      } else {
        this.canvas.append(this.container);
      }
    }
  };

  // There must be a callback to indicate the finishing of the scene.
  Scene.prototype.onStart = function(callback) {
    // Do animations here.
    anole.playMedia(this.music);
    this.animation(); // Add animations to this.tl;
    this.tl.call(function() {
      if (this.music && (!this.music.ended)) {
        $(this.music).on('ended', callback);
      } else {
        callback();
      }
    }.bind(this));
    this.tl.play();
  };
  // When button NEXT clicked/swipe down/scroll down. 
  Scene.prototype.onForward = function() {
    this.tl && this.tl.progress(1);
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
    }
    this.container && this.container.hide();
    this.cleanup && this.cleanup();
  };
  // When button PREV clicked/swipe up/scroll up. 
  Scene.prototype.onBack = function(callback) {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
    }
    // this.tl.progress(0);
    this.container && this.container.remove();
    callback && callback();
  };
  // When existing current scene.
  Scene.prototype.onEnd = function() {
    //this.container.remove();
  };

  anole.$$ = anole.getOrCreate;
  anole.Scene = Scene;
  return anole;
});
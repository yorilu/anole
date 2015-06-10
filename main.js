;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
	'demo': 'demo',
	'hammer': 'hammer',
    'TweenLite': 'tween/TweenLite',
    'TweenMax': 'tween/TweenMax',
    'Scene': 'scene/SCENE'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});

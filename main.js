;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
    'demo': 'demo',
    'hammer': 'hammer',
    'TweenLite': 'tween/TweenLite',
    'TweenMax': 'tween/TweenMax',
    'TimelineLite': 'tween/TimelineLite'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});

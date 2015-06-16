;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
    'demo': 'demo',
    'hammer': 'hammer',
    'TweenLite': 'tween/TweenLite',
    'TweenMax': 'tween/TweenMax'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});

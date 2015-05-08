;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
	  'demo': 'demo',
    'hammer': 'hammer'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});
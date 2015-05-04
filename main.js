;require.config({
  baseUrl: './',
  paths: {
    'anole': 'anole',
	'demo': 'demo'
  },
  shim: {
    zepto: {
      exports: '$'
    }
  },
  deps: ['demo']
});
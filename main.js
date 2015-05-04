/**
 * Created by anders on 15/4/20.
 */
require.config({
  baseUrl: '/',

  // alias libraries paths.  Must set 'angular'
  paths: {
    'anole': 'anole'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    zepto: {
      exports: '$'
    }
  },

  // kick start application
  deps: ['demo']
});
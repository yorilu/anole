;require.config({
  baseUrl: 'js/',
  paths: {
    'anole': 'anole',
	'demo': 'demo',
	'zepto': [
		//'//libs.useso.com/js/zepto/1.0rc1/zepto.min',
		// '//cdn.bootcss.com/zepto/1.0rc1/zepto.min',
		'zepto.min'
	],
	'hammer': [
	   // '//cdn.bootcss.com/hammer.js/2.0.4/hammer.min', 
		// '//libs.cncdn.cn/hammer.js/2.0.4/hammer.min',
		'hammer.min'
	],
    'TweenLite': [
		//'//cdn.bootcss.com/gsap/latest/TweenLite.min',
		'TweenLite.min'
	],
	'TimelineLite': [
		//'//cdn.bootcss.com/gsap/latest/TimelineLite.min',
		'TimelineLite.min'
	],
	'CSSPlugin': [
		//'//cdn.bootcss.com/gsap/latest/plugins/CSSPlugin.min',
		'CSSPlugin.min'
	],
	'EasePack': [
		//'//cdn.bootcss.com/gsap/latest/easing/EasePack.min',
		'EasePack.min'
	]
  },
  shim: {
    'zepto': {
      exports: '$'
    },
	'hammer': {
	  exports: 'Hammer'
	},
	'TweeenLite': {
	  exports: 'TweenLite'
	}
  },
  deps: ['demo']
});

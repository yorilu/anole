#gtravel


Coding.net Repo:  

https://git.coding.net/neptun/gtravel.git  or  git@git.coding.net:neptun/gtravel.git

每个人用自己的名字建立新的branch, review过后再merge到master~



每个场景需要的素材我会上传到teambition文件夹里，需要时从对应的文件夹下载到本地。


js cdn: 

开源公共库现在主要用的是bootcss, 因为是用'//..'引用，本地调试的时候注意要起一个local server才不会报错。

static files cdn：

prod时所有静态资源（图片、视频、声音文件）会放在又拍云，我（Neptun）会负责更新上传。

如要自己上传新资源到cdn请用FTP

地址  v0.ftp.upyun.com  端口21    

用户名  team/gtravel

密码  html5rocks

js代码相关：

每个scene对应storyboard上的一个场景，由一个单独的js文件scenei.js来完成，在html中的位置是位于anole.canvas下的一个<div id='scenei' class='scene'>的节点。scene是anole框架中Scene类的一个实例，请用：

new Scene(id, canvas, inherit_or_not)来初始化它，其中id为从1开始的编号， canvas是scene div的父节点，inherit为true是表示需要拷贝上一个场景的dom元素。当两个场景之间有公用元素且不太容易在同样位置重新构造这部分保留元素时，请set inherit = true. 否则传递值为false, 你会得到一个空白的scene画板。
anole.addScene(scene), 将名为scene的实例添加到动画队列中。anole框架负责各个场景的顺序调度。同一个id的scene只会被添加一次。
Scene接口定义在js/anoje.js文件中，其中每个scene需要实现3个函数：

scene.createDom: 该函数创建出当前场景需要的所有dom元素。我们发现在一整个场景中，事先创建好所有会用到的dom，隐藏那些一开始不出现的部分，直到他们被需要时再动态地出现是比较好的方法。可以节约一部分浏览器时间并且使定位更容易。注意如果初始化是调用的是new Scene(id, canvas, true), 那么上一个场景的所有dom元素会自动地被拷贝到当前场景的div内（那些在cleanup中清除的元素除外）
scene.animation:  该函数完成所有的动画。注意需要把每个动画都放在this.tl中（一个TimelineLite实例），以保证this.tl可以控制整个scene的开始、暂停和结束，具体用法参考GSAP的文档。避免用setTimeout之类方法另开线程，即使要这么做也需要有callback通知this.tl该部分动画何时完成，并且在场景切换时clear timeout。
scene.cleanup： 该函数在离开当前场景、进入下一个场景之前被调用，在这里可以清理一些资源，比如在这个场景中隐藏掉的之前场景的dom元素、注册的事件等等。


代码中使用静态资源之前务必在js/demo.js文件中注册：

1. 添加到var resource中 ： 

｛“变量名”：“实际文件名”｝
2. 添加到sceneQueue的对应res项中：

{          
     fileName:'scenex.js',       
     res: ["变量名1","变量名2",....] //depend resources.
},
So, 我们开发时可以在本地存一份resource文件夹，同时把js/demo.js中的resoureUrl指向该文件夹。push到线上时统一改成upyun url: http://gtravel.b0.upaiyun.com/resource/



另，字体文件也放在resource下，目前我们用的字体是：

GeorgiaItalic.ttf        HiraginoSansGBW3.otf     SansGBW3_min.ttf
字体已经放在全局css里，各个scene不用单独调。



css说明：

采用scss语法，共两个文件：

basics.scss: 一些全局的设置，大量公用的mixin，工具函数等。所有带有ua前缀的mixin都在这里，使用的时候@include一下就好。引用资源时候不要直接上url，调用images('文件名')这个函数
scenes.scss: 具体每个scene的业务放在 #scene-id {} 框起来的代码块内。可以有共用。
全局css：我用两条不明显的白色虚线把canvas和scene的范围框了出来，canvas的尺寸是1024*768，scene的尺寸是768*512, 同时canvas整体会缩放到占全视窗的某个固定比例。这里需要注意的是背景纹理是全局的，特定的scene需要更改背景颜色的时候，要改<body>的background-color. 每个scene还有上下两条作为分隔的装饰图案，这个是放在.scene类的:before :after伪元素中，更改的时候直接改css, 像这样:  

  #scene2:before {background-image: images(‘ribbon_02.png’)}

// 1. 原始写法：只要把不同的函数简单放在一起，就是一个模块
// 缺点：污染了全局变量，无法保证不予其他模块发生变量名冲突，而且模块之间看不出直接关系。
function m1() {

}

function m2() {

}

// 2. 对象写法：把所有模块成员都放在这个对象里面
// 缺点：暴露了所有模块成员，内部状态可以被外部改写
var module1 = new Object({
  _count: 0,

  m1: function() {},

  m2: function() {}
});

// 可以修改私有成员
module1._count = 5;

// 3. 立即执行函数IIFE，可以达到不暴露私有成员的目的。
// 这种就是JS模块的基本写法。
var module1 = (function() {
  var _count = 0;

  var m1 = function() {};

  var m2 = function() {};

  return {
    m1: m1,
    m2: m2
  }
})();

// 4. 放大模式：如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块。
// 下面的代码给module1模块添加了一个新方法m3()，然后返回给module1模块。
var module1 = (function(mod) {
  mod.m3 = function() {}
})(module1);

// 5. 宽放大模式：在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。
// 如果采用放大模式的写法，第一个执行的部分有可能加载一个不存在的对象。
var module1 = (function (mod) {

  // 与放大模式相比，宽放大模式就是立即执行函数的参数可以是空对象。

  return mod;
})(window.module1 || {});

// 输入全局变量
// 独立是模块的重要特点，模块内部最好不与程序的其他部分直接交互。
// 为了在模块内部调用全局变量，必须显式将其他变量传入模块。
var module1 = (function($, YAHOO) {
  // module1模块需要使用jQuery库和YUI库，就把这个两个模块当做参数传入module1.
  // 这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。
})(jQuery, YAHOO);
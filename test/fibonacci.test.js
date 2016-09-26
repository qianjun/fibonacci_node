// file: test/fibonacci.test.js
var main = require('../fibonacci');
var should = require('should');

// describe 中的字符串，用来描述你要测的主体是什么；it 当中，描述具体的 case 内容
 // should 模块，是个断言库
describe('test/fibonacci.test.js', function () {
  it('should equal 0 when n === 0', function () {
    main.fibonacci(0).should.equal(0);
  });


  it('should equal 1 when n === 1', function () {
    main.fibonacci(1).should.equal(1);
  });

  it('should equal 55 when n === 10', function () {
    main.fibonacci(10).should.equal(55);
  });

  it('should throw when n > 20',function(){
  	(function(){
  		main.fibonacci(21);
  	}).should.throw('n should <=20');
  })

  it('should throw when n < 0',function(){
  	(function(){
  		main.fibonacci(-1);
  	}).should.throw('n should >=0');
  })

  it('should throw when n isnt Number',function(){
  	(function(){
  		main.fibonacci('呵呵');
  	}).should.throw('n should be a Number');
  })

});

// 测试驱动开发：先把要达到的目的都描述清楚，然后让现有的程序跑不过 case，再修补程序，让 case 通过。

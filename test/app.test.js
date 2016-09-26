// file: test/main.test.js
var app = require('../app');
var should = require('should');
var supertest = require('supertest');
// 得到的 request 对象可以直接按照superagent 的 API 进行调用
var request = supertest(app);

// describe 中的字符串，用来描述你要测的主体是什么；it 当中，描述具体的 case 内容
 // should 模块，是个断言库
describe('test/app.test.js', function () {
  it('should equal 55 when n is 10', function (done) {
     // 之所以这个测试的 function 要接受一个 done 函数，是因为我们的测试内容,涉及了异步调用，
     // 而 mocha 是无法感知异步调用完成的。所以我们主动接受它提供的 done 函数，在测试完毕时，自行调用一下，以示结束。
    // mocha 可以感知到我们的测试函数是否接受 done 参数。js 中，function对象是有长度的，它的长度由它的参数数量决定
    // (function (a, b, c, d) {}).length === 4 所以 mocha 通过我们测试函数的长度就可以确定我们是否是异步测试。
    request.get('/fib')
    // .query 方法用来传 querystring，.send 方法用来传 body。它们都可以传 Object 对象进去。
    // 在这里，我们等于访问的是 /fib?n=10
    .query({n:10})
    .end(function(err,res){
      // 由于 http 返回的是 String，所以我要传入 '55'。
      res.text.should.equal('55');
       // done(err) 这种用法写起来很鸡肋，是因为偷懒不想测 err 的值
        // 如果勤快点，这里应该写成
        /*
        should.not.exist(err);
        res.text.should.equal('55');
        */
        done(err);
    })
  });

//下面对各种边界条件进行测试，由于代码雷同，抽象一个testFib方法。

var testFib = function(n,statusCode,expect,done){
  request.get('/fib')
  .query({n:n})
  .expect(statusCode)
  .end(function(err,res){
    res.text.should.equal(expect);
    done(err);
  })
}

  it('should equal 0 when n is 0', function (done) {
    testFib(0,200,'0',done);
  });


  it('should equal 1 when n is 1', function (done) {
    testFib(1,200,'1',done);
  });

   it('should equal 55 when n is 10', function (done) {
    testFib(10,200,'55',done);
  });

  it('should throw when n > 20',function(done){
  	testFib(21,500,'n should <=20',done);
  })

  it('should throw when n < 0',function(done){
  	testFib(-1,500,'n should >=0',done);
  })

  it('should throw when n isnt Number',function(done){
  	testFib('呵呵',500,'n should be a Number',done);
  })

  it('should status 500 when error',function(done){
    request.get('/fib')
    .query({n:100})
    .expect(500)
    .end(function(err,res){
      done(err);
    });
  });

});

// 测试驱动开发：先把要达到的目的都描述清楚，然后让现有的程序跑不过 case，再修补程序，让 case 通过。

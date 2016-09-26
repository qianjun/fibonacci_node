console.log("测试js不同用法的运行速度");

var Benchmark = require('benchmark');

var int1 = function(str){
	return +str;
};

var int2 = function(str){
	return parseInt(str,10);
};

var int3 = function(str){
	return Number(str);
}

var suite = new Benchmark.Suite; 
var number = '100';

suite
.add("+",function(){
	init1(number);
})
.add("parseInt",function(){
	int2(number);
})
.add("Number",function(){
	int3(number);
})
// add listeners
.on('cycle',function(event){
console.log(String(event.target));
})
.on('complete',function(){
	console.log('Fastest is '+this.filter('fastest').map('name'));
})
.run({ 'async': true });
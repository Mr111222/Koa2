const Koa = require('koa');
const convert = require('koa-convert');//koa2要用中间件需要添加这个依赖
const midd1 = require('./middles/zhong1.js');
const app = new Koa();

app.use(convert(midd1()))             //使用中间件



// response-time中间件
// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   this.set('X-Response-Time', ms + 'ms');
// });

// // logger中间件
// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });


app.use((ctx)=>{
	ctx.body = '我是koa'
})




app.listen(3002);
console.log('the server is starting at port 3002')
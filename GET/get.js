const Koa = require('koa');
const app = new Koa();
const main = ctx =>{
	ctx.body = '我是zz'
}

app.use(async(ctx)=>{
	let url = ctx.url;
	//从request对象中获取
	let request = ctx.request;
	let req_query  = request.query; 
	let rep_queryString = request.querystring;

	//从ctx对象中获取
	let ctx_query = ctx.query;
	let ctx_querystring = ctx.querystring;
	ctx.body = {
	    url,
	    req_query,
	    rep_queryString,
	    ctx_query,
	    ctx_querystring
	}
})
app.listen(8000)
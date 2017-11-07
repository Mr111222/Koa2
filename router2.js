const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const app = new Koa();
const home = new Router();

// 子路由1
home.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">helloworld</a></li>
      <li><a href="/page/404">404</a></li>
      <li><a href="/page/zz">zz</a></li>
      <li><a href="/cc/ccword">ccword</a></li>
      <li><a href="/cc/z404">cc404</a></li>
      <li><a href="/cc/z">cc</a></li>
    </ul>
  `
  ctx.body = html
})


// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404页面'
}).get('/helloworld', async ( ctx )=>{
  ctx.body = 'hello world 页面'
}).get('/zz',async(ctx)=>{
	ctx.body = '我是zz页面'
})


let cc = new Router()
cc.get('/z404', async ( ctx )=>{
  ctx.body = '404 cc 页面'
}).get('/ccword', async ( ctx )=>{
  ctx.body = 'hello cc页面'
}).get('/z',async(ctx)=>{
	ctx.body = '我是cc页面'
})



// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())
router.use('/cc', cc.routes(), cc.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(8000);
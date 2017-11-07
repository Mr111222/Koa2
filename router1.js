/*
	这是自带的路由，经过验证 fs.readFile(viewUrl, "utf-8", ( err, data ) 这里面的err和data的传参顺序不能变
*/
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
const Router = require('koa-router')
const home = new Router()


function render( page ) {
  return new Promise(( resolve, reject ) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "utf-8", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

async function route( url ) {
  let view = '404.html'
  switch ( url ) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }

  let html = await render(view)
  return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await route( url )
  ctx.body = html
})


app.listen(8000)
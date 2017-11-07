const Koa = require('koa');
const app  = new Koa();
app.use(async(ctx)=>{
	if(ctx.url==='/'&&ctx.method === 'GET'){
		let html = `
			<div class="box">
				<form method="POST" action="/">
			        <p>userName</p>
			        <input name="userName" /><br/>
			        <p>zzName</p>
			        <input name="zzName" /><br/>
			        <p>email</p>
			        <input name="email" /><br/>
			        <button type="submit">submit</button>
			    </form>
			</div>
		`;
		ctx.body = html;
	}else if(ctx.url === '/'&& ctx.method === "POST"){
		let postData = await parsePostData(ctx);
		ctx.body = postData;
	}else{
		//其他显示404
		ctx.body = '404未找到'
	}
})


function parsePostData(ctx){
	return new Promise((resolve,reject)=>{
		try{
			let postData = '';
			ctx.req.addListener('data',(data)=>{
				postData+=data;
			})
			ctx.req.addListener('end',function(){
				let parseData = parseQueryStr(postData);
				resolve(parseData);
			})
		}catch(err){
			reject(err)
		}
	})
}

function parseQueryStr(str){
	let queryData = {};
	let queryList = str.split('&');
	console.log(queryList,888);
	for (  let [ index, queryStr ] of queryList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData

}
app.listen(8000)



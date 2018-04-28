// Node.Js http模块可以创建服务器应用实例，也能发送http请求
let http= require('http');
//载入node.js fs模块
// fs模块用于对系统文件及目录进行读写操作。
let fs=require('fs');

let url=require('url');

http.createServer((req,res)=>{
	console.log(req,res)
	//设置跨域
	res.setHeader('Access-control-Allow-Origin',"*");
	res.setHeader('Access-control-Allow-Headers',"Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
	res.setHeader("Access-control-Allow-Methods","PUT,POST,DELETE,GET,OPTIONS");
	res.setHeader("X-Powered-By",'3.2.1');
	if(res.method=="OPTIONS")  return res.end(); //让options请求快速返回
	let {pathname,query}=url.parse(req.url);//　parse这个方法可以将一个url的字符串解析并返回一个url的对象



}).listen(3000);

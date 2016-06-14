var http = require("http");
var statusCode = require("../util/statusCode");
var error = require("../error/common");
var serveStatic = require("../util/serveStatic").serveStatic;

exports.middleware = function(req,res,pathname,handle) {
	// 检查请求方式
	if (req.method !== "GET") {
		res.statusCode = statusCode.methodNotAllowed;
		res.end({err: methodNotAllowed});
		return;
	}

	// 检查静态页面请求
	if (!handle[pathname]) {
		serveStatic(res,pathname);
		return;
	}

	// 检查后台操作
	if (!pathname.mach("admin")) {
		handle[pathname](req,function(err,html) {

		});
	}

	// 后台操作检查是否登录
	
	var options = {
		host : "127.0.0.1",
		port : "3000",
		method : "GET"
		path : "admin/isSignedIn"
	};

	var callback = function(res) {
		getDataByBody(res,function(data) {
			
		});
	}

	http.request(options,callback).end();
}
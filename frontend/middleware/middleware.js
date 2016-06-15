var http = require("http");
var statusCode = require("../util/statusCode");
var cookie = require("../util/cookie");
var serveStatic = require("../util/serveStatic").serveStatic;
// var error = require("../util/error");
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;

exports.middleware = function(req,res,pathname,handle) {
	// 检查请求方式
	if (req.method !== "GET") {
		console.log("The method of request for " + pathname + " is not allowed");
		res.statusCode = statusCode.methodNotAllowed;
		res.end({err: methodNotAllowed});
		return;
	}

	// 检查静态页面请求
	console.log(pathname);
	if (!handle[pathname]) {
		console.log("The request for " + pathname + " is a static serve");
		serveStatic(res,pathname);
		return;
	}

	handle[pathname](req,function(err,html) {
		if (err) {
			console.log(err);
		}

		console.log(html);
	});
}
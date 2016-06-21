var http = require("http");
var statusCode = require("../util/statusCode");
var cookie = require("../util/cookie");
var serveStatic = require("../util/serveStatic").serveStatic;
var error = require("../util/error");
var logger = require("../util/logger").logger;
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;

exports.middleware = function(req,res,pathname,handle) {
	// res.setHeader('Access-Control-Allow-Origin',"127.0.0.1:3000");
	// res.setHeader('Access-Control-Allow-Credentials', true);
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// 检查请求方式
	if (req.method !== "GET") {
		logger.warn("The method of request for " + pathname + " is not allowed");
		res.statusCode = statusCode.methodNotAllowed;
		res.statusMessage = error.methodNotAllowed.discription;
		res.end();
		return;
	}

	// 检查静态页面请求
	if (!handle[pathname]) {
		logger.trace("The request for " + pathname + " is a static serve");
		serveStatic(res,pathname);
		return;
	}

	handle[pathname](req,function(err,html) {
		if (err) {
			logger.debug(err);
			if (err.statusCode) {
				switch (err.statusCode) {
					case 401 :
						res.statusCode = statusCode.redirection;
						res.statusMessage = err.statusMessage;
						res.setHeader("Location","/admin/signin.html");
				}

				res.end();
				return;
			}

			res.statusCode = statusCode[err.type];
			res.statusMessage = err.discription;
			res.end();
			return;
		}

		res.setHeader("Content-Type","html");
		res.write(html);
		res.end();
	});
}
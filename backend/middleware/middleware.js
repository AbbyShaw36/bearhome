var cookie = require("../util/cookie");
var statusCode = require("../util/statusCode");
var service = require("../service/account").service;
var error = require("../errors/common");
var logger = require("../util/logger").logger;

exports.middleware = function(req,res,pathname,handle) {
	res.setHeader('Access-Control-Allow-Origin',"http://127.0.0.1:8888");
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	if (req.method === "OPTIONS") {
		res.statusCode = statusCode.success;
		res.end();
		return;
	}

	// 没有对应操作
	if (typeof handle[pathname] !== "object") {
		logger.warn("Method of the request for " + pathname + " does not exist");

		res.statusCode = statusCode.ResourceNotFound;
		res.statusMessage = error.methodNotExists.discription;
		res.end();

		return;
	}
	logger.debug(req.method);
	var fun = handle[pathname][req.method];
	console.log(fun);
	// 请求方式是否正确
	if (typeof fun !== "function") {
		logger.warn("Method of the request for " + pathname + " not allowed");

		res.statusCode = statusCode.methodNotAllowed;
		res.statusMessage = error.methodNotAllowed.discription;
		res.end();

		return;
	}

	// 是否为后台操作（需要登录）
	if (!pathname.match("admin")) {
		logger.trace("The request for " + pathname + "does not require login");

		fun(req,res,function(err,result) {
			if (err) {
				res.statusCode = statusCode[err.type];
				res.statusMessage = err.discription;
				res.end();
				return;
			}

			res.statusCode = statusCode.success;
			res.end(JSON.stringify(result));
		});
		return;
	}

	// 创建user对象
	var sessionId = cookie.getCookie(req,"sessionId");
	logger.debug(sessionId);

	// 检查是否登陆
	service.isSignedIn(sessionId,function(err,result) {
		if (err) {
			res.statusCode = statusCode[err.type];
			res.statusMessage = err.discription;
			res.end();
			return;
		}
		logger.debug(result);

		// 是否为登录操作
		if (pathname === "/admin/account/signin") {
			// 已登录
			if (result) {
				res.statusCode = statusCode.success;
				res.end();
				return;
			}
		} else if (!result) {
			// 未登录
			logger.warn("The account request for " + pathname + " unauthorized");

			res.statusCode = statusCode.unauthorized;
			res.statusMessage = error.unauthorized.discription;
			res.end();

			return;
		}

		// 执行相应操作
		fun(req,res,function(err,result) {
			if (err) {
				res.statusCode = statusCode[err.type];
				res.statusMessage = err.discription;
				res.end();
				return;
			}

			res.statusCode = statusCode.success;
			res.end(JSON.stringify(result));

			logger.debug(result);
			logger.debug(JSON.stringify(result));
		});
	});
}
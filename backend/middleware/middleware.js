var cookie = require("../util/cookie");
var statusCode = require("../util/statusCode");
var service = require("../service/account");
var error = require("../errors/common");

exports.middleware = function(req,res,pathname,handle) {
	var fun = handle[pathname][req.method];

	if (typeof handle[pathname] !== "object") {
		res.statusCode = statusCode.ResourceNotFound;
		res.end(JSON.stringify({err: error.methodNotExists}));
		return;
	}

	// 请求方式是否正确
	if (typeof fun !== "function") {
		res.statusCode = statusCode.methodNotAllowed;
		res.end(JSON.stringify({err: error.methodNotAllowed}));
		return;
	}

	// 是否为后台操作（需要登录）
	if (!pathname.mach("admin")) {
		fun(req,function(err,result) {
			if (err) {
				res.statusCode = statusCode[err.type];
				res.end(JSON.stringify({err: err}));
				return;
			}

			res.statusCode = statusCode.success;
			res.end(JSON.stringify(result));
		});
		return;
	}

	// 创建user对象
	var sessionId = cookie.getCookie(req,"sessionId");

	// 检查是否登陆
	service.isSignedIn(sessionId,function(result) {

		// 是否为登录操作
		if (pathname === "admin/account/signin") {
			// 已登录
			if (result) {
				res.statusCode = 
				return;
			}
		} else if (!result) {
			// 未登录
			res.statusCode = statusCode.unauthorized;
			res.end(JSON.stringify({err: error.unauthorized}));
			return;
		}

		// 执行相应操作
		fun(req,function(err,result) {
			if (err) {
				res.statusCode = statusCode[err.type];
				res.end(JSON.stringify({err:err}));
				return;
			}

			res.statusCode = statusCode.success;
			res.end(JSON.stringify(result));
		});
	});
}
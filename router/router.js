var send = require("../util/send");
var middleware = require("../middleware/sigin").middleware;

exports.route = function(req,res,pathname,handle) {
	console.log("About to route a request for " + pathname);

	// 是否需要执行操作
	if (typeof handle[pathname] === "object") {
		// 请求方式是否正确
		if (typeof handle[pathname][req.method] === "function") {
			var makeSigin = null;

			// 是否为登录操作
			if (pathname === "admin/account/signin") {
				makeSigin = true;
			} else {
				makeSigin = false;
			}

			middleware(req,res,handle[pathname][req.method],makeSigin);
			return;
		}

		// 请求方式错误
		res.end("-1");
		return;
	}

	// 获取静态页面
	send.serveStatic(res,"public/" + pathname);
}
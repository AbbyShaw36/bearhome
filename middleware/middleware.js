var cookie = require("../util/cookie");
var service = require("../service/account");

exports.middleware = function(req,res,handle,makeSignin) {
	// 创建user对象
	var sessionId = cookie.getCookie(req,"sessionId");
	var user = new User();

	// 保存sessionId
	user.setSessionId(sessionId);

	// 检查是否登陆
	service.isSignedIn(user,function(result) {

		// 是否为登录操作
		if (makeSignin) {
			// 已登录
			if (result) {
				res.end("3");
				return;
			}
		} else if (!result) {
			// 未登录
			res.end("2");
			return;
		}

		// 保存登录结果
		user.setLoginStatus(result);

		// 执行相应操作
		handle(req,function(err,result) {
			if (err) {
				var statusCode = errStatusCode[err.type];

				if (statusCode) {
					res.statusCode = statusCode;
				} else {
					res.statusCode = 500;
				}

				res.end();
				return;
			}

			res.statusCode = 200;
			res.end(result);
		});
	});
}
var cookie = require("../util/cookie");
var service = require("../service/account");

exports.middleware = function(req,res,handle,makeSigin) {
	// 创建user对象
	var sessionId = cookie.getCookie(req,"sessionId");
	var user = new User();

	// 检查是否登陆
	service.isSignedIn(user,function(result) {
		// 保存登录结果
		user.setLoginStatus(result);

		// 是否为登录操作
		if (makeSigin) {
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

		// 执行相应操作
		handle(req,res);
	});
}
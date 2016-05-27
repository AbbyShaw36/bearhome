var cookie = require("../util/cookie");
var serveStatic = require("../util/send").serveStatic;
var User = require("../model/user").User;
var service = require("../service/account");


exports.islogged = function islogged(user,cb) {
	// 执行操作
	service.islogged(user,function(result) {
		// 保存登录状态
		user.setLoginStatus(result);
	});

	cb();
}

exports.checkSignin = function(req,res,cb) {
	// 创建user对象
	var sessionId = cookie.getCookie(req,"sessionId");
	var user = new User();

	user.setSessionId(sessionId);

	// 判断是否登录
	islogged(user,function() {
		var loginStatus = user.getLoginStatus();

		// 未登录
		if (!loginStatus) {
			// 跳转到登录页面
			res.writeHead(302,{
				"Location" : "/admin/signin"
			});
			res.end();
			return;
		}

		// 已登录
		cb();
	});
}

exports.sendSigninFile = function(res) {
	serveStatic(res,"view/admin/login.html");
}
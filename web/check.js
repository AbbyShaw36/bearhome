var User = require("../model/user").User;
var cookie = require("../util/cookie");
var checkMethod = require("../util/checkMethod");
var islogged = require("./signin").islogged;

// 创建user对象，供检查使用
function createUser(req) {
	var sessionId = cookie.getCookie(req,"sessionId");
	var user = new User();

	user.setSessionId(sessionId);
	return user;
}

// 除登录外操作的其他操作的检查
exports.operate = function(req,res,cb) {
	// 检查请求方式
	if (!checkMethod.post(req,res)) {
		return;
	}

	// 创建user对象
	var user = createUser(req);

	// 判断是否已登录
	islogged(user,function() {
		var loginStatus = user.getLoginStatus();

		// 未登录
		if (!loginStatus) {
			res.end("2");
			return;
		}

		cb(user);
	});
}

// 登录操作的检查
exports.signin = function(req,res,cb) {
	// 检查请求方式
	if (!checkMethod.post(req,res)) {
		return;
	}

	// 创建user对象
	var user = createUser(req);

	// 判断是否已登录
	islogged(user,function() {
		var loginStatus = user.getLoginStatus();

		// 已登录
		if (loginStatus) {
			res.end("3");
			return;
		}

		cb(user);
	});
}
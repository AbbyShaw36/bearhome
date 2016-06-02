var accountDao = require("../dao/account");
var SessionDao = require("../dao/session");

exports.signin = function(user,cb) {
	accountDao.findByNameAndPw(user,function(err,result) {
		// 查询失败
		if (err) {
			cb(err);
			return;
		}

		// 没有匹配项，即用户名或密码错误
		if (result.length === 0) {
			cb({code:"4"});
			return;
		}

		SessionDao.set(function(sessionId) {
			user.setSessionId(sessionId);
		});
	});
}

exports.isSignedIn = function(user,cb) {
	var sessionId = user.getSessionId();

	SessionDao.get(sessionId,cb);
}

exports.signout = function(user,cb) {
	var sessionId = user.getSessionId();

	SessionDao.delete(sessionId,cb);
}
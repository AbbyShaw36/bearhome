var accountDao = require("../dao/account");
var SessionDao = require("../dao/session");

exports.getCount = function(cb) {
	accountDao.count(cb);
}

exports.getById = function(user,cb) {
	var id = user.getId();
	var condition = {_id : id};

	accountDao.find(condition,cb);
}

exports.getAll = function(cb) {
	accountDao.find({},cb);
}

exports.signup = function(user,cb) {
	accountDao.create(user,cb);
}

exports.signin = function(user,cb) {
	var name = user.getName();
	var password = user.getPw();
	var condition = {name: name, password: password};

	accountDao.find(condition,function(err,result) {
		// 查询失败
		if (err) {
			cb(err);
			return;
		}

		// 没有匹配项，即用户名或密码错误
		if (result.length === 0) {
			cb(err,{statusCode: 400,err: "invalid_grant", err_description: "invalid username or password"});
			return;
		}

		SessionDao.set(cb);
	});
}

exports.signout = function(user,cb) {
	var sessionId = user.getSessionId();

	SessionDao.delete(sessionId,cb);
}

exports.isSignedIn = function(user,cb) {
	var sessionId = user.getSessionId();

	SessionDao.get(sessionId,cb);
}
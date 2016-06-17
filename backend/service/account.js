var accountDao = require("../dao/account").dao;
var SessionDao = require("../dao/session").dao;
var error = require("../errors/account");
var sessionErr = require("../errors/session");
var User = require("../model/user").User;
var service = {};

exports.service = service;

service.getById = function(user,cb) {
	var id = user.getId();
	
	accountDao.findById(id,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.userNotExists;
		}

		cb(err,result);
	});
}

service.getAll = function(cb) {
	accountDao.findAll(function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.userNotExists;
		}

		cb(err,result);
	});
}

service.getBySessionId = function(sessionId,cb) {
	var that = this;

	SessionDao.get(sessionId,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var user = new User();
		user.setId(result[0].userId);

		that.getById(user,cb);
	});
}

service.signup = function(user,cb) {
	accountDao.create(user,cb);
}

service.signin = function(user,cb) {
	accountDao.findByNameAndPw(user,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			console.log("[Sign in error] - User not exists");
			cb(error.userNotExists);
			return;
		}

		console.log("[Sign in user]: ");
		console.log(result);

		SessionDao.create(result[0],function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var sessionId = result.id;

			cb(null,sessionId);
		});
	});
}

service.signout = function(user,cb) {
	SessionDao.delete(user,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = sessionErr.accountNotSignedIn;
		}

		cb(retErr);
	});
}

service.isSignedIn = function(sessionId,cb) {
	if (!sessionId) {
		cb(null,null);
		return;
	}

	SessionDao.get(sessionId,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			cb(null,null);
			return;
		}

		cb(null,result);
	});
}

exports.update = function(user,cb) {
	accountDao.update(user,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.userNotExists;
		}

		cb(retErr,result);
	});
}

exports.delete = function(user,cb) {
	accountDao.delete(user,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.userNotExists;
		}

		cb(retErr);
	});
}
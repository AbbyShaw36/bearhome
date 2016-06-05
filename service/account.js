var accountDao = require("../dao/account");
var SessionDao = require("../dao/session");
var error = require("../errors/account");
var sessionErr = require("../errors/session");

exports.getCount = function(cb) {
	accountDao.count(cb);
}

exports.getById = function(user,cb) {
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

exports.getAll = function(cb) {
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

exports.signup = function(user,cb) {
	accountDao.create(user,cb);
}

exports.signin = function(user,cb) {
	accountDao.findByNameAndPw(user,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			cb(error.userNotExists);
			return;
		}

		SessionDao.create(function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var sessionId = result.id;

			cb(null,sessionId);
		});
	});
}

exports.signout = function(user,cb) {
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

exports.isSignedIn = function(user,cb) {
	SessionDao.get(user,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			cb(null,false);
			return;
		}

		cb(null,true);
	});
}

exports.update = function(user,cb) {
	accountDao.update(user,function(err,result) {

	});
}
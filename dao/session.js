var Session = require("./model").Session;
var commonErr = require("../errors/common");
var dao = {};

dao.create = function(cb) {
	var session = new Session({ isSignedIn : true});

	session.save(function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[Save session err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.get = function(user,cb) {
	var id = user.getSessionId();

	Session.findById(id,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[Get session err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.delete = function(user,cb) {
	var id = user.getId();

	Session.remove({_id: id},function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[Remove session err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

exports.dao = dao;
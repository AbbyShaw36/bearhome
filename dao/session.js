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

dao.get = function(sessionId,cb) {
	Session.findById(sessionId,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[Get session err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.delete = function(sessionId,cb) {
	Session.remove({_id: sessionId},function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[Remove session err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

exports.dao = dao;
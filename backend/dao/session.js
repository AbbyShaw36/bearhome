var Session = require("./model").Session;
var commonErr = require("../errors/common");
var dao = {};

dao.create = function(user,cb) {
	var session = new Session({userId : user.id});

	session.save(function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[Save session err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		console.log("[Success create session] - " + result.id);
		cb(retErr,result);
	});
}

dao.get = function(sessionId,cb) {
	Session.find({_id : sessionId},function(err,result) {
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
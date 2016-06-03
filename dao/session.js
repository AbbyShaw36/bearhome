var Session = require("./model").Session;

exports.set = function(cb) {
	var session = new Session({ isSignedIn : true});

	session.save(function(err,result) {
		if (err) {
			console.log("[Save session err] - " + err.message);
		}

		cb(err,result);
	});
}

exports.get = function(id,cb) {
	Session.findById(id,function(err,result) {
		if (err) {
			console.log("[Get session err] - " + err.message);
		}

		cb(err,result);
	});
}

exports.delete = function(id,cb) {
	Session.remove({_id: id},function(err,result) {
		if (err) {
			console.log("[Remove session err] - " + err.message);
			cb(err);
			return;
		}

		cb(err,result);
	});
}
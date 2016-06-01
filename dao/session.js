var Session = require("./model").Session;

exports.set = function(cb) {
	var session = new Session({ isSignedIn : true});

	session.save(function(err,session) {
		if (err) {
			cb({code: "0"});
			return;
		}

		cb(session.id);
	});
}

exports.get = function(id,cb) {
	Session.findById(id,function(err,session) {
		if (err) {
			console.log("[Get session err] - :" + err.message);
			return;
		}

		cb(session.isSignedIn);
	});
}

exports.delete = function(id,cb) {
	Session.remove({id: id},function(err) {
		if (err) {
			cb({code: "0"});
			return;
		}

		cb(null);
	})
}
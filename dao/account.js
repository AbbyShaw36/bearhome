var model = require("./model");

exports.count = function(cb) {
	Account.count({},function(err,result) {
		if (err) {
			console.log("[Count account err] - " + err.message);
		}

		cb(err,result);
	});
}

exports.find = function(condition,cb) {
	Account.find(condition,function(err,result) {
		if (err) {
			console.log("[Find account err] - " + err.message);
		}

		cb(err,result);
	});
}

exports.create = function(user,cb) {
	var name = user.getName();
	var password = user.getPw();
	var isAdmin = user.getIsAdmin();
	var account = new Account({name: name, password: password, isAdmin: isAdmin});

	account.save(function(err,result) {
		if (err) {
			console.log("[Save account err] - " + err.message);
		}

		cb(err,result);
	});
}

exports.update = function(user,cb) {
	var id = user.getId();
	var name = user.getName();
	var password = user.getPw();
	var isAdmin = user.getIsAdmin();

	Account.update({_id: id},{name: name, password: password, isAdmin: isAdmin},function(err,result) {
		if (err) {
			console.log("[Update account err] - " + err.message);
		}

		cb(err,result);
	});
}

exports.delete = function(user,cb) {
	var id = user.getId();

	Account.remove({_id: id},function(err,result) {
		if (err) {
			console.log("[Remove account err] - " + err.message);
		}

		cb(err,result);
	});
}
var model = require("./model");

exports.findByNameAndPw = function(user,cb) {
	var name = user.getName();
	var pw = user.getPw();
	var Account = model.Account;
	Account.findOne({name : name, password: pw},function(err,result) {
		if (err) {
			cb({code: "0"});
			return;
		}

		cb(null,result);
	});
}
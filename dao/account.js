var model = require("./model");

exports.findByNameAndPw = function(name,pw,cb) {
	var Account = model.Account;
	Account.findOne({name : name, password: pw},function(err,result) {
		if (err) {
			cb({code: "0"});
			return;
		}

		cb(null,result);
	});
}
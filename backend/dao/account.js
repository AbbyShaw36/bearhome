var util = require("util");
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var error = require("../errors/account");
var dao = {};

exports.dao = dao;

dao.findById = function(id,cb) {
	var queryText = util.format("SELECT * FROM account WHERE id = %d",id);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.findAll = function(cb) {
	var queryText = "SELECT * FROM account";

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.findByNameAndPw = function(user,cb) {
	var name = user.getName();
	var password = user.getPw();
	var queryText = util.format("SELECT * FROM account WHERE name = '%s' AND password = '%s'",name,password);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[SELECT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.create = function(user,cb) {
	var name = user.getName();
	var password = user.getPw();
	var isAdmin = user.getIsAdmin();
	var queryText = util.format("INSERT INTO account(name, password, isAdmin) VALUES('%s','%s',%d)",name,password,isAdmin);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			if (err.code === "1062") {
				retErr = error.usernameAlreadyExists;
			} else {
				retErr = commonErr.internalServerErr;
			}
		}

		cb(retErr);
	});
}

dao.update = function(user,cb) {
	var id = user.getId();
	var name = user.getName();
	var password = user.getPw();
	var isAdmin = user.getIsAdmin();
	var queryText = "UPDATE account SET";

	if (name) {
		queryText += " name = '" + name + "'";
	}

	if (password) {
		queryText += " password = '" + password + "'";
	}

	queryText += " isAdmin = " + isAdmin + "WHERE id = " + id;

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			if (err.code === "1062") {
				retErr = err.usernameAlreadyExists;
			} else {
				retErr = commonErr.internalServerErr;
			}
		}

		cb(retErr,result);
	});
}

dao.delete = function(user,cb) {
	var id = user.getId();
	var queryText = util.format("DELETE FROM account WHERE id = %d",id);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
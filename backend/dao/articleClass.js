var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var dao = {};

exports.dao = dao;

dao.create = function(articleClass,cb) {
	var name = articleClass.getName();
	var queryText = "INSERT INTO articleClass(name) VALUES('" + name + "')";

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[INSERT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.update = function(articleClass,cb) {
	var id = articleClass.getId();
	var name = articleClass.getName();
	var queryText = util.format("UPDATE articleClass SET name = '%s' WHERE id = %d",name,id);
	
	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[UPDATE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.delete = function(articleClass,cb) {
	var id = articleClass.getId();
	var queryText = "DELETE FROM articleClass WHERE id = " + id;
	
	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[UPDATE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.get = function(cb) {
	var queryText = "SELECT * FROM articleClass";

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[SELECT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
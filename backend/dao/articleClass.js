var mysql = require("mysql");
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var logger = require("../util/logger").logger;
var dao = {};

exports.dao = dao;

dao.create = function(articleClass,cb) {
	var name = articleClass.getName();
	var sql = "INSERT INTO articleClass(className) VALUES(?)";
	var inserts = [name];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[INSERT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.update = function(articleClass,cb) {
	console.log(123);
	var id = articleClass.getId();
	var name = articleClass.getName();
	var sql = "UPDATE articleClass SET className = ? WHERE classId = ?";
	var inserts = [name,id];
	sql = mysql.format(sql,inserts);
	
	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[UPDATE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.delete = function(articleClass,cb) {
	var id = articleClass.getId();
	var sql = "DELETE FROM articleClass WHERE classId = ?";
	var inserts = [id];
	sql = mysql.format(sql,inserts);
	
	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[DELETE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.get = function(cb) {
	var sql = "SELECT * FROM articleClass";

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[SELECT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
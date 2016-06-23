var mysql = require("mysql");
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var logger = require("../util/logger").logger;
var dao = {};

exports.dao = dao;

dao.getList = function(cb) {
	var queryText = "SELECT * FROM gallery";

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[get gallery list error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.get = function(gallery,cb) {
	var id = gallery.getId();
	var sql = "SELECT * FROM gallery WHERE galleryId=?";
	var inserts = [id];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[get gallery error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.create = function(gallery,cb) {
	var name = gallery.getName();
	var galleryPath = gallery.getGalleryPath();
	var coverPath = gallery.getCoverPath();
	var coverFile = gallery.getCoverFile();
	console.log(name);
	var sql = "INSERT INTO gallery(galleryName,galleryPath,coverPath,coverFile) VALUES(?,?,?,?)";
	var inserts = [name,galleryPath,coverPath,coverFile];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[create gallery error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.update = function(gallery,cb) {
	var id = gallery.getId();
	var name = gallery.getName();
	var queryText = util.format("UPDATE gallery SET name = '%s' WHERE id = %d",name,id);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.delete = function(gallery,cb) {
	var id = gallery.getId();
	var sql = "DELETE FROM gallery WHERE galleryId = ?";
	var inserts = [id];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[delete gallery error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
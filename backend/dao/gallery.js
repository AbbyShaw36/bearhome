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
	
	var sql = "INSERT INTO gallery(galleryName,galleryPath) VALUES(?,?)";
	var inserts = [name,galleryPath];
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

dao.updateName = function(gallery,cb) {
	var id = gallery.getId();
	var name = gallery.getName();
	var galleryPath = gallery.getGalleryPath();
	var sql = "UPDATE gallery SET galleryName = ?, galleryPath = ? WHERE galleryId = ?";
	var inserts = [name,galleryPath,id];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[update gallery name error] - " + err.message);
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

dao.setCover = function(gallery,cb) {
	var id = gallery.getId();
	var cover = gallery.getCover();

	var sql = "UPDATE gallery SET cover = ? WHERE galleryId = ?";
	var inserts = [cover,id];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[set cover error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.checkCover = function(image,cb) {
	var id = image.getGalleryId();
	var cover = image.getFile();

	var sql1 = "SELECT * FROM gallery WHERE galleryId = ?";
	var inserts1 = [id];
	sql1 = mysql.format(sql1,inserts1);

	connection.query(sql1,function(err,result) {
		if (err) {
			logger.error("[check cover error] - " + err.message);
			cb(commonErr.internalServerErr);
			return;
		}
		console.log(result);
		console.log(cover);
		console.log(result[0].cover);

		if (cover !== result[0].cover) {
			cb(null);
			return;
		}

		var sql2 = "UPDATE gallery SET cover = null WHERE galleryId = ?";
		var inserts2 = [id];
		sql2 = mysql.format(sql2,inserts2);

		console.log(sql2);

		connection.query(sql2,function(err,result) {
			var retErr = null;

			if (err) {
				logger.error("[check cover error] - " + err.message);
				retErr = commonErr.internalServerErr;
			}

			cb(retErr,result);
		});
	});
}
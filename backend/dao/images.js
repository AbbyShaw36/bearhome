var mysql = require("mysql");
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var logger = require("../util/logger").logger;
var dao = {};

exports.dao = dao;

dao.get = function(gallery,cb) {
	var galleryId = gallery.getId();
	var sql = "SELECT * FROM images,gallery WHERE images.galleryId = gallery.galleryId AND images.galleryId = ?";
	var inserts = [galleryId];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[get images error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
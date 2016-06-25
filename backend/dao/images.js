var mysql = require("mysql");
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var error = require("../errors/gallery");
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

dao.deleteByGallery = function(gallery,cb) {
	var galleryId = gallery.getId();
	var sql = "DELETE FROM images WHERE galleryId = ?";
	var inserts = [galleryId];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[delete images error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.add = function(image,cb) {
	var galleryId = image.getGalleryId();
	var file = image.getFile();
	var sql1 = "SELECT * FROM gallery WHERE galleryId = ?";
	var inserts1 = [galleryId];
	sql1 = mysql.format(sql1,inserts1);

	connection.query(sql1,function(err,result) {
		if (err) {
			logger.error("[add image error] - " + err.message);
			cb(commonErr.internalServerErr);
			return;
		}

		if (result.length === 0) {
			logger.warn("[add image error] - " + error.galleryNotExists.discription);
			cb(error.galleryNotExists);
			return;
		}

		var sql2 = "INSERT INTO images(galleryId,file) VALUES(?,?)";
		var inserts2 = [galleryId,file];
		sql2 = mysql.format(sql2,inserts2);

		connection.query(sql2,function(err,result) {
			var retErr = null;

			if (err) {
				logger.error("[add image error] - " + err.message);
				retErr = commonErr.internalServerErr;
			}

			cb(retErr,result);
		});
	});
}

dao.delete = function(image,cb) {
	var imageId = image.getId();
	var sql = "DELETE FROM images WHERE id = ?";
	var inserts = [imageId];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[delete image error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.getById = function(image,cb) {
	var id = image.getId();

	var sql = "SELECT * FROM images WHERE id = ?";
	var inserts = [Number(id)];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.error("[get by id err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
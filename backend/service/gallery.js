var galleryDao = require("../dao/gallery").dao;
var error = require("../errors/gallery");
var service = {};

service.get = function(cb) {
	galleryDao.get(function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.galleryNotExists;
		}

		cb(retErr,result);
	});
}

service.create = function(gallery,cb) {
	galleryDao.create(gallery,cb);
}

service.update = function(gallery,cb) {
	galleryDao.update(gallery,function(err,result) {
		var retErr = null;
		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.galleryNotExists;
		}

		cb(retErr,result);
	});
}

service.delete = function(gallery,cb) {
	galleryDao.delete(gallery,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			cb(error.galleryNotExists);
			return;
		}

		Images.deleteByGallery(gallery,cb);
	});
}
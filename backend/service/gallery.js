var galleryDao = require("../dao/gallery").dao;
var imagesDao = require("../dao/images").dao;
var error = require("../errors/gallery");
var logger = require("../util/logger").logger;
var service = {};

exports.service = service;

service.getList = function(cb) {
	galleryDao.getList(function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			logger.warn("[get gallery list error] - " + error.galleryNotExists.discription);
			retErr = error.galleryNotExists;
		}

		cb(retErr,result);
	});
}

service.get = function(gallery,cb) {
	galleryDao.get(gallery,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[get gallery error] - " + error.galleryNotExists.discription);
			cb(error.galleryNotExists);
			return;
		}

		cb(null,result);
	});
}

service.create = function(gallery,cb) {
	galleryDao.create(gallery,cb);
}

service.updateName = function(gallery,cb) {
	galleryDao.updateName(gallery,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			logger.warn("[update gallery name error] - " + error.galleryNotExists.discription);
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
			logger.error("[delete gallery error] - " + error.galleryNotExists.discription);
			cb(error.galleryNotExists);
			return;
		}

		imagesDao.deleteByGallery(gallery,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,result);
		});
	});
}

service.getImages = function(gallery,cb) {
	imagesDao.get(gallery,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[get images error] - " + error.imagesNotExists.discription);
			cb(error.imagesNotExists);
			return;
		}

		cb(null,result);
	});
}

service.addImg = function(image,cb) {
	imagesDao.add(image,cb);
}

service.deleteImg = function(image,cb) {
	imagesDao.delete(image,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[deleteImg error] - " + error.imageNotExists.discription);
			cb(error.imageNotExists);
			return;
		}

		cb(null,result);
	});
}
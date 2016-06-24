var service = require("../service/gallery").service;
var Gallery = require("../model/gallery").Gallery;
var Image = require("../model/image").Image;
var error = require("../errors/gallery");
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;

exports.getList = function(req,res,cb) {
	service.getList(function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null,{gallerys: result});
	});
}

exports.get = function(req,res,cb) {
	getDataByURL(req,function(data) {
		var id = data.id;

		if (!id) {
			cb(error.galleryIdNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setId(id);

		service.get(gallery,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,{gallery: result});
		});
	});
}

exports.create = function(req,res,cb) {
	getDataByBody(req,function(data) {
		var name = data.name;
		var galleryPath = data.galleryPath;
		var coverPath = data.coverPath;
		var coverFile = data.coverFile;

		console.log(name);

		if (!name) {
			cb(error.galleryNameNotProvided);
			return;
		}

		if (!galleryPath) {
			cb(error.galleryPathNotProvided);
			return;
		}

		if (!coverPath) {
			cb(error.coverPathNotProvided);
			return;
		}

		if (!coverFile) {
			cb(error.coverFileNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setName(name);
		gallery.setGalleryPath(galleryPath);
		gallery.setCoverPath(coverPath);
		gallery.setCoverFile(coverFile);

		service.create(gallery,cb);
	});
}

exports.updateName = function(req,res,cb) {
	getDataByBody(req,function(data) {
		var id = data.id;
		var name = data.name;
		var galleryPath = data.galleryPath;

		if (!id) {
			cb(error.galleryIdNotProvided);
			return;
		}

		if (!name) {
			cb(error.galleryNameNotProvided);
			return;
		}

		if (!galleryPath) {
			cb(error.galleryPathNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setId(id);
		gallery.setName(name);
		gallery.setGalleryPath(galleryPath);

		service.updateName(gallery,cb);
	});
}

exports.delete = function(req,res,cb) {
	getDataByURL(req,function(data) {
		var id = data.id;

		if (!id) {
			cb(error.galleryIdNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setId(id);

		service.delete(gallery,cb);
	});
}

exports.getImages = function(req,res,cb) {
	getDataByURL(req,function(data) {
		var id = data.id;

		if (!id) {
			cb(error.galleryIdNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setId(id);

		service.getImages(gallery,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,{images: result});
		});
	});
}

exports.addImg = function(req,res,cb) {
	getDataByBody(req,function(data) {
		var galleryId = data.galleryId;
		var file = data.file;

		if (!galleryId) {
			logger.warn("[addImg error] - " + error.galleryIdNotProvided.discription);
			cb(error.galleryIdNotProvided);
			return;
		}

		if (!file) {
			logger.warn("[addImg error] - " + error.imageFileNotProvided.discription);
			cb(error.imageFileNotProvided);
			return;
		}

		var image = new Image();
		image.setGalleryId(galleryId);
		image.setFile(file);

		service.addImg(image,cb);
	});
}

exports.deleteImg = function(req,res,cb) {
	getDataByURL(req,function(data) {
		var imgId = data.id;

		if (!imgId) {
			logger.warn("[deleteImg error] - " + error.imageIdNotProvided.discription);
			cb(error.imageIdNotProvided);
			return;
		}

		var image = new Image();
		image.setId(imgId);

		service.deleteImg(image,cb);
	});
}
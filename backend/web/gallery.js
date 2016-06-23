var service = require("../service/gallery").service;
var Gallery = require("../model/gallery").Gallery;
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

exports.update = function(req,cb) {
	getDataByBody(req,function(data) {
		var id = data.id;
		var name = data.name;

		if (!id) {
			cb(error.galleryIdNotProvided);
			return;
		}

		if (!name) {
			cb(error.galleryNameNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setId(id);
		gallery.setName(name);

		service.update(gallery,cb);
	});
}

exports.delete = function(req,cb) {
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

		service.getImages(gallery,cb);
	});
}
var service = require("../service/gallery").service;
var Gallery = require("../model/gallery").Gallery;
var error = require("../errors/gallery");
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var galleryList = {};

galleryList.get = function(req,cb) {
	service.get(function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null,{gallery: result});
	});
}

galleryList.create = function(req,cb) {
	getDataByBody(req,function(data) {
		var name = data.name;
		var coverPath = data.coverPath;
		var coverFile = data.coverFile;
		var imgPath = data.imgPath;

		if (!name) {
			cb(error.galleryNameNotProvided);
			return;
		}

		if (!coverPath) {
			cb(error.CoverPathNotProvided);
			return;
		}

		var gallery = new Gallery();
		gallery.setName(name);

		service.create(gallery,cb);
	});
}

galleryList.update = function(req,cb) {
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

galleryList.delete = function(req,cb) {
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
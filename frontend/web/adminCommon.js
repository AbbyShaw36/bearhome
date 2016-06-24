var http = require("http");
var extend = require("extend");
var fs = require("fs");
var sha1 = require("sha1");
var querystring = require("querystring");
var formidable = require("formidable");
var getData = require("../util/getData").byBody;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var options = {
	host : global.config.backend_host,
	port : global.config.backend_port,
	method : "GET"
}

var common = {};

exports.common = common;

// 获取用户名
common.getUserName = function(req,cb) {
	options = extend(options,{
		path : "/admin/account/getBySessionId",
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			var user = JSON.parse(data).user;
			logger.trace("[getUserName result] - " + user);
			cb(null,user);
		});
	});

	req.on("error",function(err) {
		logger.error("[getUserName error] - " + err.message);
	});

	req.end();
}

// 获取文章列表
common.getArticleList = function(req,condition,cb) {
	var url = "/admin/articleList/getList?";

	if (condition.perpage) {
		url += "perpage=" + condition.perpage + "&";
	}

	if (condition.title) {
		url += "title=" + condition.title + "&";
	}

	if (condition.classId) {
		url += "classId=" + condition.classId + "&";
	}

	if (condition.page) {
		url += "page=" + condition.page;
	}

	options = extend(options,{
		path : url,
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		var articleList = [];

		if (res.statusCode !== 200 && res.statusCode !== 404) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			if (data) {
				articleList = JSON.parse(data).articles;
				logger.trace("[getArticleList result] - " + articleList);
			}

			cb(null,articleList);
		});
	});

	req.on("error",function(err) {
		logger.error("[getArticleList error] - " + err.message);
	});

	req.end();
}

// 获取文章内容
common.getArticle = function(req,articleId,cb) {
	options = extend(options,{
		path : "/admin/article/get?id=" + articleId,
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			var article = JSON.parse(data).article;

			logger.trace("[getArticle result] -" + article);
			cb(null,article);
		});
	});
	
	req.on("error",function(err) {
		logger.error("[getArticle error] - " + err.message);
	});

	req.end();
}

// 获取相册列表
common.getGalleryList = function(req,cb) {
	options = extend(options,{
		path : "/admin/gallery/getList",
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200 && res.statusCode !== 404) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		var galleryList = [];

		getData(res,function(data) {
			if (data) {
				galleryList = JSON.parse(data).gallerys;
				logger.trace("[getGalleryList result] - " + galleryList);
			}

			cb(null,galleryList);
		});
	});
	
	req.on("error",function(err) {
		logger.error("[getGalleryList error] - " + err.message);
	});

	req.end();
}

common.isSignedIn = function(req,cb) {
	options = extend(options, {
		path : "/admin/account/isSignedIn",
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		cb(null);
	});
	
	req.on("error",function(err) {
		logger.error("[getGalleryList error] - " + err.message);
	});

	req.end();
}

common.createGallery = function(req,cb) {
	var that = this;

	getData(req,function(data) {
		data = querystring.parse(data);

		if (!data || !data.name) {
			logger.warn("[createGallery error] - " + error.galleryNameNotProvided.discription);
			cb(error.galleryNameNotProvided);
			return;
		}

		var name = sha1(data.name);
		var path = "./view/" + global.config.galleryPath + name + "/";
		var result = {
			galleryPath : "../" + global.config.galleryPath + name + "/",
			coverPath : global.config.coverPath,
			coverFile : global.config.defaultCover
		}

		that.createDir(path,function(err) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,result);
		});
	});
}

common.createDir = function(path,cb) {
	fs.exists(path,function(exists) {
		if (exists) {
			logger.warn("[create dir error] - " + error.dirAlreadyExists.discription);
			cb(error.dirAlreadyExists);
			return;
		}

		fs.mkdir(path,function(err) {
			if (err) {
				logger.error("[create dir error] - " + err);
				cb(error.internalServerErr);
				return;
			}

			logger.trace("[create dir] - success");
			cb(null);
		});
	});
}

common.getGallery = function(req,galleryId,cb) {
	options = extend(options, {
		path : "/admin/gallery/get?id=" + galleryId,
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			var gallery = JSON.parse(data).gallery[0];
			cb(null,gallery);
		});
	})
	
	req.on("error",function(err) {
		logger.error("[getImages error] - " + err.message);
	});

	req.end();
}

common.getImages = function(req,galleryId,cb) {
	options = extend(options, {
		path : "/admin/gallery/getImages?id=" + galleryId,
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200 && res.statusCode !== 404) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		var images = [];

		getData(res,function(data) {
			if (data) {
				images = JSON.parse(data).images;
				logger.trace("[getImages result] - " + images);
			}

			cb(null,images);
		});
	});
	
	req.on("error",function(err) {
		logger.error("[getImages error] - " + err.message);
	});

	req.end();
}

common.deleteGallery = function(req,galleryName,coverFile,cb) {
	var galleryPath = global.config.galleryPath + sha1(galleryName);

	this.deleteDir(galleryPath,function(err) {
		if (err) {
			cb(err);
			return;
		}

		if (coverFile === global.config.defaultCover) {
			cb(null,{});
			logger.trace("finish delete gallery");
			return;
		}
		
		var coverPath = global.config.coverPath + coverFile;

		fs.unlink(coverPath,function(err) {
			if (err) {
				logger.error("[delete file error] - " + err);
				cb(error.internalServerErr);
				return;
			}

			cb(null,{});
			logger.trace("finish delete gallery");
		});
	});
}

common.deleteDir = function(path,cb) {
	fs.exists(path,function(exists) {
		if (!exists) {
			logger.warn("[delete dir] - " + error.galleryNotExists.discription);
			cb(error.galleryNotExists);
			return;
		}

		logger.trace("[delete dir] - path exists");

		fs.readdir(path,function(err,files) {
			if (err) {
				logger.error("[read dir error] - " + err);
				cb(error.internalServerErr);
				return;
			}
			
			if (files.length === 0) {
				fs.rmdir(path,function(err) {
					if (err) {
						logger.error("[delete dir error] - " + err);
						cb(error.internalServerErr);
						return;
					}

					logger.trace("[delete dir] - success");
					cb(null);
				});
				return;
			}

			logger.trace("[read dir] - dir has files");

			var i = 0;

			files.foreach(function(file,index) {
				fs.unlink(path + "/" + file,function(err) {
					if (err) {
						logger.error("[delete file error] - " + err);
						cb(error.internalServerErr);
					}
					
					i++;

					if (i === files.length) {
						logger.trace("[delete files in dir] - finish");
						cb(null);
					}
				});
			});
		});
	});
}

common.updateGallery = function(req,cb) {
	getData(req,function(data) {
		data = querystring.parse(data);

		var oldName = data.oldName;
		var newName = data.newName;

		if (!oldName) {
			logger.warn("[update gallery error] - " + error.galleryOldNameNotProvided.discription);
			cb(error.galleryOldNameNotProvided);
			return;
		}

		if (!newName) {
			logger.warn("[update gallery error] - " + error.galleryNewNameNotProvided.discription);
			cb(error.galleryNewNameNotProvided);
			return;
		}

		var oldGalleryPath = global.config.galleryPath + sha1(oldName);
		var newGalleryPath = global.config.galleryPath + sha1(newName);
		console.log(oldGalleryPath);
		console.log(newGalleryPath);

		fs.exists(oldGalleryPath,function(exists) {
			if (!exists) {
				logger.warn("[update gallery error] - " + error.galleryNotExists.discription);
				cb(error.galleryNotExists);
				return;
			}

			logger.trace("[update gallery] - gallery exists");

			fs.rename(oldGalleryPath,newGalleryPath,function(err) {
				if (err) {
					logger.error("[update gallery error] - " + err);
					cb(error.internalServerErr);
					return;
				}

				logger.trace("[update gallery] - success");

				cb(null,{galleryPath : newGalleryPath});
			});
		});
	});
}

common.addImg = function(req,cb) {
	var form = new formidable.IncomingForm();

	form.parse(req,function(err,fields,files) {
		var galleryPath = fields.galleryPath.replace("..","./view");
		var file = files.file;
		var fileType = file.type.split("/")[1];
		var imgFile = new Date().getTime().toString() + Math.floor(Math.random() * 100).toString() + "." + fileType;
		var path = galleryPath + "/" + imgFile;

		if (!file.type.match("image")) {
			logger.warn("[add image error] - " + error.fileTypeNotAllowed.discription);
			cb(error.fileTypeNotAllowed);
			return;
		}

		fs.readFile(file.path,function(err,data) {
			fs.exists(galleryPath,function(exists) {
				if (!exists) {
					logger.warn("[add image error] - " + error.galleryNotExists.discription);
					cb(error.galleryNotExists);
					return;
				}

				fs.writeFile(path,data,function(err) {
					if (err) {
						logger.error("[add image error] - " + err);
						cb(error.internalServerErr);
						return;
					}

					logger.trace("[add image] - success");
					cb(null,{imgFile: imgFile});
				});
			});
		});
	});
}

common.deleteImg = function(req,imgPath,cb) {
	imgPath = imgPath.replace("..","./view");

	fs.exists(imgPath,function(exists) {
		if (!exists) {
			logger.warn("[delete image error] - " + error.imgNotExists.discription);
			cb(error.imgNotExists);
			return;
		}

		fs.unlink(imgPath,function(err) {
			if (err) {
				logger.warn("[delete image error] - " + err);
				cb(error.internalServerErr);
				return;
			}

			cb(null,{});
		});
	});
}
var jade = require("jade");
var extend = require("extend");
var common = require("./adminCommon").common;
var setTimeType = require("./util").setTimeType;
var logger = require("../util/logger").logger;
var getData = require("../util/getData").byURL;
var error = require("../util/error");

exports.index = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var options = {
			filename: "index.html",
			doctype: "html"
		};
		var locals = {
			title: "后台管理系统",
			username : username
		};
		var fn = jade.compileFile("./view/admin/index.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}

exports.articleList = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var condition = {perpage : 10};

		common.getArticleList(req,condition,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			console.log(result);

			var articleList = result;
			var options = {
				filename: "articleList.html",
				doctype: "html"
			};
			var locals = {
				title: "后台管理系统-文章列表",
				username : username,
				articleList : articleList,
				setTimeType : setTimeType
			};
			var fn = jade.compileFile("./view/admin/articleList.jade",options);
			var html = fn(locals);

			cb(null,html);
		});
	});
}

exports.articleClass = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var options = {
			filename: "articleClass.html",
			doctype: "html"
		};
		var locals = {
			title: "后台管理系统-文章列表-文章分类",
			username : username
		};
		var fn = jade.compileFile("./view/admin/articleClass.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}

exports.createArticle = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var options = {
			filename: "createArticle.html",
			doctype: "html"
		};
		var locals = {
			title: "后台管理系统-文章列表-新建文章",
			username : username
		};
		var fn = jade.compileFile("./view/admin/article.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}

exports.updateArticle = function(req,cb) {
	getData(req,function(data) {
		var articleId = data.id;

		if (!articleId) {
			logger.warn("[updateArticle error] -" + error.articleIdNotProvided.description);
			cb(error.articleIdNotProvided);
			return;
		}

		common.getUserName(req,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var username = result.name;
			common.getArticle(req,articleId,function(err,result) {
				var article = result;
				var options = {
					filename: "updateArticle.html",
					doctype: "html"
				};
				var locals = {
					title: "后台管理系统-文章列表-修改文章",
					username : username,
					article : article
				};
				var fn = jade.compileFile("./view/admin/article.jade",options);
				var html = fn(locals);

				cb(null,html);
			});
		});
	});
}

exports.getArticleList = function(req,cb) {
	getData(req,function(data) {
		var condition = {perpage : 10};
		condition = extend(condition,data);

		common.getUserName(req,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var username = result.name;

			common.getArticleList(req,condition,function(err,result) {
				if (err) {
					cb(err);
					return;
				}

				console.log(result);

				var articleList = result;
				var options = {
					filename: "articleList.html",
					doctype: "html"
				};
				var locals = {
					articleList : articleList,
					setTimeType : setTimeType
				};
				var fn = jade.compileFile("./view/admin/getArticleList.jade",options);
				var html = fn(locals);

				cb(null,html);
			});
		});
	});
}

exports.galleryList = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;

		common.getGalleryList(req,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var galleryList = result;
			var options = {
				filename: "galleryList.html",
				doctype: "html"
			};
			var locals = {
				title: "后台管理系统-相册列表",
				username: username,
				galleryList: galleryList
			};
			var fn = jade.compileFile("./view/admin/galleryList.jade",options);
			var html = fn(locals);

			cb(null,html);
		});
	});
}

exports.createGallery = function(req,cb) {
	common.isSignedIn(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		common.createGallery(req,cb);
	});
}

exports.gallery = function(req,cb) {
	getData(req,function(data) {
		var galleryId = data.id;

		if (!galleryId) {
			logger.warn("[gallery error] -" + error.galleryIdNotProvided.discription);
			cb(error.galleryIdNotProvided);
			return;
		}

		common.getUserName(req,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var username = result.name;

			common.getGallery(req,galleryId,function(err,result) {
				if (err) {
					cb(err);
					return;
				}

				var gallery = result;

				common.getImages(req,galleryId,function(err,result) {
					if (err) {
						cb(err);
						return;
					}

					var images = result;
					var options = {
						filename: "gallery.html",
						doctype: "html"
					};
					var locals = {
						title: "后台管理系统-相册列表-相册",
						username: username,
						images: images,
						gallery: gallery
					};
					var fn = jade.compileFile("./view/admin/gallery.jade",options);
					var html = fn(locals);

					cb(null,html);
				});
			});
		});
	});
}

exports.deleteGallery = function(req,cb) {
	common.isSignedIn(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		getData(req,function(data) {
			var name = data.name;

			if (!name) {
				logger.warn(error.galleryNameNotProvided.discription);
				cb(error.galleryNameNotProvided);
				return;
			}

			common.deleteGallery(req,name,cb);
		});
	});
}

exports.updateGallery = function(req,cb) {
	common.isSignedIn(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		common.updateGallery(req,cb);
	});
}

exports.addImg = function(req,cb) {
	common.isSignedIn(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		common.addImg(req,cb);
	});
}

exports.deleteImg = function(req,cb) {
	common.isSignedIn(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		getData(req,function(data) {
			var imgPath = data.imgPath;

			if (!imgPath) {
				logger.warn(error.imgPathNotProvided.discription);
				cb(error.imgPathNotProvided);
				return;
			}

			common.deleteImg(req,imgPath,cb);
		});
	});
}
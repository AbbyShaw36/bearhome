var http = require("http");
var url = require("url");
var config = require("./config");
var router = require("./router/router").router;
var admin = require("./web/admin");
var logger = require("./util/logger").logger;

var handle = {
	"/admin/index.html" : {
		"GET" : admin.index
	},
	"/admin/articleList.html" : {
		"GET" : admin.articleList
	},
	"/admin/articleClass.html" : {
		"GET" : admin.articleClass
	},
	"/admin/createArticle.html" : {
		"GET" : admin.createArticle
	},
	"/admin/updateArticle.html" : {
		"GET" : admin.updateArticle
	},
	"/admin/getArticleList.html" : {
		"GET" : admin.getArticleList
	},
	"/admin/galleryList.html" : {
		"GET" : admin.galleryList
	},
	"/admin/createGallery" : {
		"POST" : admin.createGallery
	},
	"/admin/gallery.html" : {
		"GET" : admin.gallery
	},
	"/admin/deleteGallery" : {
		"DELETE" : admin.deleteGallery
	},
	"/admin/updateGallery" : {
		"PUT" : admin.updateGallery
	},
	"/admin/addImg" : {
		"POST" : admin.addImg
	},
	"/admin/deleteImg" : {
		"DELETE" : admin.deleteImg
	}
};

(function(router,handle) {
	function onRequest(req,res) {
		var pathname = url.parse(req.url).pathname;

		logger.trace("Request for " + pathname + " received.");

		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(global.config.port,function() {
		logger.trace("Server has started.");
	});
})(router,handle);
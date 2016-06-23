var http = require("http");
var url = require("url");
var mongoose = require("mongoose");
var config = require("./config");
var router = require("./router/router").router;
var logger = require("./util/logger").logger;
var account = require("./web/account");
var articleList = require("./web/articleList");
var articleClass = require("./web/articleClass");
var article = require("./web/article");
var gallery = require("./web/gallery");

var handle = {
	"/admin/account/signin" : {
		"POST" : account.signin
	},
	"/admin/account/isSignedIn" : {
		"GET" : account.isSignedIn
	},
	"/admin/account/getBySessionId" : {
		"GET" : account.getBySessionId
	},
	"/admin/account/signout" : {
		"DELETE" : account.signout
	},
	"/admin/articleList/getList" : {
		"GET" : articleList.getList
	},
	"/admin/articleClass/get" : {
		"GET" : articleClass.get
	},
	"/admin/articleClass/create" : {
		"POST" : articleClass.create
	},
	"/admin/articleClass/update" : {
		"PUT" : articleClass.update
	},
	"/admin/articleClass/delete" : {
		"DELETE" : articleClass.delete
	},
	"/admin/article/create" : {
		"POST" : article.create
	},
	"/admin/article/get" : {
		"GET" : article.get
	},
	"/admin/article/update" : {
		"PUT" : article.update
	},
	"/admin/article/delete" : {
		"DELETE" : article.delete
	},
	"/admin/gallery/getList" : {
		"GET" : gallery.getList
	},
	"/admin/gallery/create" : {
		"POST" : gallery.create
	},
	"/admin/gallery/getImages" : {
		"GET" : gallery.getImages
	},
	"/admin/gallery/get" : {
		"GET" : gallery.get
	},
	"/admin/gallery/delete" : {
		"DELETE" : gallery.delete
	}
};

// 数据库连接
mongoose.connect("mongodb://localhost/bearhome");

var db = mongoose.connection;

db.on("error",function() {
	logger.error("Fail to connect database!");
});

db.once("open",function() {
	logger.trace("Success to connect database!");
});

// 服务器监听
(function (router,handle) {
	function onRequest(req,res) {
		var pathname = url.parse(req.url).pathname;

		logger.trace("Request for " + pathname + " received.");
		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(global.config.port,function() {
		logger.trace("Server has started.");
	});
})(router,handle);
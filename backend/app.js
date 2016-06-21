var http = require("http");
var url = require("url");
var mongoose = require("mongoose");
var router = require("./router/router").router;
var logger = require("./util/logger").logger;
var account = require("./web/account");
var articleList = require("./web/articleList");
var articleClass = require("./web/articleClass");

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

	http.createServer(onRequest).listen(3000,function() {
		logger.trace("Server has started.");
	});
})(router,handle);
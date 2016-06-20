var http = require("http");
var mongoose = require("mongoose");
var router = require("./router/router").router;
var account = require("./web/account");
var logger = require("./util/logger").logger;

var handle = {
	"/admin/account/signin" : {
		"POST" : account.signin
	},
	"/admin/account/isSignedIn" : {
		"GET" : account.isSignedIn
	},
	"/admin/account/getBySessionId" : {
		"GET" : account.getBySessionId
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
		var pathname = req.url;
		logger.trace("Request for " + pathname + " received.");
		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(3000,function() {
		logger.trace("Server has started.");
	});
})(router,handle);
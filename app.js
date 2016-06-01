var http = require("http");
var mongoose = require("mongoose");
var router = require("./router/router");
var account = require("./web/account");

var handle = {
	"admin/account/signin" : {
		"POST" : account.signin
	},
	"admin/index" : {
		"GET" : admin.index
	},
	"admin/account/signout" : {
		"POST" : account.signout
	},
	"admin/articleList" : {
		"GET" : admin.articleList
	},
	"admin/articleList/delete" : {
		"POST" : articleList.delete
	},
	"admin/articleList/changeClass" : {
		"POST" : articleList.changeClass
	},
	"admin/article" : {
		"GET" : admin.article
	},
	"admin/article/create" : {
		"POST" : article.create
	},
	"admin/article/update" : {
		"POST" : article.update
	}
};

// 数据库连接
mongoose.connect("mongodb://localhost/bearhome");

var db = mongoose.connection;

db.on("error",function() {
	console.log("Fail to connect database!");
});

db.once("open",function() {
	console.log("Success to connect database!");
});

// 服务器监听
(function (route,handle) {
	function onRequest(req,res) {
		var pathname = req.url;
		console.log("Request for " + pathname + " received.");
		route(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(3000,function() {
		console.log("Server has started.");
	});
})(router.route,handle);
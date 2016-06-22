var http = require("http");
var url = require("url");
var router = require("./router/router").router;
var admin = require("./web/admin");
var logger = require("./util/logger").logger;

var handle = {
	"/admin/index.html" : admin.index,
	"/admin/articleList.html" : admin.articleList,
	"/admin/articleClass.html" : admin.articleClass,
	"/admin/createArticle.html" : admin.createArticle,
	"/admin/updateArticle.html" : admin.updateArticle,
	"/admin/getArticleList.html" : admin.getArticleList
};

(function(router,handle) {
	function onRequest(req,res) {
		var pathname = url.parse(req.url).pathname;

		logger.trace("Request for " + pathname + " received.");

		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(8888,function() {
		logger.trace("Server has started.");
	});
})(router,handle);
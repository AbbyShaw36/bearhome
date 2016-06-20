var http = require("http");
var router = require("./router/router").router;
var admin = require("./web/admin");
var logger = require("./util/logger").logger;

var handle = {
	"/admin/index.html" : admin.index
};

(function(router,handle) {
	function onRequest(req,res) {
		var pathname = req.url;

		logger.trace("Request for " + pathname + " received.");

		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(8888,function() {
		logger.trace("Server has started.");
	});
})(router,handle);
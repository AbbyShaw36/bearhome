var http = require("http");
var router = require("./router/router").router;
var admin = require("./web/admin");

var handle = {
};

(function(router,handle) {
	function onRequest(req,res) {
		var pathname = req.url;
		console.log("Request for " + pathname + " received.");
		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(8888,function() {
		console.log("Server has started.");
	});
})(router,handle);
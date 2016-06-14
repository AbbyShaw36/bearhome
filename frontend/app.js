var http = require("http");
var router = require("./router/router").router;
var admin = require("./web/admin");

var handle = {
	"admin/signin" : admin.signin
}


(function (router,handle) {
	function onRequest(req,res) {
		var pathname = req.url;
		console.log("Request for " + pathname + " received.");
		router(req,res,pathname,handle);
	}

	http.createServer(onRequest).listen(3000,function() {
		console.log("Server has started.");
	});
})(router,handle);
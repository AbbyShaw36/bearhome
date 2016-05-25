var http = require("http");
var router = require("./router/router");
var admin_requestPage = require("./web/admin_requestPage");

var handle = {
	"/admin" : admin_requestPage.index,
	"/admin/login" : admin_requestPage.login
	}
};

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
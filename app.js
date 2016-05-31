var http = require("http");
var router = require("./router/router");
var admin_account = require("./web/account");

var handle = {
	"admin/account/signin" : {
		"POST" : admin_account.signin;
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
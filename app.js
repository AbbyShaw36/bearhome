var http = require("http");
var router = require("./router/router");
var handler = require("./web/handler").handler;

var handle = {
	"/admin/login" : function(req,res) {
		return handler.login(req,res);
	},
	"/admin" : function() {
		return handler.admin(req,res);
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
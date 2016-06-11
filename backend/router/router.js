var send = require("../util/send");
var middleware = require("../middleware/middleware").middleware;

exports.route = function(req,res,pathname,handle) {
	console.log("About to route a request for " + pathname);

	if (pathname === "/" || pathname === "admin/") {
		pathname += "index";
	}

	middleware(req,res,pathname,handle);
}
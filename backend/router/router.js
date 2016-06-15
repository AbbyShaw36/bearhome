var middleware = require("../middleware/middleware").middleware;

exports.router = function(req,res,pathname,handle) {
	console.log("About to route a request for " + pathname);

	if (pathname === "/" || pathname === "admin/") {
		pathname += "index";
	}

	middleware(req,res,pathname,handle);
}
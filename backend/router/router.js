var middleware = require("../middleware/middleware").middleware;
var logger = require("../util/logger").logger;

exports.router = function(req,res,pathname,handle) {
	logger.trace("About to route a request for " + pathname);

	if (pathname === "/" || pathname === "admin/") {
		pathname += "index";
	}

	middleware(req,res,pathname,handle);
}
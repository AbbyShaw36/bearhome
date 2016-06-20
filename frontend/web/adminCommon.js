var http = require("http");
var getData = require("../util/getData").byBody;
var logger = require("../util/logger").logger;

exports.getUserName = function(req,cb) {
	var options = {
		host : "127.0.0.1",
		port : "3000",
		method : "GET",
		path : "/admin/account/getBySessionId",
		headers : req.headers
	}

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			var data = JSON.parse(data);
			logger.trace("[getUserName result]" + data);
			cb(null,data.user);
		});
	});

	req.on("error",function(err) {
		logger.error(err.message);
	});

	req.end();
}
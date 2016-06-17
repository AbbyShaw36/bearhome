var http = require("http");
var getData = require("../util/getData").byBody;

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
			console.log("[getUserName result]");
			console.log(data);
			cb(null,data.user);
		});
	});

	req.on("error",function(err) {
		console.log(err);
	});

	req.end();
}
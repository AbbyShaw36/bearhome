var querystring = require("querystring");
var url = require("url");

exports.byBody = function(req,cb) {
	var data = "";
	
	req.addListener("data",function(chunk) {
		data += chunk;

		// Too much POST data, kill the connection!
		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		if (data.length > 1e6) {
			data = "";
			response.writeHead(413, {'Content-Type': 'text/plain'}).end();
			request.connection.destroy();
		}
	});

	req.addListener("end",function() {
		data = querystring.parse(data);

		cb(data);
	});
}

exports.byURL = function(req,cb) {
	var data = url.parse(req.url,true).query;

	cb(data);
}
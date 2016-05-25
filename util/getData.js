var querystring = require("querystring");

exports.get = function(req,cb) {
	var data = "";
	
	req.addListener("data",function(chunk) {
		data += chunk;
	});

	req.addListener("end",function() {
		data = querystring.parse(data);

		cb(data);
	}
}
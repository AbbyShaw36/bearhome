var querystring = require("querystring");
var url = require("url");

exports.byBody = function(res,cb) {
	var data = "";
	
	res.addListener("data",function(chunk) {
		data += chunk;
	});

	res.addListener("end",function() {
		cb(data);
	});
}

exports.byURL = function(req,cb) {
	var data = url.parse(req.url,true).query;

	cb(data);
}
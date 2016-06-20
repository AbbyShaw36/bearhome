var fs = require("fs");
var path = require("path");
var mime = require("mime");

exports.serveStatic = function(res,pathname) {
	var filePath = "./view" + pathname;

	fs.exists(filePath,function(exists){
		if (exists) {
			fs.readFile(filePath,function(err, data) {
				if (err) {
					send404(res);
				} else {
					sendFile(res,filePath,data);
				}
			});
		} else {
			send404(res);
		}
	});
}

function send404(res) {
	res.writeHead(404,{"Content-Type" : "text/plain"});
	res.write("Error 404: resource not found.");
	res.end();
}

function sendFile(res, filePath, fileContent) {
	res.writeHead(200,{
		"Content-Type" : mime.lookup(path.basename(filePath))
	});
	res.end(fileContent);
}
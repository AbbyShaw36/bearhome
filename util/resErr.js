var endString = "";

exports.ResErr = {
	"400" : function(res) {
		endString = JSON.stringify({
			err: "Request does not provide the necessary parameters"
		});

		res.statusCode = 400;
		res.end(endString);
	},
	"404" : function(res) {
		endString = JSON.stringify({
			err: "Can not find the requested data"
		});

		res.statusCode = 404;
		res.end(endString);
	}
}
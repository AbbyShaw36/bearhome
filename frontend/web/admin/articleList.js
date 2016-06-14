var jade = require("jade");
var http = require("http");
var perpage = 10;

function getArticles(req,cb) {
	var options = {
		host : "127.0.0.1",
		path : "admin/getArticleList?perpage=" + perpage
	};

	var callback = function(res) {
		getDataByBody(res,function(data) {
			if (data.err) {
				cb(err);
				return;
			}

			cb(null,{});
		});
	}
}

function file(req,cb) {
	
}
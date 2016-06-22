var http = require("http");
var extend = require("extend");
var getData = require("../util/getData").byBody;
var logger = require("../util/logger").logger;
var options = {
	host : "127.0.0.1",
	port : "3000",
	method : "GET"
}
var common = {};

exports.common = common;

// 获取用户名
common.getUserName = function(req,cb) {
	options = extend(options,{
		path : "/admin/account/getBySessionId",
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			var data = JSON.parse(data);
			logger.trace("[getUserName result] - " + data.user);
			cb(null,data.user);
		});
	});

	req.on("error",function(err) {
		logger.error(err.message);
	});

	req.end();
}

// 获取文章列表
common.getArticleList = function(req,perpage,cb) {
	options = extend(options,{
		path : "/admin/articleList/getList?perpage=" + perpage,
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		var articleList = [];

		if (res.statusCode !== 200 && res.statusCode !== 404) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			if (data) {
				var data = JSON.parse(data);

				logger.trace("[getArticleList result] - " + data.articles);
				articleList = data.articles;
			}

			cb(null,articleList);
		});
	});

	req.on("error",function(err) {
		logger.error(err.message);
	});

	req.end();
}

// common.getArticleClass = function(req,cb) {
// 	options = extend(options,{
// 		path : "/admin/articleClass/get",
// 		headers : req.headers
// 	});

// 	var req = http.request(options,function(res) {
// 		var classList = [];

// 		if (res.statusCode !== 200 && res.statusCode !== 404) {
// 			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
// 			return;
// 		}

// 		getData(res,function(data) {
// 			if (data) {
// 				var data = JSON.parse(data);

// 				logger.trace("[getArticleClass result] - " + data);
// 				classList = data.classList;
// 			}

// 			cb(null,classList);
// 		});
// 	});
// }

common.getArticle = function(req,articleId,cb) {
	options = extend(options,{
		path : "/admin/article/get?id=" + articleId,
		headers : req.headers
	});

	var req = http.request(options,function(res) {
		if (res.statusCode !== 200) {
			cb({statusCode: res.statusCode, statusMessage: res.statusMessage});
			return;
		}

		getData(res,function(data) {
			var article = JSON.parse(data).article;

			logger.trace("[getArticle result] -" + article);
			cb(null,article);
		});
	});
	
	req.on("error",function(err) {
		logger.error(err.message);
	});

	req.end();
}
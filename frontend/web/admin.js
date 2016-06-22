var jade = require("jade");
var common = require("./adminCommon").common;
var setTimeType = require("./util").setTimeType;
var logger = require("../util/logger").logger;
var getData = require("../util/getData").byURL;
var error = require("../util/error");

exports.index = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var options = {
			filename: "index.html",
			doctype: "html"
		};
		var locals = {
			title: "后台管理系统",
			username : username
		};
		var fn = jade.compileFile("./view/admin/index.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}

exports.articleList = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var perpage = 10;

		common.getArticleList(req,perpage,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			console.log(result);

			var articleList = result;
			var options = {
				filename: "articleList.html",
				doctype: "html"
			};
			var locals = {
				title: "后台管理系统-文章列表",
				username : username,
				articleList : articleList,
				setTimeType : setTimeType
			};
			var fn = jade.compileFile("./view/admin/articleList.jade",options);
			var html = fn(locals);

			cb(null,html);
		});
	});
}

exports.articleClass = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var options = {
			filename: "articleClass.html",
			doctype: "html"
		};
		var locals = {
			title: "后台管理系统-文章分类",
			username : username
		};
		var fn = jade.compileFile("./view/admin/articleClass.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}

exports.createArticle = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var username = result.name;
		var options = {
			filename: "createArticle.html",
			doctype: "html"
		};
		var locals = {
			title: "后台管理系统-新建文章",
			username : username
		};
		var fn = jade.compileFile("./view/admin/article.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}

exports.updateArticle = function(req,cb) {
	getData(req,function(data) {
		var articleId = data.id;

		if (!articleId) {
			logger.warn("[updateArticle error] -" + error.articleIdNotProvided.description);
			cb(error.articleIdNotProvided);
			return;
		}

		common.getUserName(req,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			var username = result.name;
			common.getArticle(req,articleId,function(err,result) {
				var article = result;
				var options = {
					filename: "updateArticle.html",
					doctype: "html"
				};
				var locals = {
					title: "后台管理系统-修改文章",
					username : username,
					article : article
				};
				var fn = jade.compileFile("./view/admin/article.jade",options);
				var html = fn(locals);

				cb(null,html);
			});
		});
	});
}
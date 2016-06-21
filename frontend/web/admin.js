var jade = require("jade");
var common = require("./adminCommon").common;
var logger = require("../util/logger").logger;

exports.index = function(req,cb) {
	common.getUserName(req,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var options = {
			filename: "index.html",
			doctype: "html"
		}

		var locals = {
			title: "后台管理系统",
			username : result.name
		}

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

			var articleList = result;

			var options = {
				filename: "articleList.html",
				doctype: "html"
			};

			var locals = {
				title: "后台管理系统",
				username : username,
				articleList : articleList
			}

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
		}

		var locals = {
			title: "后台管理系统",
			username : username
		}

		var fn = jade.compileFile("./view/admin/articleClass.jade",options);
		var html = fn(locals);

		cb(null,html);
	});
}
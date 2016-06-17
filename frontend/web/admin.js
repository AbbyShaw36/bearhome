var jade = require("jade");
var common = require("./adminCommon");

exports.signin = function(req,cb) {
	var html = jade.compileFileClient('../view/admin/signin');

	cb(null,html);
}

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
	getArticles(req,function(err,options) {
		if (err) {
			cb(err);
			return;
		}

		var html = jade.compileFileClient('../view/admin/articleList',{articleList: articles,});
	});
}
var jade = require("jade");

exports.signin = function(req,cb) {
	var html = jade.compileFileClient('../view/admin/signin');

	cb(null,html);
}

exports.index = function(req,cb) {

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
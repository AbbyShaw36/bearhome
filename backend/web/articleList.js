var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var Article = require("../model/article").Article;
var ArticleList = require("../model/articleList").ArticleList;
var service = require("../service/article").service;
var error = require("../errors/article");

/**
 * 删除文章，可同时删除多个
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 * articleArray : 由articleId组成的数组
 * 返回代码：
 * -1 : 请求方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.delete = function(req,cb) {
	// 获取提交数据
	getDataByURL(req,function(data) {
		var articleArray = data.articleArray;

		// 数据是否存在
		if (!articleArray) {
			cb(error.articlesNotProvided);
			return;
		}

		var arr = [];

		// 将数据数组转为文章对象数组
		for (var i = 0; i < articleArray.length; i++) {
			var article = new Article();
			article.setId(articleArray[i]);
			arr.push(article);
		}

		// 执行删除操作
		service.deleteById(arr,cb);
	});
}

/**
 * 修改文章分类，可同时修改多个
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 * articleArray : 由多个id和class组成的文章对象组成的数组
 * 返回代码：
 * -1 : 请求方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.changeClass = function(req,cb) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var articleArray = data.articleArray;

		// 数据是否存在
		if (!articleArray) {
			cb(error.articlesNotProvided);
			return;
		}

		var arr = [];

		// 将数据数组转为文章对象数组
		for (var i = 0; i < articleArray.length; i++) {
			var article = new Article();
			var id = articleArray[i].id;
			var classId = articleArray[i].class;

			if (!id) {
				cb(error.articleIdNotProvided);
				return;
			}

			if (!classId) {
				cb(error.articleClassNotProvided);
				return;
			}

			article.setId(id);
			article.setClass(classId);
		}

		// 执行修改操作
		service.changeClass(arr,cb);
	});
}

/**
 * 获取文章列表
 * @param  {Function} cb callback
 */
exports.getList = function(req,res,cb) {
	getDataByURL(req,function(data) {
		var page = data.page || 1;
		var perpage = data.perpage;
		var articleClass = data.class;

		if (!perpage) {
			cb(error.perPageNotProvided);
			return;
		}

		var articleList = new ArticleList();
		articleList.setPage(page);
		articleList.setPerpage(perpage);
		articleList.setClass(articleClass);

		service.getList(articleList,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,{articles: result});
		});
	});
}
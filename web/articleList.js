var getData = require("../util/getData").post;
var Article = require("../model/article").Article;

/**
 * 删除文章
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 * articleArray : 由articleId组成的数组
 * 返回代码：
 * -1 : 请求方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 */
exports.delete = function(req,res) {
	getData(req,function(data) {
		var articleArray = data.articleArray;
		var arr = [];

		for (var i = 0; i < articleArray.length; i++) {
			var article = new Article();
			article.setId(articleArray[i]);
			arr.push(article);
		}

		service.delete(arr,function(err) {
			if (err) {
				res.end(err.code);
				return;
			}

			res.end("1");
		});
	});
}

/**
 * 修改文章分类
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 * articleArray : 由多个id和class组成的文章对象组成的数组
 * 返回代码：
 * -1 : 请求方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 */
exports.changeClass = function(req,res) {
	getData(req,function(data) {
		var articleArray = data.articleArray;
		var arr = [];

		for (var i = 0; i < articleArray.length; i++) {
			var article = new Article();
			article.setId(articleArray[i].id);
			article.setClass(articleArray[i].class);
		}

		service.changeClass(arr,function(err) {
			if (err) {
				res.end(err.code);
				return;
			}

			res.end("1");
		});
	});
}
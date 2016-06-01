var getData = require("../util/getData").post;
var Article = require("../model/article").Article;
var service = require("../service/article");

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
 *  3 : 提交数据错误
 */
exports.delete = function(req,res) {
	// 获取提交数据
	getData(req,function(data) {
		var articleArray = data.articleArray;

		// 数据是否存在
		if (!articleArray) {
			res.end("3");
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
		service.delete(arr,function(err) {
			// 删除失败
			if (err) {
				res.end(err.code);
				return;
			}

			// 删除成功
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
 *  3 : 提交数据错误
 */
exports.changeClass = function(req,res) {
	// 获取提交数据
	getData(req,function(data) {
		var articleArray = data.articleArray;

		// 数据是否存在
		if (!articleArray) {
			res.end("3");
			return;
		}

		var arr = [];

		// 将数据数组转为文章对象数组
		for (var i = 0; i < articleArray.length; i++) {
			var article = new Article();
			var id = articleArray[i].id;
			var classId = articleArray[i].class;

			if (!id || !classId) {
				res.end("3");
				return;
			}

			article.setId(id);
			article.setClass(classId);
		}

		// 执行修改操作
		service.changeClass(arr,function(err) {
			// 修改成功
			if (err) {
				res.end(err.code);
				return;
			}

			// 修改失败
			res.end("1");
		});
	});
}

/**
 * 获取文章列表
 * @param  {Function} cb callback
 */
exports.get = function(cb) {
	// 执行获取列表操作
	service.get(function(err,result) {
		// 操作失败
		if (err) {
			cb(err);
			return;
		}

		// 操作成功
		cb(null,result);
	});
}
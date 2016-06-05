var service = require("../service/article");
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var Article = require("../model/article").Article;

/**
 * 添加文章
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 *  title  : 标题
 * content : 内容
 *  class  : 分类
 */
exports.create = function(req,res) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var title = data.title;
		var content = data.content || "";
		var classId = data.class;

		// 数据是否存在
		if (!title || !classId) {
			res.end("3");
			return;
		}

		// 创建文章对象
		var article = new Article();
		article.setTitle(title);
		article.setContent(content);
		article.setClass(classId);

		// 执行创建操作
		service.create(article,function(err) {
			// 操作失败
			if (err) {
				res.end("0");
				return;
			}

			// 操作成功
			res.end("1");
		});
	});
}

/**
 * 更新文章
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 *    id   : 文章ID
 *  title  : 标题
 * content : 内容
 *  class  : 分类
 * 返回数据：
 * -1 : 提交方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.update = function(req,res) {
	// 获取提交数据
	getData(req,function(data) {
		var id = data.id;
		var title = data.title;
		var content = data.content || "";
		var classId = data.class;

		// 数据是否存在
		if (!id || !title || !classId) {
			res.end("3");
			return;
		}

		// 创建文章对象
		var article = new Article();
		article.setId(id);
		article.setTitle(title);
		article.setContent(content);
		article.setClass(classId);

		// 执行更新操作
		service.update(article,function(err) {
			// 操作失败
			if (err) {
				res.end("0");
				return;
			}

			// 操作成功
			res.end("1");
		});
	});
}

/**
 * 获取文章
 * @param  {Function} cb callback
 */
exports.get = function(article,cb) {
	// 执行获取操作
	service.getArticle(article,function(err,result) {
		// 操作失败
		if (err) {
			cb(err);
			return;
		}

		// 操作成功
		cb(null,result);
	});
}
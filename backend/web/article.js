var service = require("../service/article").service;
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var Article = require("../model/article").Article;
var arror = require("../errors/article");

/**
 * 添加文章
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 *  title  : 标题
 * content : 内容
 *  class  : 分类
 */
exports.create = function(req,cb) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var title = data.title;
		var content = data.content || "";
		var classId = data.class;

		// 数据是否存在
		if (!title) {
			cb(error.articleTitleNotProvided);
			return;
		}

		if (!classId) {
			cb(error.articleClassNotProvided);
			return;
		}

		// 创建文章对象
		var article = new Article();
		article.setTitle(title);
		article.setContent(content);
		article.setClass(classId);

		// 执行创建操作
		service.create(article,cb);
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
		if (!id) {
			cb(error.articleIdNotProvided);
			return;
		}

		if (!title) {
			cb(error.articleTitleNotProvided);
			return;
		}

		if (!classId) {
			cb(error.articleClassNotProvided);
			return;
		}

		// 创建文章对象
		var article = new Article();
		article.setId(id);
		article.setTitle(title);
		article.setContent(content);
		article.setClass(classId);

		// 执行更新操作
		service.update(article,cb);
	});
}

/**
 * 获取文章
 * @param  {Function} cb callback
 */
exports.get = function(req,cb) {
	getDataByURL(req,function(data) {
		var id = data.id;

		if (!id) {
			cb(error.articleIdNotProvided);
			return;
		}

		var article = new Article();
		article.setId(id);

		service.get(article,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,{article: result[0]});
		});
	});
}
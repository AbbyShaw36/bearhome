var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var ArticleClass = require("../model/articleClass").ArticleClass;
var service = require("../service/articleClass");
var error = require("../errors/articleClass");

/**
 * 添加分类
 * @param {obj} req request
 * @param {obj} res response
 * 提交数据：
 * name : 分类名称
 * 返回数据：
 * -1 : 提交方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.create = function(req,cb) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var name = data.name;

		// 数据是否存在
		if (!name) {
			cb(error.classNameNotProvided);
			return;
		}

		// 创建分类对象
		var articleClass = new ArticleClass();
		articleClass.setName(name);

		// 执行添加操作
		service.create(articleClass,cb);
	});
}

/**
 * 修改分类
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 *  id  : 分类ID
 * name : 分类名称
 * 返回数据：
 * -1 : 提交方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.update = function(req,cb) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var id = data.id;
		var name = data.name;

		// 数据是否存在
		if (!id) {
			cb(error.classIdNotProvided);
			return;
		}

		if (!name) {
			cb(error.classNameNotProvided);
			return;
		}

		// 创建分类对象
		var articleClass = new ArticleClass();
		articleClass.setId(id);
		articleClass.setName(name);

		// 执行修改操作
		service.update(articleClass,cb);
	});
}

/**
 * 删除分类
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 * id : 分类ID
 * 返回数据：
 * -1 : 提交方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.delete = function(req,cb) {
	// 获取提交数据
	getDataByURL(req,function(data) {
		var id = data.id;

		// 数据是否存在
		if (!id) {
			cb(error.classIdNotProvided);
			return;
		}

		// 创建分类对象
		var articleClass = new ArticleClass();
		articleClass.serId(id);

		// 执行删除操作
		service.delete(articleClass,cb);
	});
}

exports.get = function(req,cb) {
	service.get(function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null,{class: result});
	});
}
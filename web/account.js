var sha1 = require("sha1");
var User = require("../model/user").User;
var service = require("../service/account");
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var cookie = require("../util/cookie");
var error = require("../errors/account");

/**
 * 获取用户数
 * @param  {obj} req request
 * @param  {function} cb callback
 */
exports.getCount = function(req,cb) {
	// 执行获取操作
	service.getCount(function(err,result) {
		// 获取失败
		if (err) {
			cb(err);
			return;
		}

		cb(null,{count: result});
	});
}

/**
 * 获取用户信息
 * @param  {obj} req request
 * @param  {function} cb callback
 * 提交数据：
 * id : 用户id
 */
exports.getById = function(req,cb) {
	// 获取提交数据
	getDataByURL(req,function(data) {
		var id = data.id;

		// 执行操作必要信息是否存在
		if (!id) {
			cb(errors.userIdNotProvided);
			return;
		}

		// 创建user对象
		var user = new User();
		user.setId(id);

		// 执行获取操作
		service.getById(user,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,{user: result[0]});
		});
	});
}

/**
 * 获取所有账户
 * @param  {obj} req request
 * @param  {function} cb callback
 */
exports.getAll = function(req,cb) {
	// 执行操作
	service.getAll(function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null,{users: result});
	});
}

/**
 * 登录
 * @param  {[obj]} req [request]
 * @param  {[obj]} res [response]
 * 提交数据：
 * name : 用户名
 *  pw  : 密码
 */
exports.signin = function(req,cb) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!name || !pw) {
			cb(error.nameAndPasswordNotProvided);
			return;
		}

		// 创建user对象
		var user = new User();
		user.setName(name);
		user.setPw(sha1(pw));

		// 执行操作
		service.signin(user,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			// 登录成功
			var cookies = [
				{
					key : "sessionId",
					value : result,
					path : "/",
					httpOnly : true
				}
			];

			cookie.setCookie(res,cookies);
			cb(null,{sessionId: result});
		});
	});
}

/**
 * 退出
 * @param  {[obj]} req [request]
 * @param  {[obj]} res [response]
 * 返回数据：
 * -1 : 请求方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 */
exports.signout = function(req,cb) {
	getDataByURL(req,function(data) {
		var id = data.id;

		if (!id) {
			cb(error.userIdNotProvided);
			return;
		}

		var user = new User();
		user.setId(id);

		// 执行操作
		service.signout(user,cb);
	});
}

/**
 * 注册
 * @param  {[obj]} req [request]
 * @param  {[obj]} res [rsponse]
 * 提交数据：
 * name : 用户名
 *  pw  : 密码
 * 返回数据：
 * -1 : 请求方式错误
 *  0 : 失败
 *  1 : 成功
 *  2 : 未登录
 *  3 : 提交数据错误
 */
exports.signup = function(req,cb) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var name = data.name;
		var pw = data.pw;
		var isAdmin = data.isAdmin || false;

		// 数据是否存在
		if (!name || !pw) {
			cb(error.nameAndPasswordNotProvided);
			return;
		}

		var user = new User();
		user.setName(name);
		user.setPw(pw);
		user.setIsAdmin(isAdmin);

		// 执行操作
		service.signup(user,cb);
	});
}

/**
 * 修改
 * @param  {[obj]} req [request]
 * @param  {[obj]} res [response]
 * 提交数据：
 * name : 用户名
 *  pw  : 密码
 * 返回数据：
 * -1 : 请求方式错误
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
		var pw = data.pw;
		var isAdmin = data.isAdmin || false;

		// 数据是否存在
		if (!id) {
			cb(error.userIdNotProvided);
			return;
		}

		user.setId(id);
		user.setName(name);
		user.setPw(pw);
		user.setIsAdmin(isAdmin);

		// 执行操作
		service.update(user,function(err) {
			// 修改失败
			if (err) {
				res.end(err.code);
				return;
			}

			// 修改成功
			res.end("1");
		});
	});
}

exports.delete = function(req,res) {
	getData(req,function(data) {

	})
}
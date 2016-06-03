var sha1 = require("sha1");
var User = require("../model/user").User;
var service = require("../service/account");
var getData = require("../util/getData");
var getDataByBody = getData.byBody;
var getDataByURL = getData.byURL;
var cookie = require("../util/cookie");
var resErr = require("../util/resErr").ResErr;
var endString = "";

/**
 * 获取用户数
 * @param  {obj} req request
 * @param  {obj} res response
 */
exports.getCount = function(req,res) {
	// 执行获取操作
	service.getCount(function(err,result) {
		// 获取失败
		if (err) {
			res.statusCode = 500;
			res.end();
			return;
		}

		// 获取成功
		endString = JSON.stringify({
			count: result
		});

		res.statusCode = 200;
		res.end(endString);
	});
}

/**
 * 获取用户信息
 * @param  {obj} req request
 * @param  {obj} res response
 * 提交数据：
 * id : 用户id
 */
exports.getUserById = function(req,res) {
	// 获取提交数据
	getDataByURL(req,function(data) {
		var id = data.id;

		// 执行操作必要信息是否存在
		if (!id) {
			resErr["400"](res);
			return;
		}

		// 创建user对象
		var user = new User();
		user.setId(id);

		// 执行获取操作
		service.getUserById(user,function(err,result) {
			// 操作失败
			if (err) {
				res.statusCode = 500;
				res.end();
				return;
			}

			// 查询用户不存在
			if (result.length === 0) {
				resErr["404"](res);
				return;
			}

			// 查询成功
			endString = JSON.stringify({
				user: result[0]
			});

			res.statusCode = 200;
			res.end(endString);
		});
	});
}

/**
 * 获取所有账户
 * @param  {obj} req request
 * @param  {obj} res response
 */
exports.getAll = function(req,res) {
	// 执行操作
	service.getAll(function(err,result) {
		// 操作失败
		if (err) {
			res.statusCode = 500;
			res.end();
			return;
		}

		// 查询结果为空
		if (result.length === 0) {
			resErr["404"](res);
			return;
		}

		// 查询成功
		endString = JSON.stringify({
			users: result
		});

		res.statusCode = 200;
		res.end(endString);
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
exports.signin = function(req,res) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!name || !pw) {
			resErr["400"](res);
			return;
		}

		// 创建user对象
		var user = new User();
		user.setName(name);
		user.setPw(sha1(pw));

		// 执行操作
		service.signin(user,function(err) {
			// 登录失败
			if (err) {
				res.statusCode = 500;
				res.end();
				return;
			}

			var id = user.getSessionId();

			// 用户不存在
			if (!id) {
				resErr["400"](res);
				return;
			}

			// 登录成功
			var cookies = [
				{
					key : "sessionId",
					value : id,
					path : "/",
					httpOnly : true
				}
			];

			cookie.setCookie(res,cookies);
			res.statusCode = 200;
			res.end();
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
exports.signout = function(req,res) {
	getDataByURL(req,function(data) {
		var id = data.id;

		if (!id) {
			resErr["400"](res);
			return;
		}

		// 执行操作
		service.signout(user,function(err) {
			// 退出失败
			if (err) {
				res.statusCode = 500;
				res.end();
				return;
			}

			// 退出成功
			res.statusCode = 200;
			res.end();
		});
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
exports.signup = function(req,res) {
	// 获取提交数据
	getDataByBody(req,function(data) {
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!name || !pw) {
			resErr["400"](res);
			return;
		}

		var user = new User();
		user.setName(name);
		user.setPw(pw);

		// 执行操作
		service.signup(user,function(err) {
			// 注册失败
			if (err) {
				res.statusCode = 500;
				res.end();
				return;
			}

			// 注册成功
			res.statusCode = 200;
			res.end();
		});
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
exports.update = function(req,res) {
	// 获取提交数据
	getData(req,function(data) {
		var id = data.id;
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!id || !name || !pw) {
			res.end("3");
			return;
		}

		user.setId(id);
		user.setName(name);
		user.setPw(pw);

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
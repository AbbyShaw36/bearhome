var sha1 = require("sha1");
var User = require("../model/user").User;
var service = require("../service/account");
var getData = require("../util/getData").post;
var cookie = require("../util/cookie");

/**
 * 登录
 * @param  {[obj]} req [request]
 * @param  {[obj]} res [response]
 * 提交数据：
 * name : 用户名
 *  pw  : 密码
 * 返回代码：
 * -1 : 请求方式错误;
 *  0 : 请求失败;
 *  1 : 请求成功;
 *  2 : 该用户已登录;
 *  3 : 提交数据错误
 *  4 : 用户名或密码错误;
 */
exports.signin = function(req,res) {
	// 获取提交数据
	getData(req,function(data) {
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!name || !pw) {
			res.end("4");
			return;
		}

		user.setName(name);
		user.setPw(sha1(pw));

		// 执行操作
		service.signin(user,function(err) {
			// 登录失败
			if (err) {
				res.end(err.code);
				return;
			}

			// 登录成功
			var cookies = [
				{
					key : "sessionId",
					value : user.getSessionId(),
					path : "/",
					httpOnly : true
				}
			];

			cookie.setCookie(res,cookies);
			res.end("1");
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
	// 执行操作
	service.signout(user,function(err) {
		// 退出失败
		if (err) {
			res.end(err.code);
			return;
		}

		// 退出成功
		res.end("1");
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
	getData(req,function(data) {
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!name || !pw) {
			res.end("3");
			return;
		}

		user.setName(name);
		user.setPw(pw);

		// 执行操作
		service.signup(user,function(err) {
			// 注册失败
			if (err) {
				res.end(err.code);
				return;
			}

			// 注册成功
			res.end("1");
		});
	});
}

/**
 * 修改密码
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
exports.changePw = function(req,res) {
	// 获取提交数据
	getData(req,function(data) {
		var name = data.name;
		var pw = data.pw;

		// 数据是否存在
		if (!name || !pw) {
			res.end("3");
			return;
		}

		user.setName(name);
		user.setPw(pw);

		// 执行操作
		service.chagnePw(user,function(err) {
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
var sha1 = require("sha1");
var User = require("../model/user").User;
var service = require("../service/account");
var getData = require("../util/getData").get;
var cookie = require("../util/cookie");
var checkMethod = require("../util/checkMethod");

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
 *  2 : 用户名或密码错误;
 */
exports.signin = function(req,res) {
	if (!checkMethod.post(req,res)) {
		return;
	}

	// 获取提交数据
	getData(req,function(data) {
		// 创建user对象
		var user = new User();
		user.setName(data.name);
		user.setPw(sha1(data.pw));

		// 执行登录操作
		service.signin(user,function(err,result) {
			// 登录失败
			if (err) {
				res.end(err.code);
				return;
			}

			// 登录成功
			var cookies = [
				{
					key : "userId",
					value : user.getId(),
					path : "/",
					httpOnly : true
				},
				{
					key : "isLogin",
					value : "true",
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
 * 提交数据：
 * userId : 用户id
 */
exports.signout = function(req,res) {
	if (!checkMethod.post(req,res)) {
		return;
	}

	// 获取提交数据
	getData(req,function(data) {
		var id = data.userId;


	});
}

// 注册
// 修改密码
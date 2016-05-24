var signin = require("./signin").signin;
var serveStatic = require("../util/send").serveStatic;
var userService = require("../service/user").user;

exports.handler = {
	// 请求登录页
	login : function(req,res) {
		// 已登录
		if (signin.isSignin()) {
			// 跳转到首页
			res.writeHead(302,{
				"Location" : "/admin"
			});
			res.end();
			return;
		}
		
		// 未登录，返回登陆页面
		signin.sendSigninFile(res);
	},
	// 请求后台首页
	admin : function(req,res) {
		signin.checkSignin();

		// 已登录，返回后台首页
		serveStatic(res,"view/admin/index.html");
	},
	// 登录操作
	signin : function(req,res) {
		// 必须用post提交
		if (req.method !== "POST") {
			res.end("Err: submit wrong way!");
			return;
		}

		userService.signin(user,function(err,result) {
			// 登录失败
			if (err) {
				res.end(err.code);
				return;
			}

			// 登录成功
		});
	}
}


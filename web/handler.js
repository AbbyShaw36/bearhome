var signin = require("./signin").signin;

var handler = {
	signin : function(req,res) {
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
}


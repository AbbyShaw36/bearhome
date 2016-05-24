var cookie = require("../util/cookie");
var serveStatic = require("../util/send").serveStatic;

var signin = {
	isSignin : function(req) {
		var isLogin = cookie.getCookie(req,"isLogin");

		if (isLogin === "true") {
			return true;
		} else if (isLogin === "false") {
			return false;
		}
	},
	checkSignin : function(req,res) {
		// 未登录
		if (!this.isSignin(req)) {
			// 跳转到登录页面
			res.writeHead(302,{
				"Location" : "/admin/signin"
			});
			res.end();
			return;
		}
	},
	sendSigninFile : function(res) {
		serveStatic(res,"view/admin/login.html");
	}
}
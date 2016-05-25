var signin = require("./signin").signin;
var serveStatic = require("../util/send").serveStatic;

// 登录页
exports.login = function(req,res) {
	if (path === "login") {
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
	}
}

// 后台主页
exports.index = function(req,res) {
	signin.checkSignin();

	// 已登录
	serveStatic(res,"view/admin/index.html");
}

// 文章列表
exports.articleList = function(req,res) {
	signin.checkSignin();

	// 已登录
	serveStatic(res,"view/admin/articleList.html");
}

// 文章添加
exports.createArticle = function(req,res) {

}

// 文章修改
exports.updateArticle = function(req,res) {

}

// 相册列表


// 图片列表
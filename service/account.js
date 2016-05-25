var dao = require("../dao/user");

exports.signin = function(user,cb) {
	dao.getUerByName(user.getName(),user.getPw(),function(err,result) {
		// 查询失败
		if (err) {
			cb(err);
			return;
		}

		// 没有匹配项，即用户名或密码错误
		if (result.length === 0) {
			cb({code:2});
			return;
		}

		user.setId(result.insertId);
		cb(null,result);
	});
}
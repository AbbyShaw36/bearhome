var articleDao = require("../dao/article");
var error = require("../errors/article");

exports.deleteById = function(articleArr,cb) {
	for (var i = 0; i < articleArr.length; i++) {
		var id = articleArr[i].getId();
		articleDao.deleteById(id,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			if (result.length === 0) {
				cb(error.articleNotExists);
				return;
			}
		});
	}

	cb(null);
}

exports.deleteByClass = function(articleClass,cb) {
	articleDao.deleteByClass(articleClass,cb);
}

exports.changeClass = function(articleArr,cb) {
	for (var i = 0; i < articleArr.length; i++) {
		var article = articleArr[i];
		articleDao.changeClass(article,function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			if (result.length === 0) {
				cb(error.articleNotExists);
				return;
			}
		});
	}

	cb(null);
}

exports.getList = function(articleList,cb) {
	articleDao.getList(articleList,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.articleNotExists;
		}

		cb(retErr,result);
	});
}

exports.create = function(article,cb) {
	articleDao.create(article,cb);
}

exports.update = function(article,cb) {
	articleDao.update(article,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.articleNotExists;
		}

		cb(retErr,result);
	});
}

exports.get = function(article,cb) {
	articleDao.get(article,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.articleNotExists;
		}

		cb(retErr,result);
	});
}
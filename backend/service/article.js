var articleDao = require("../dao/article").dao;
var error = require("../errors/article");
var logger = require("../util/logger").logger;
var service = {};

exports.service = service;

service.deleteById = function(articleArr,cb) {
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

service.deleteByClass = function(articleClass,cb) {
	articleDao.deleteByClass(articleClass,cb);
}

service.changeClass = function(articleArr,cb) {
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

service.getList = function(articleList,cb) {
	articleDao.getList(articleList,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			logger.warn("[update article error] - " + error.articleNotExists.discription);
			retErr = error.articleNotExists;
		}

		cb(retErr,result);
	});
}

service.create = function(article,cb) {
	articleDao.create(article,cb);
}

service.update = function(article,cb) {
	articleDao.update(article,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			logger.warn("[update article error] - " + error.articleNotExists.discription);
			retErr = error.articleNotExists;
		}

		cb(retErr,result);
	});
}

service.get = function(article,cb) {
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
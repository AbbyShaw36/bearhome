var articleClassDao = require("../dao/articleClass");
var articleService = require("./article");
var error = require("../errors/articleClass");

exports.create = function(articleClass,cb) {
	articleClassDao.create(articleClass,cb);
}

exports.update = function(articleClass,cb) {
	articleClassDao.update(articleClass,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.classNotExists;
		}

		cb(retErr,result);
	});
}

exports.delete = function(articleClass,cb) {
	articleClassDao.delete(articleClass,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			cb(error.classNotExists);
			return;
		}

		articleService.deleteByClass(articleClass,cb);
	});
}

exports.get = function(cb) {
	articleClassDao.get(function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			retErr = error.classNotExists;
		}

		cb(retErr,result);
	});
}
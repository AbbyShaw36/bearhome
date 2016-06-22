var articleClassDao = require("../dao/articleClass").dao;
var articleService = require("./article").service;
var error = require("../errors/articleClass");
var logger = require("../util/logger").logger;
var service = {};

exports.service = service

service.create = function(articleClass,cb) {
	articleClassDao.create(articleClass,cb);
}

service.update = function(articleClass,cb) {
	articleClassDao.update(articleClass,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = err;
		} else if (result.length === 0) {
			logger.warn("[Update class error] - class not exists");
			retErr = error.classNotExists;
		}

		cb(retErr,result);
	});
}

service.delete = function(articleClass,cb) {
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

service.get = function(cb) {
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
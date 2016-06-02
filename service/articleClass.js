var articleClassDao = require("../dao/articleClass");

exports.create = function(articleClass,cb) {
	articleClassDao.create(articleClass,cb);
}

exports.update = function(articleClass,cb) {
	articleClassDao.update(articleClass,cb);
}

exports.delete = function(articleClass,cb) {
	articleClassDao.delete(articleClass,cb);
}

exports.get = function(conditions,cb) {
	articleClassDao.get(conditions,cb);
}
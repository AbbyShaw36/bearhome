var ArticleClass = require("./model").ArticleClass;

exports.create = function(articleClass,cb) {
	var name = articleClass.getName();
	var articleClass = new ArticleClass({name: name});

	articleClass.save(cb);
}

exports.update = function(articleClass,cb) {
	var id = articleClass.getId();
	var name = articleClass.getName();

	ArticleClass.update({_id: id},{name: name},cb);
}

exports.delete = function(articleClass,cb) {
	var id = articleClass.getId();

	ArticleClass.remove({_id: id},cb);
}

exports.get = function(conditions,cb) {
	ArticleClass.find(conditions,cb);
}
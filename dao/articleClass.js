var ArticleClass = require("./model").ArticleClass;

exports.create = function(articleClass,cb) {
	var name = articleClass.getName();
	var articleClass = new ArticleClass({name: name});

	articleClass.save(function(err,result) {
		if (err) {
			console.log("[Save article class err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.update = function(articleClass,cb) {
	var id = articleClass.getId();
	var name = articleClass.getName();

	ArticleClass.update({_id: id},{name: name},function(err,result) {
		if (err) {
			console.log("[Update article class err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.delete = function(articleClass,cb) {
	var id = articleClass.getId();

	ArticleClass.remove({_id: id},function(err,result) {
		if (err) {
			console.log("[Remove article class err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.get = function(cb) {
	ArticleClass.find({},function(err,result) {
		if (err) {
			console.log("[Find article class err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}
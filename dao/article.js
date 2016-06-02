var Article = require("./model");

exports.delete = function(arr,cb) {
	Article.remove({_id: {$in: arr}},cb);
}

exports.changeClass = function(arr,cb) {
	arr.forEach(function(obj) {
		Article.update({id: obj.id},{$set: {class: obj.class}},function(err) {
			if (err) {
				cb(err);
				return;
			}
		});
	});

	cb(null);
}

exports.getArticleList = function(articleList,cb) {
	var page = articleList.getPage();
	var limit = articleList.getLimit();
	var conditions = articleList.getConditions();

	Article.find(conditions,null,{skip: (page-1) * limit, limit : limit},cb);
}

exports.count = function(conditions,cb) {
	Article.count(conditions,cb);
}

exports.create = function(article,cb) {
	var title = article.getTitle();
	var className = article.getClass();
	var content = article.getContent();

	var article = new Article({
		title: title,
		class: className,
		content: content,
		publishTime: new Date()
	});

	article.save(cb);
}

exports.update = function(article,cb) {
	var id = article.getId();
	var title = article.getTitle();
	var className = article.getClass();
	var content = article.getContent();

	Article.update({_id : id},{title: title, class: className, content: content},cb);
}

exports.getAritcle = function(article,cb) {
	var conditions = article.getConditions();

	Article.find(conditions,cb);
}
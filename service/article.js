var articleDao = require("../dao/article");

exports.delete = function(articleArr,cb) {
	var arr = [];

	for (var i = 0; i < articleArr.length; i++) {
		var id = articleArr[i].getId();
		arr.push(id);
	}

	articleDao.delete(arr,cb);
}

exports.changeClass = function(articleArr,cb) {
	var arr = [];

	for (var i = 0; i < articleArr.length; i++) {
		var article = articleArr[i];
		arr.push({
			id: article.getId(),
			class : article.getClass()
		});
	}

	articleDao.changeClass(arr,cb);
}

exports.getArticleList = function(articleList,cb) {
	articleDao.count(articleList.getConditions(),function(err,count) {
		if (err) {
			cb(err);
			return;
		}

		if (count === 0) {
			cb(null,{
				articles : [],
				count : count
			});
			return;
		}

		articleList.setCount(count);

		articleDao.get(articleList,function(err,articles){
			if (err) {
				cb(err);
				return;
			}

			cb(null,{
				articles: articles,
				count: count
			});
		});
	});
}

exports.create = function(article,cb) {
	articleDao.create(article,cb);
}

exports.update = function(article,cb) {
	articleDao.update(article,cb);
}

exports.getArticle = function(article,cb) {
	articleDao.getArticle(article,cb);
}
var Article = require("./model");

exports.count = function(conditions,cb) {
	Article.count(conditions,function(err,result) {
		if (err) {
			console.log("[Count article err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.create = function(article,cb) {
	var title = article.getTitle();
	var className = article.getClass();
	var content = article.getContent();
	var imgPath = article.getImgPath();

	var article = new Article({
		title: title,
		class: className,
		content: content,
		publishTime: new Date(),
		imgPath: imgPath
	});

	article.save(function(err,result) {
		if (err) {
			console.log("[Save article err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.delete = function(arr,cb) {
	Article.remove({_id: {$in: arr}},function(err,result) {
		if (err) {
			console.log("[Remove article err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.get = function(article,cb) {
	var id = article.getId();

	Article.find({_id: id},function(err,result) {
		if (err) {
			console.log("[Find article err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.getList = function(articleList,cb) {
	var page = articleList.getPage();
	var limit = articleList.getLimit();
	var conditions = articleList.getConditions();

	Article.find(conditions,null,{skip: (page-1) * limit, limit : limit},function(err,result) {
		if (err) {
			console.log("[Find articles err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}

exports.changeClass = function(arr,cb) {
	var resultArr = [];

	arr.forEach(function(obj) {
		Article.update({id: obj.id},{$set: {class: obj.class}},function(err,result) {
			if (err) {
				console.log("[Update article err] - " + err.message);
				cb({type: "serviceError"});
				return;
			}
			
			resultArr.push(result);
		});
	});

	cb(err,resultArr);
}

exports.update = function(article,cb) {
	var id = article.getId();
	var title = article.getTitle();
	var className = article.getClass();
	var content = article.getContent();

	Article.update({_id : id},{title: title, class: className, content: content},function(err,result) {
		if (err) {
			console.log("[Update article err] - " + err.message);
			cb({type: "serviceError"});
			return;
		}

		cb(err,result);
	});
}
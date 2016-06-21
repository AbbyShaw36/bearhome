var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var logger = require("../util/logger").logger;
var dao = {};

exports.dao = dao;

dao.create = function(article,cb) {
	var title = article.getTitle();
	var classId = article.getClass();
	var content = article.getContent();
	var publishTime = new Date();
	var queryText = util.format("INSERT INTO article(title,class,content,publishTime) VALUES(%s,%d,%s,%d)",title,classId,content,publishTime);
	
	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[INSERT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.deleteById = function(id,cb) {
	var queryText = "DELETE FROM article WHERE id = " + id;

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[DELETE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.deleteByClass = function(articleClass,cb) {
	var classId = articleClass.getId();
	var queryText = "DELETE FROM article WHERE class = " + classId;

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[DELETE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(err);
	});
}

dao.get = function(article,cb) {
	var id = article.getId();
	var queryText = "SELECT * FROM article WHERE id = " + id;
	
	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[SELECT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(err,result);
	});
}

dao.getList = function(articleList,cb) {
	var page = articleList.getPage();
	var perPage = articleList.getPerpage();
	var articleClass = articleList.getClass();
	var queryText = "SELECT * FROM article";

	if (articleClass) {
		queryText += " WHERE class = '" + articleClass + "'";
	}

	connection.query(queryText,function(err,result) {
		if (err) {
			console.log(err);
			cb(commonErr.internalServerErr);
			return;
		}

		if (result.length === 0) {
			cb(commonErr.resourceNotFound);
			return;
		}
	});

	queryText += " ORDER BY publishTime DESC LIMIT " + (page - 1) * perPage + "," + page * perPage;

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.changeClass = function(article,cb) {
	var id = article.getId();
	var className = article.getClass();
	var queryText = util.format("UPDATE article SET className = %d WHERE id = %d",className,id);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[UPDATE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(err,result);
	});
}

dao.update = function(article,cb) {
	var id = article.getId();
	var title = article.getTitle();
	var classId = article.getClass();
	var content = article.getContent();
	var publishTime = new Date();
	var queryText = util.format("UPDATE article SET title = %s, class = %d, content = %s, publishTime = %s WHERE id = %d",title,classId,content,publishTime,id);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[UPDATE ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(err,result);
	});
}
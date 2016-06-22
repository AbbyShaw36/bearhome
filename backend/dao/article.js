var mysql = require("mysql");
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var logger = require("../util/logger").logger;
var dao = {};

exports.dao = dao;

dao.create = function(article,cb) {
	var title = article.getTitle();
	var classId = article.getClass();
	var content = article.getContent();
	var publishTime = new Date().getTime();
	console.log(publishTime);
	var sql = "INSERT INTO article(title,classId,content,publishTime) VALUES(?,?,?,?)";
	var inserts = [title,classId,content,publishTime];
	sql = mysql.format(sql,inserts);
	
	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[INSERT ERR] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.deleteById = function(article,cb) {
	var id = article.getId();
	var sql = "DELETE FROM article WHERE id = ?";
	var inserts = [id];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[delete article by ID error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.deleteByClass = function(articleClass,cb) {
	var classId = articleClass.getId();
	var sql = "DELETE FROM article WHERE classId = ?";
	var inserts = [classId];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[delete article by class err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.get = function(article,cb) {
	var id = article.getId();
	var sql = "SELECT * FROM article,articleClass WHERE article.classId = articleClass.classId AND id = ?";
	var inserts = [id];
	sql = mysql.format(sql,inserts);
	
	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			console.log("[get article err] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(err,result);
	});
}

dao.getList = function(articleList,cb) {
	var page = articleList.getPage();
	var perPage = articleList.getPerpage();
	var articleClass = articleList.getClass();
	var title = articleList.getTitle();
	var queryText = "SELECT * FROM article,articleClass WHERE article.classId = articleClass.classId";
	var inserts = [];

	if (articleClass) {
		queryText += " AND article.classId = ?";
		inserts.push(articleClass);
	}

	if (title) {
		queryText += " AND title = ?";
		inserts.push(title);
	}

	var sql = mysql.format(queryText,inserts);

	connection.query(sql,function(err,result) {
		if (err) {
			logger.warn("[get aritcle list err] - " + err.message);
			cb(commonErr.internalServerErr);
			return;
		}

		if (result.length === 0) {
			logger.warn("[get article list err] - No matching results");
			cb(commonErr.resourceNotFound);
			return;
		}
	});

	queryText += " ORDER BY publishTime DESC LIMIT ?,?";
	inserts.push((page - 1) * perPage);
	inserts.push(page * perPage);
	sql = mysql.format(queryText,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[get article llist err] - " + err.message);
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
	var publishTime = new Date().getTime();
	var sql = "UPDATE article SET title = ?, classId = ?, content = ?, publishTime = ? WHERE id = ?";
	var inserts = [title,classId,content,publishTime,id];
	sql = mysql.format(sql,inserts);

	connection.query(sql,function(err,result) {
		var retErr = null;

		if (err) {
			logger.warn("[update article error] - " + err.message);
			retErr = commonErr.internalServerErr;
		}

		cb(err,result);
	});
}
var connection = require("./mysql").connection;
var commonErr = require("../errors/common");
var dao = {};

dao.get = function(cb) {
	var queryText = "SELECT * FROM gallery";

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.create = function(gallery,cb) {
	var name = gallery.getName();
	var queryText = "INSERT INTO gallery(name) VALUES('" + name + "')";

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.update = function(gallery,cb) {
	var id = gallery.getId();
	var name = gallery.getName();
	var queryText = util.format("UPDATE gallery SET name = '%s' WHERE id = %d",name,id);

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}

dao.delete = function(gallery,cb) {
	var id = gallery.getId();
	var queryText = "DELETE FROM gallery WHERE id = " + id;

	connection.query(queryText,function(err,result) {
		var retErr = null;

		if (err) {
			retErr = commonErr.internalServerErr;
		}

		cb(retErr,result);
	});
}
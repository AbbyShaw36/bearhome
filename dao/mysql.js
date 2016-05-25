var mysql = require("mysql");
var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	datebase : "webqq"
});

connection.connect();
connection.query("USE webqq");

exports.query = function(queryText,cb) {
	connection.query(queryText,function(err,result) {
		if (err) {
			console.log("[QUERY ERROR] - :" + err.message);
			cb({code : "0"});
			return;
		}

		cb(null,result);
	});
}
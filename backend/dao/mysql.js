var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bearhome"
});

connection.connect();

exports.connection = connection;
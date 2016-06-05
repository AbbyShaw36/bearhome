var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	user: "",
	password: "",
	database: "bearhome"
});

connection.connect();

exports.connection = connection;
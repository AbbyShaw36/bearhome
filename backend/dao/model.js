var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
	userId : Number
});

exports.Session = mongoose.model("Session",SessionSchema);
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
	isSignedIn : { type: Boolean, require: true }
});

exports.Session = mongoose.model("Session",SessionSchema);
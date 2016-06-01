var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name : { type: String, unique: true, require: true },
	password : { type: String, require: true }
});

var ArticleSchema = new Schema({
	title : { type: String, require: true },
	class : { type: Schema.Types.ObejctId, ref: "ArticleClass", require: true },
	content : String,
	publishTime : { type: Number, require: true }
});

var ArticleClassSchema = new Schema({
	name : { type: String, require: true }
});

var SessionSchema = new Schema({
	isSignedIn : { type: Boolean, require: true }
});

exports.Account = mongoose.model("Account",AccountSchema);
exports.Article = mongoose.model("Article",ArticleSchema);
exports.ArticleClass = mongoose.model("ArticleClass",ArticleClassSchema);
exports.Session = mongoose.model("Session",SessionSchema);
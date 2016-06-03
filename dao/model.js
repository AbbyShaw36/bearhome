var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	name: { type: String, unique: true, require: true },
	password: { type: String, require: true },
	isAdmin: { type: String, require: true }
});

var ArticleSchema = new Schema({
	title: { type: String, require: true },
	class: { type: Schema.Types.ObejctId, ref: "ArticleClass", require: true },
	content: String,
	imgPath: String,
	publishTime: { type: Number, require: true }
});

var ArticleClassSchema = new Schema({
	name: { type: String, require: true }
});

var GallerySchema = new Schema({
	name: { type: String, unique: true, require: true },
	coverPath: { type: String, require: true},
	coverFile: { type: String, require: true }
});

var ImagesSchema = new Schema({
	gallery: { type: Schema.Types.ObejctId, ref: "Gallery", require: true },
	imgPath: { type: String, require: true},
	imgFile: { type: String, require: true }
});

var SessionSchema = new Schema({
	isSignedIn : { type: Boolean, require: true }
});

exports.Account = mongoose.model("Account",AccountSchema);
exports.Article = mongoose.model("Article",ArticleSchema);
exports.ArticleClass = mongoose.model("ArticleClass",ArticleClassSchema);
exports.gallery = mongoose.model("Gallery",GallerySchema);
exports.Images = mongoose.model("Images",ImagesSchema);
exports.Session = mongoose.model("Session",SessionSchema);
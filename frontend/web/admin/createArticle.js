var jade = require("jade");

function file(req,cb) {
	var html = jade.compileFileClient('../view/admin/article');
	cb(null,html);
}
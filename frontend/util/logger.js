var log4js = require("log4js");
var log4js_extend = require("log4js-extend");

log4js_extend(log4js,{
	format: "(@file:@line:@column)"
});

exports.logger = log4js.getLogger();
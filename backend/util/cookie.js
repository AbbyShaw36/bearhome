var logger = require("./logger").logger;

exports.setCookie = function(res,cookies) {
	var cookieArray = [];

	for (var i = 0; i < cookies.length; i++) {
		var text = "";

		text += cookies[i].key + "=" + cookies[i].value + "; ";

		// path
		if (cookies[i].path) {
			text += "Path=" + cookies[i].path + "; ";
		}

		// expires
		if (cookies[i].exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (cookies[i].exdays*24*60*60*1000));
			var expires = d.toUTCString();
			text += "expires=" + expires + "; ";
		}

		// maxAge
		if (cookies[i].maxAge) {
			text += "Max-Age=" + cookies[i].maxAge + "; ";
		}

		// domain
		if (cookies[i].domain) {
			text += "Domain=" + cookies[i].domain + "; ";
		}

		// httpOnly
		if (cookies[i].httpOnly) {
			text += "HttpOnly; ";
		}

		cookieArray.push(text);
	}
	
	res.setHeader("Set-Cookie" , cookieArray);

	logger.trace("Set cookie : " + cookieArray);
}

exports.getCookies = function(req) {
	var Cookies = {};

	req.headers.cookie && req.headers.cookie.split(';').forEach(function(cookie) {
	    var parts = cookie.split('=');
	    Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});

	return Cookies;
}

exports.getCookie = function(req,key) {
	var cookies = this.getCookies(req);
	return cookies[key] || null;
}
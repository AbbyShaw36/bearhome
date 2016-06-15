function getCookies(req) {
	var Cookies = {};

	req.headers.cookie && req.headers.cookie.split(';').forEach(function(cookie) {
	    var parts = cookie.split('=');
	    Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});

	return Cookies;
}

exports.getCookie = function(req,key) {
	var cookies = getCookies(req);
	return cookies[key] || null;
}
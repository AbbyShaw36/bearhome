exports.post = function(req,res) {
	if (req.method !== "POST") {
		res.end("-1");
		return false;
	}
	return true;
}
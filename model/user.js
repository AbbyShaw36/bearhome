function User() {}

User.prototype.setName = function(name) {
	this.name = name;
}

User.prototype.getName = function() {
	return this.name;
}

User.prototype.setPw = function(pw) {
	this.pw = pw;
}

User.prototype.getPw = function() {
	return this.pw;
}

User.prototype.setId = function(id) {
	this.id = id;
}

User.prototype.getId = function() {
	return this.id;
}

User.prototype.setSessionId = function(sessionId) {
	this.sessionId = sessionId;
}

User.prototype.getSessionId = function() {
	return this.sessionId;
}

exports.User = User;
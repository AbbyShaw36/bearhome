function User(name,password) {
	this.name = name;
	this.password = password;
}

User.prototype.getName = function() {
	return this.name;
}

exports.user = User;
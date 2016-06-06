function User() {}

exports.User = User;

User.prototype.setId = function(id) { this.id = id; };
User.prototype.getId = function() { return this.id; };

User.prototype.setName = function(name) { this.name = name; };
User.prototype.getName = function() { return this.name; };

User.prototype.setPw = function(pw) { this.pw = pw; };
User.prototype.getPw = function() { return this.pw; };

User.prototype.setIsAdmin = function(isAdmin) { this.isAdmin = isAdmin; };
User.prototype.getIsAdmin = function() { return this.isAdmin; };
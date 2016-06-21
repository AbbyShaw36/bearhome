var ArticleClass = function() {}

exports.ArticleClass = ArticleClass;

ArticleClass.prototype.setId = function(id) { this.id = id; }
ArticleClass.prototype.getId = function() { return this.id; }

ArticleClass.prototype.setName = function(name) { this.name = name; }
ArticleClass.prototype.getName = function() { return this.name; }
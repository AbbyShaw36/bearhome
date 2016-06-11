exports.Article = function() {}

Article.prototype.setId = function(id) { this.id = id; }
Article.prototype.getId = function() { return this.id; }

Article.prototype.setClass = function(classId) { this.class = classId; }
Article.prototype.getClass = function() { return this.class; }

Article.prototype.setTitle = function(title) { this.title = title; }
Article.prototype.getTitle = function() { return this.title; }

Article.prototype.setContent = function(content) { this.content = content; }
Article.prototype.getContent = function() { return this.content; }
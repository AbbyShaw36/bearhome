var ArticleList = function() {};

exports.ArticleList = ArticleList;

ArticleList.prototype.setPage = function(page) { this.page = page; }
ArticleList.prototype.getPage = function() { return this.page; }

ArticleList.prototype.setPerpage = function(perpage) { this.perpage = perpage; }
ArticleList.prototype.getPerpage = function() { return this.perpage; }

ArticleList.prototype.setClass = function(className) { this.class = className; }
ArticleList.prototype.getClass = function() { return this.class; }

ArticleList.prototype.setTitle = function(title) { this.title = title; }
ArticleList.prototype.getTitle = function(title) { return this.title; }
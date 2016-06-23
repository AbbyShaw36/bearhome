function Gallery() {}

exports.Gallery = Gallery;

Gallery.prototype.setName = function(name) { this.name = name; }
Gallery.prototype.getName = function() { return this.name; }

Gallery.prototype.setId = function(id) { this.id = id; }
Gallery.prototype.getId = function() { return this.id; }

Gallery.prototype.setGalleryPath = function(path) { this.galleryPath = path; }
Gallery.prototype.getGalleryPath = function() { return this.galleryPath; }

Gallery.prototype.setCoverPath = function(path) { this.coverPath = path; }
Gallery.prototype.getCoverPath = function() { return this.coverPath; }

Gallery.prototype.setCoverFile = function(fileName) { this.coverFile = fileName; }
Gallery.prototype.getCoverFile = function() { return this.coverFile; }
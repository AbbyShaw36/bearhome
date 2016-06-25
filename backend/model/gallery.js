function Gallery() {}

exports.Gallery = Gallery;

Gallery.prototype.setName = function(name) { this.name = name; }
Gallery.prototype.getName = function() { return this.name; }

Gallery.prototype.setId = function(id) { this.id = id; }
Gallery.prototype.getId = function() { return this.id; }

Gallery.prototype.setGalleryPath = function(path) { this.galleryPath = path; }
Gallery.prototype.getGalleryPath = function() { return this.galleryPath; }

Gallery.prototype.setCover = function(path) { this.cover = path; }
Gallery.prototype.getCover = function() { return this.cover; }
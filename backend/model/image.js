function Image() {}

exports.Image = Image;

Image.prototype.setId = function(id) { this.id = id; }
Image.prototype.getId = function() { return this.id; }

Image.prototype.setFile = function(fileName) { this.file = fileName; }
Image.prototype.getFile = function() { return this.file; }

Image.prototype.setGalleryId = function(id) { this.galleryId = id; }
Image.prototype.getGalleryId = function() { return this.galleryId; }
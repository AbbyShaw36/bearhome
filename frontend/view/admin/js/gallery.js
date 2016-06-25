$(function() {
	$("#addInput").on("change",function() {
		var that = this;
		var file = this.files[0];

		if (!file || !file.type.match("image") || typeof FileReader === "undefined") {
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(file);

		$(reader).on("load",function() {
			var result = this.result;
			var img = $("<img src='" + this.result + "'>");
			
			$(that).parent().siblings(".imgBox").append(img);
		});
	});

	$("#addBtn").on("click",function() {
		var galleryId = $("#galleryId").val();
		var galleryPath = $("#galleryPath").val();
		var file = $("#addInput")[0].files[0];
		var fileName = file.name;
		
		if (!file) {
			alert("请选择上传文件！");
			return;
		}

		if (!file.type.match("image")) {
			alert("上传文件只限图片！");
			return;
		}

		var image = new Image();
		image.setGalleryId(galleryId);
		image.setGalleryPath(galleryPath);
		image.setFile(file);
		image.setFileName(fileName);
		image.add();
	});

	$(".imgList li .delete").on("click",function() {
		if (!confirm("是否确定删除该图片？")) {
			return false;
		}

		var li = $(this).parents("li");
		var imgId = li.attr("id").split("_")[1];
		var imgPath = li.find("img").attr("src");

		var image = new Image();
		image.setImgId(imgId);
		image.setImgPath(imgPath);
		image.delete();

		return false;
	});

	$(".imgList li .setCover").on("click",function() {
		if (!confirm("是否确定将该图片设为相册封面？")) {
			return false;
		}

		var coverId = $(this).parents("li").attr("id").split("_")[1];
		var galleryId = $("#galleryId").val();

		var gallery = new Gallery();
		gallery.setId(galleryId);
		gallery.setCoverId(coverId);
		gallery.setCover();
	});
});

function Image() {}

$.extend(Image.prototype,{
	setGalleryId : function(id) {
		this.galleryId = id;
	},
	setGalleryPath : function(path) {
		this.galleryPath = path;
	},
	setFile : function(file) {
		this.file = file;
	},
	setFileName : function(name) {
		this.fileName = name;
	},
	setImgId : function(id) {
		this.imgId = id;
	},
	setImgPath : function(path) {
		this.imgPath = path;
	},
	add : function() {
		var that = this;

		var formData = new FormData();
		formData.append("file",this.file,this.fileName);
		formData.append("galleryPath",this.galleryPath);

		$.ajax({
			url : gp.jumpPath + "addImg",
			type : "POST",
			dataType : "json",
			data : formData,
			processData: false,
    		contentType: false,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data) {
				console.log("add image file success");

				$.ajax({
					url : gp.operatePath + "gallery/addImg",
					type : "POST",
					dataType : "json",
					data : "galleryId=" + that.galleryId + "&file=" + data.imgFile,
					crossDomain : true,
					xhrFields: {withCredentials: true},
					success : function(data) {
						alert("添加成功！");
						location.reload();
					},
					error : function(res) {
						alert("添加失败！");
					}
				});
			},
			error : function(res) {
				alert("添加失败！");
			}
		});
	},
	delete : function() {
		var that = this;

		$.ajax({
			url : gp.jumpPath + "deleteImg?imgPath=" + that.imgPath,
			type : "DELETE",
			dataType : "json",
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data) {
				console.log("delete image file success");

				$.ajax({
					url : gp.operatePath + "gallery/deleteImg?id=" + that.imgId,
					type : "DELETE",
					dataType : "json",
					crossDomain : true,
					xhrFields: {withCredentials: true},
					success : function(data) {
						alert("删除成功！");
						location.reload();
						return false;
					},
					error : function(res) {
						alert("删除失败！");
						return false;
					}
				});
			},
			error : function(res) {
				alert("删除失败！");
				return false;
			}
		});
	}
});

function Gallery() {}

$.extend(Gallery.prototype,{
	setId : function(id) {
		this.id = id;
	},
	setCoverId : function(id) {
		this.coverId = id;
	},
	setCover : function() {
		var that = this;

		$.ajax({
			url : gp.operatePath + "gallery/setCover",
			type : "PUT",
			dataType : "json",
			data : "id=" + that.id + "&coverId=" + that.coverId,
			crossDomain : true,
			xhrFields : {withCredentials : true},
			success : function(data) {
				alert("设置封面成功！");
				return false;
			},
			error : function(res) {
				alert("设置封面失败！");
				return false;
			}
		});
	}
});
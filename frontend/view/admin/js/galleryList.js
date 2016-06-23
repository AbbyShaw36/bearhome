$(function() {
	$("#createBtn").on("click",function() {
		var name = htmlDecode(htmlEncode($.trim($("#createInput").val())));

		if (!name) {
			alert("相册名称不能为空！");
			return;
		}

		var gallery = new Gallery();
		gallery.setName(name);
		gallery.create();
	});

	$("#deleteBtn").on("click",function() {
		if (!confirm("删除相册的同时会删除该相册的所有图片，是否确定继续？")) {
			return;
		}

		var li = $(this).parents("li");
		var name = li.find(".title").text();
		var id = li.attr("id").split("_")[1];
		var arr = li.find("img").attr("src").split("/");
		var coverFile = arr[arr.length-1];

		var gallery = new Gallery();
		gallery.setName(name);
		gallery.setId(id);
		gallery.setCoverFile(coverFile);
		gallery.delete();
	});
});

function Gallery() {}

$.extend(Gallery.prototype,{
	setName : function(name) {
		this.name = name;
	},
	setId : function(id) {
		this.id = id;
	},
	setCoverFile : function(fileName) {
		this.coverFile = fileName;
	},
	create: function() {
		var that = this;

		$.ajax({
			url : gp.jumpPath + "createGallery",
			type : "POST",
			dataType : "json",
			data : "name=" + that.name,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data) {
				$.ajax({
					url : gp.operatePath + "gallery/create",
					type : "POST",
					dataType : "json",
					data : "name=" + that.name + "&galleryPath=" + data.galleryPath + "&coverPath=" + data.coverPath + "&coverFile=" + data.coverFile,
					crossDomain : true,
					xhrFields: {withCredentials: true},
					success : function(data){
						alert("创建成功！");
						location.reload();
					},
					error : function(res) {
						alert("创建失败！");
					}
				});
			},
			error : function(res) {
				if (res.status === 400) {
					alert("创建失败，存在同名相册！");
					return;
				}

				alert("创建失败！");
			}
		});
	},
	delete : function() {
		var that = this;
		console.log(123);
		$.ajax({
			url : gp.jumpPath + "deleteGallery?name=" + that.name + "&coverFile=" + that.coverFile,
			type : "DELETE",
			dataType : "json",
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data) {
				console.log("delete gallery dir success");
				$.ajax({
					url : gp.operatePath + "gallery/delete?id=" + that.id,
					type : "DELETE",
					dataType : "json",
					crossDomain : true,
					xhrFields: {withCredentials: true},
					success : function(data){
						alert("删除成功！");
						// location.reload();
					},
					error : function(res) {
						alert("删除失败！");
					}
				});
			},
			error : function(res) {
				alert("删除失败！");
			}
		});
	}
});
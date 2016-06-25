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
			return false;
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

		return false;
	});

	$("#updateBtn").on("click",function() {
		var li = $(this).parents("li");
		var id = li.attr("id").split("_")[1];
		var oldName = li.find(".title").text();
		var newName = prompt("请输入新名称",oldName);

		if (newName === null) {
			return false;
		}

		newName = htmlDecode(htmlEncode($.trim(newName)));

		if (newName === "") {
			alert("请输入该相册的新名称！");
			return false;
		}

		if (newName === oldName) {
			alert("修改成功！");
			return false;
		}

		var gallery = new Gallery();
		gallery.setId(id);
		gallery.setOldName(oldName);
		gallery.setNewName(newName);
		gallery.update();

		return false;
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
	setOldName : function(name) {
		this.oldName = name;
	},
	setNewName : function(name) {
		this.newName = name;
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
				console.log("create gallery dir success");
				$.ajax({
					url : gp.operatePath + "gallery/create",
					type : "POST",
					dataType : "json",
					data : "name=" + that.name + "&galleryPath=" + data.galleryPath,
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
		
		$.ajax({
			url : gp.jumpPath + "deleteGallery?name=" + that.name,
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
						location.reload();
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
	},
	update : function() {
		var that = this;

		$.ajax({
			url : gp.jumpPath + "updateGallery",
			type : "PUT",
			dataType : "json",
			data : "oldName=" + that.oldName + "&newName=" + that.newName,
			crossDomain : true,
			xhrFields : {withCredentials: true},
			success : function(data) {
				console.log("update gallery dir success");

				$.ajax({
					url : gp.operatePath + "gallery/updateName",
					type : "PUT",
					dataType : "json",
					data : "id=" + that.id + "&name=" + that.newName + "&galleryPath=" + data.galleryPath,
					crossDomain : true,
					xhrFields: {withCredentials: true},
					success : function(data) {
						alert("修改成功！");
						location.reload();
					},
					error : function(res) {
						alert("修改失败！");
					}
				});
			},
			error : function(res) {
				alert("修改失败！");
			}
		});
	}
});
$(function() {
	// 加载分类数据
	getArticleClass();

	// 创建分类
	$("#createClass_btn").on("click",function() {
		var className = htmlEncode($.trim($("#createClass_input").val()));

		if (!className) {
			alert("分类名称不能为空！");
			return;
		}

		$.ajax({
			url : gp.operatePath + "articleClass/create",
			type : "POST",
			dataType : "json",
			data : "name=" + className,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				alert("保存成功！");
				$("#createClass_input").val("");
				getArticleClass();
			}
		});
	});

	// 修改分类
	$("#updateClass_btn").on("click",function() {
		var selectClass = $.trim($("#updateClass").find(".classList").val());
		var newClass = htmlEncode($.trim($("#updateClass_input").val()));

		if (!selectClass) {
			alert("请选择需要修改的分类！");
			return;
		}

		if (!newClass) {
			alert("新分类名不能为空！");
			return;
		}

		$.ajax({
			url : gp.operatePath + "articleClass/update",
			type : "PUT",
			dataType : "json",
			data : "id=" + selectClass + "&name=" + newClass,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				alert("修改成功！");
				getArticleClass();
				$("#updateClass_input").val("");
			},
			error : function(res) {
				if (res.status === 404) {
					alert("您所修改的分类不存在！");
					return;
				}

				alert("修改失败！");
			}
		});
	});

	// 删除分类
	$("#deleteClass_Btn").on("click",function() {
		var selectClass = $.trim($("#deleteClass").find(".classList").val());

		if (!selectClass) {
			alert("请选择需要删除的分类！");
			return;
		}

		if (!confirm("删除分类的同时将删除该分类下的所有文章，是否继续？")) {
			return;
		}

		$.ajax({
			url : gp.operatePath + "articleClass/delete?id=" + selectClass,
			type : "DELETE",
			dataType : "json",
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				alert("删除成功！");
				getArticleClass();
			},
			error : function(res) {
				if (res.status === 404) {
					alert("您所删除的分类不存在！");
					return;
				}

				alert("删除失败！");
			}
		});
	});
});
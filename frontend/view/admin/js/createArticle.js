$(function() {
	// 加载文章分类
	getArticleClass();

	$("#save").on("click",function() {
		var title = htmlDecode(htmlEncode($.trim($("#articleTitle").val())));
		var classId = $.trim($("#articleClass").val());
		var content = htmlDecode(htmlEncode($.trim($("#articleContent").val())));

		if (!title) {
			alert("文章标题不能为空");
			return;
		}

		if (!classId) {
			alert("请选择文章所属分类");
			return;
		}

		$.ajax({
			url : gp.operatePath + "article/create",
			type : "POST",
			dataType : "json",
			data : "title=" + title + "&class=" + classId + "&content=" + content,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				alert("新增文章成功！");
				location.href = "articleList.html";
			},
			error : function(res) {
				alert("新建文章失败！");
			}
		});
	});
});
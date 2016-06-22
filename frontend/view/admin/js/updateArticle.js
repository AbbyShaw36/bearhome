$(function() {
	getArticleClass();

	$("#save").on("click",function() {
		var id = $("#articleId").val();
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
			url : gp.operatePath + "article/update",
			type : "PUT",
			dataType : "json",
			data : "id=" + id + "&title=" + title + "&class=" + classId + "&content=" + content,
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				alert("修改成功！");
				location.href = "articleList.html";
			},
			error : function(res) {
				if (res.status === 404) {
					alert("您所修改的文章不存在！");
					return;
				}
				alert("修改失败！");
			}
		});
	});
});
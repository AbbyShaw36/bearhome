$(function() {
	getArticleClass();

	$(".delBtn").on("click",function() {
		var id = $(this).parents("tr").attr("id").split("_")[1];

		$.ajax({
			url : gp.operatePath + "article/delete?id=" + id,
			type : "DELETE",
			dataType : "json",
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				alert("删除成功！");
				location.reload();
			},
			error : function(res) {
				if (res.status === 404) {
					alert("您所删除的文章不存在！");
					return;
				}

				alert("删除失败！");
			}
		});
	});

	$("#searchBtn").on("click",function() {
		var title = $.trim($("#searchTitle").val());
		var classId = $("#searchClass").val();
		var url = gp.jumpPath + "getArticleList.html?";

		if (title) {
			url += "title=" + title + "&";
		}

		if (classId) {
			url += "classId=" + classId;
		}

		$.ajax({
			url : url,
			type : "GET",
			dataType : "html",
			crossDomain : true,
			xhrFields: {withCredentials: true},
			success : function(data,status) {
				$("#articleList").html($(data).html());
			},
			error : function(res) {
				if (res.status === 404) {
					alert("没有搜索到符合条件的文章！");
					return;
				}

				alert("搜索失败！");
			}
		})
	});
})
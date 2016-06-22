function getArticleClass() {
	$.ajax({
		url : gp.operatePath + "articleClass/get",
		type : "GET",
		crossDomain : true,
		xhrFields: {withCredentials: true},
		success : function(data,status) {
			var classList = JSON.parse(data).classList;
			var selectBox = $("<select/>").append($("<option />"));
			var selectedItem = 0;

			for (var i = 0; i < classList.length; i++) {
				var classItem = classList[i];
				var option = $("<option/>").val(classItem.classId).text(classItem.className);

				if (Number($(".classList").val()) === classItem.classId) {
					selectedItem = i + 1;
				}

				selectBox.append(option);
			}

			$(".classList").html($(selectBox).html());
			$(".classList").find("option").eq(selectedItem).prop("selected",true);
		},
		error : function(res) {
			if (res.status === 404) {
				alert("您还没有创建任何文章分类！");
				$(".classList").html($("<option />"));
				return;
			}

			alert("加载文章分类失败！");
		}
	});
}